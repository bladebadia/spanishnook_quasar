<template>
  <q-page class="q-pa-lg">
    <h4>🛒 Carrito de Reservas</h4>

    <div v-if="carrito.length === 0" class="text-center q-mt-xl">
      <q-icon name="shopping_cart" size="xl" color="grey" />
      <p class="text-grey q-mt-md">Tu carrito está vacío</p>
      <q-btn label="Volver a Reservas" to="/HorarioReserva" color="primary" />
    </div>

    <div v-else>
      <q-list bordered class="q-mb-lg">
        <q-item v-for="(reserva, index) in carrito" :key="index">
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              color="negative"
              icon="delete"
              @click="quitarDelCarrito(index)"
              size="sm"
              round
            />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row justify-between items-center">
        <div class="text-h6">Total: {{ carrito.length }} clase(s)</div>

        <div>
          <q-btn label="Seguir Reservando" to="/HorarioReserva" color="primary" class="q-mr-sm" />
          <q-btn
            label="Confirmar Todas"
            @click="confirmarTodasReservas"
            color="positive"
            :loading="confirmando"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from 'src/supabaseClient';
import { useAuth } from 'src/stores/auth';

const { user } = useAuth();
const router = useRouter();
const carrito = ref<Array<{ fecha: string; hora: string }>>([]);
const confirmando = ref(false);

// Cargar carrito desde localStorage
onMounted(() => {
  const carritoGuardado = localStorage.getItem('carritoReservas');
  if (carritoGuardado) {
    carrito.value = JSON.parse(carritoGuardado);
  }
});

// Formatear fecha
const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Quitar del carrito
const quitarDelCarrito = (index: number) => {
  carrito.value.splice(index, 1);
  guardarCarrito();
};

// Confirmar todas las reservas
const confirmarTodasReservas = async () => {
  if (!user.value?.id || carrito.value.length === 0) return;

  confirmando.value = true;
  try {
    for (const reserva of carrito.value) {
      const { error } = await supabase.from('reservas').insert({
        user_id: user.value.id,
        fecha: reserva.fecha,
        hora: reserva.hora,
        estado: 'confirmada',
      });

      if (error) throw error;
    }

    // Limpiar carrito después de confirmar
    carrito.value = [];
    localStorage.removeItem('carritoReservas');

    alert('✅ Todas las reservas confirmadas correctamente');
    router.push('/AreaPersonal');
  } catch (error) {
    console.error('Error confirmando reservas:', error);
    alert('❌ Error al confirmar las reservas');
  } finally {
    confirmando.value = false;
  }
};

// Guardar carrito en localStorage
const guardarCarrito = () => {
  localStorage.setItem('carritoReservas', JSON.stringify(carrito.value));
};
</script>
