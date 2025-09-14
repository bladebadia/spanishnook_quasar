// index.ts (Supabase Edge Function: stripe-webhook)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

const CORS_ORIGIN = "http://localhost:9000";

const corsHeaders = {
  "Access-Control-Allow-Origin": CORS_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Stripe-Signature",
};

Deno.serve(async (req: Request) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const stripeSig = req.headers.get("stripe-signature");

    // Webhook Stripe
    if (stripeSig) {
      const rawBody = await req.text();
      const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
      if (!webhookSecret) {
        console.error("❌ Falta STRIPE_WEBHOOK_SECRET en variables de entorno");
        return new Response("Webhook secret not configured", { status: 500, headers: corsHeaders });
      }

      let event: Stripe.Event;
      try {
        event = await stripe.webhooks.constructEventAsync(rawBody, stripeSig, webhookSecret);
      } catch (err: any) {
        console.error("❌ Verificación de firma fallida:", err?.message);
        return new Response(`Webhook Error: ${err?.message}`, { status: 400, headers: corsHeaders });
      }

      const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm");
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SERVICE_ROLE_KEY")!);

      try {
        // Pago completado → crear reservas confirmadas
        if (event.type === "checkout.session.completed") {
          const session = event.data.object as Stripe.Checkout.Session;

          const raw = session.metadata?.reservas ?? "[]";
          const userId = session.metadata?.user_id;
          let reservas: { fecha: string; hora: string }[] = [];

          try {
            reservas = JSON.parse(raw);
          } catch {
            console.error("❌ Error parseando metadata.reservas:", raw);
          }

          if (Array.isArray(reservas) && reservas.length > 0 && userId) {
            const { error } = await supabase.from("reservas").insert(
              reservas.map(r => ({
                fecha: r.fecha,
                hora: r.hora + ":00",
                estado: "confirmada",
                user_id: userId,
              }))
            );

            if (error) console.error("❌ Error creando reservas tras pago:", error);
            else console.log("✅ Reservas confirmadas tras pago:", reservas);
          }
        }

        // Reembolso
        if (event.type === "charge.refunded" || event.type === "charge.refund.updated") {
          const charge = event.data.object as Stripe.Charge;
          const raw = charge.metadata?.reservas ?? "";
          const ids = raw.toString().split(",").map(s => s.trim()).filter(Boolean);

          if (ids.length > 0) {
            const { error } = await supabase.from("reservas").update({ estado: "cancelada" }).in("id", ids);
            if (error) console.error("❌ Error cancelando reservas:", error);
            else console.log("✅ Reservas canceladas (refund):", ids);
          }
        }
      } catch (err: any) {
        console.error("❌ Error procesando evento de Stripe:", err);
      }

      return new Response(JSON.stringify({ received: true }), { status: 200, headers: corsHeaders });
    }

    // FRONTEND → crear sesión Checkout
    const body = await req.json().catch(() => null);
    if (!body) return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: corsHeaders });

    const { line_items, reservas, user_id } = body;
    if (!Array.isArray(line_items) || !Array.isArray(reservas) || !user_id) {
      return new Response(JSON.stringify({ error: "Bad payload" }), { status: 400, headers: corsHeaders });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `http://localhost:9000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:9000/cancel`,
      metadata: {
        reservas: JSON.stringify(reservas), // ✅ enviar como string JSON
        user_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200, headers: corsHeaders });
  } catch (err: any) {
    console.error("❌ Error inesperado en la función:", err);
    return new Response(JSON.stringify({ error: err?.message ?? String(err) }), { status: 500, headers: corsHeaders });
  }
});
