<template>
  <q-page >
    <div v-if="!seleccionClases">
      <div style="margin-bottom: 60px;">
        <q-img style="width: 100%; max-height: 600px;" 
          fit="cover" position="center" src="/img/estudiante_1024.jpg">        
        </q-img>
      </div>

      <div class="column items-center text-justify " style="margin-bottom: 60px;" >
        <p class=" titulo-responsivo" style="color: #851319">
          {{ t('individuales.nuestrasClases') }}
        </p>

        <p class="q-mt-md texto-responsivo" >
          {{ t('individuales.textoNuestrasClases') }}
        </p>
        <q-btn
          class="oval-btn"
          items-center
          color="primary"
          unelevated
          @click="activarSeleccionClases"
      >
        {{ t('individuales.botonSeleccionaClase') }}
        </q-btn>
      </div>

      <!-- Banner promocional test nivel -->
      <div
        class="q-mt-xl q-mb-xl row degradado-fondo"
        style="min-height: 400px; width: 100%"
        >
        <div
          class="row"
          style="width: 100%; position: relative"
          >
          <div class="col-12 q-pa-none q-pa-md-lg" style="position: absolute; top: 20%; ">
            <p class="titulo-responsivo " style="color: #fffdf8">
              <strong>{{ t('indexDescubreTuPunto') }}</strong>
            </p>
            <p class="texto-responsivo" style=" color: #fffdf8">
              {{ t('indexEnSolo') }}
            </p>
            <q-btn
              color="black"
              @click="activarSeleccionClases"
              class="oval-btn q-mx-lg"
              unelevated
              >{{ t('indexHacerTest') }}</q-btn
            >
          </div>
        </div>
      </div>
   
      <q-separator class="q-my-xl" />

      <div class="col-12 row  justify-center ">
        <!-- Componente 1:  -->
        <PromoCard
          :image-src="'img/45sintitulo.png'"
          :title="t('individuales.tituloClasesA1')"
          :description="t('individuales.textoClasesA1')"
          :button-text="t('individuales.botonClasesA1')"
          @button-click="activarSeleccionClases"
          />
        <!-- Componente 2:  -->
        <PromoCard
          :image-src="'img/44sintitulo.png'"
          :title="t('individuales.tituloClasesB1')"
          :description="t('individuales.textoClasesB1')"
          :button-text="t('individuales.botonClasesB1')"
          @button-click="activarSeleccionClases"
          />
        <!-- Componente 3:  -->
        <PromoCard
          :image-src="'img/48sintitulo.png'"
          :title="t('individuales.tituloClasesConversacion')"
          :description="t('individuales.textoClasesConversacion')"
          :button-text="t('individuales.botonClasesConversacion')"
          @button-click="activarSeleccionClases"
          />            
      </div>
    </div>
    <!-- Contenido principal en dos columnas -->
    <div v-if="seleccionClases">
      <div class="row q-col-gutter-lg">
        <p class="titulo-responsivo text-center q-my-xl" style="width: 100%; color: #851319">
          {{ t('individuales.reservaTuClase') }}
        </p>
        <!-- Columna izquierda: Carrito + Reservas -->
        <div class="col-12 col-md-5">
          <!-- Carrito -->
          <div v-if="carrito.length > 0" class="q-mb-lg bg-yellow-2 q-pa-md rounded-borders shadow-2">
            <h5>🛒{{ t('individuales.carritoDeReservas') }}</h5>
            <q-list>
            <q-item v-for="(reserva, index) in carrito" :key="index">
              <q-item-section>
                <q-item-label>
                  {{ formatFecha(reserva.fecha) }} {{ t('individuales.aLas') }} {{ reserva.hora }}
                </q-item-label>
                <q-item-label caption>
                  {{ reserva.tipo === 'normal' ? t('individuales.claseNormal') : t('individuales.claseConversacion') }} -
                  {{ reserva.tipo === 'normal' ? '32€' : '20€' }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="negative"
                  icon="remove"
                  @click="quitarDelCarrito(index)"
                  size="sm"
                  round
                />
              </q-item-section>
            </q-item>
            <div class="q-mt-md text-center">
              <q-btn color="primary" :label="t('individuales.botonIrAlCarrito')" to="/CarritoCompra" />
            </div>
            </q-list>
          </div>

          <!-- Mis reservas -->
          <div class="q-mt-lg">
            <h5>{{ t('individuales.misReservasConfirmadas') }}</h5>
            <q-list bordered v-if="misReservas.length > 0">
              <q-item v-for="reserva in misReservas" :key="reserva.id" class="q-mb-sm">
                <q-item-section>
                  <q-item-label>
                    {{ formatFecha(reserva.fecha) }} {{ t('individuales.aLas') }} {{ reserva.hora.slice(0, 5) }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ getTipoClaseTexto(reserva) }} - {{ getPrecioClase(reserva) }}€
                  </q-item-label>
                  <q-item-label caption v-if="!puedeCancelar(reserva)" class="text-negative">
                    {{t('individuales.noSePuede')}}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    color="negative"
                    icon="delete"
                    @click="cancelarReserva(reserva)"
                    size="sm"
                    :disable="!puedeCancelar(reserva)"
                    :title="
                      !puedeCancelar(reserva)
                        ? t('individuales.noSePuedeCancelar')
                        : t('individuales.cancelarReserva') " />
                </q-item-section>
              </q-item>
            </q-list>
            <p v-else class="text-grey q-mt-sm">{{t('individuales.noTienesReservas')}}</p>
          </div>
        </div>

      <!-- Columna derecha: Selector + Calendario + Horarios -->
      <div class="col-12 col-md-6">
        <div class="q-mb-md">
          <q-card class="q-pa-md shadow-1 rounded-borders">
            <q-card-section class="q-pa-sm">
              <div class="text-h6 text-center q-mb-md">{{t('individuales.tipoDeClase')}}</div>
                <q-option-group
                  v-model="tipoClase"
                  :options="opcionesTipoClase"
                  color="primary"
                  inline
                  class="justify-center"
                  />
              <div class="text-center q-mt-sm">
                <q-badge color="primary" class="q-px-sm q-py-xs text-subtitle1">
                  {{t('individuales.precio')}} {{ tipoClase === 'normal' ? '32€' : '20€' }}
                </q-badge>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Calendario -->
        <div class="q-mb-xl">
          <q-date
            v-model="fechaSeleccionada"
            :options="opcionesFechas"
            :min="fechaMinima"
            :max="fechaMaxima"
            landscape
            class="custom-calendar shadow-1 rounded-borders"
            today-btn
            mask="YYYY-MM-DD"
            color="primary"
            text-color="white"
            :events="fechasConEventos"
            event-color="orange"
            first-day-of-week="1"
          />
        </div>

        <!-- Horarios disponibles -->
        <div v-if="fechaSeleccionada" class="q-mt-lg">
          <h5>{{t('individuales.horariosDisponiblesPara')}} {{ formatFecha(fechaSeleccionada) }}</h5>

          <div v-if="horariosDisponiblesFiltrados.length > 0" class="row q-gutter-sm q-mt-md">
            <q-btn
              v-for="hora in horariosDisponiblesFiltrados"
              :key="hora"
              :color="estaEnCarrito(hora) ? 'orange' : 'primary'"
              :label="hora"
              @click="agregarAlCarrito(hora)"
              outline
              class="time-btn"
            />
          </div>

          <div v-else class="text-grey q-mt-md">No hay horarios disponibles para esta fecha.</div>
        </div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import '../css/pages/ClasesIndividuales.css';
import '../css/pages/EstilosGenerales.css';
import PromoCard from '../components/PromoCard.vue';
const $q = useQuasar();
const {  t , locale} = useI18n();

interface ReservaCarrito {
  id?: string;
  fecha: string;
  hora: string;
  tipo: 'normal' | 'conversacion'; // Añadir tipo
}

interface ReservaConfirmada {
  id: string;
  user_id: string;
  fecha: string;
  hora: string;
  estado: string;
  created_at?: string;
  tipo?: 'normal' | 'conversacion';
  precio?: number;
}

const { user } = useAuth();
const seleccionClases = ref<string | null>(null);
const fechaSeleccionada = ref('');
const horasOcupadas = ref<string[]>([]);
const misReservas = ref<ReservaConfirmada[]>([]);
const carrito = ref<ReservaCarrito[]>([]);
const tipoClase = ref<'normal' | 'conversacion'>('normal');


const activarSeleccionClases = () => {
  seleccionClases.value = 'activa';
};


// Cambiar de array estático a computed reactivo
const opcionesTipoClase = computed(() => [
  {
    label: `${t('individuales.claseNormal')} 32€`,
    value: 'normal',
  },
  {
    label: `${t('individuales.claseConversacion')} 20€`,
    value: 'conversacion',
  },
]);

// Fechas mínima y máxima (3 meses vista)
const fechaMinima = new Date().toISOString().split('T')[0];
const fechaMaxima = computed(() => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString().split('T')[0];
});

// Horarios disponibles
const todosLosHorarios = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

// Fechas que tienen eventos (para el calendario)
const fechasConEventos = computed(() => {
  const fechas = new Set();
  misReservas.value.forEach((reserva) => fechas.add(reserva.fecha));
  carrito.value.forEach((reserva) => fechas.add(reserva.fecha));
  return Array.from(fechas) as string[];
});

// Horarios disponibles filtrados
const horariosDisponiblesFiltrados = computed(() => {
  return todosLosHorarios.filter(
    (hora) => !horasOcupadas.value.includes(hora) && !estaEnCarrito(hora),
  );
});

// Opciones para fechas disponibles
const opcionesFechas = (date: string) => {
  const selectedDate = new Date(date);
  const today = new Date();
  const maxDate = new Date();

  maxDate.setMonth(today.getMonth() + 3);
  today.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) return false;
  if (selectedDate > maxDate) return false;

  const day = selectedDate.getDay();
  return day !== 0 && day !== 6; // Excluir fines de semana
};

// Función para obtener el texto del tipo de clase
const getTipoClaseTexto = (reserva: ReservaConfirmada): string => {
 return reserva.tipo === 'normal' 
    ? t('individuales.claseNormal') 
    : t('individuales.claseConversacion');
};

// Función para obtener el precio
const getPrecioClase = (reserva: ReservaConfirmada): number => {
  return reserva.tipo === 'normal' ? 32 : 20;
};

// Función formatFecha mejorada con i18n
const formatFecha = (fecha: string) => {
  const d = new Date(fecha);
  console.log('Formato de fecha para:', locale.value);
  // Usar el locale actual de i18n
  const currentLocale = locale.value === 'es-ES' ? 'es-ES' : 
                       locale.value === 'en-US' ? 'en-US' :
                       locale.value === 'fr-FR' ? 'fr-FR' : 'es-ES'; // Por defecto español

  console.log('Formato de fecha para:', locale.value, '->', currentLocale);
  return d.toLocaleDateString(currentLocale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Cargar TODAS las horas ocupadas (solo confirmadas)
const cargarHorariosOcupados = async (fecha: string) => {
  if (!fecha) {
    horasOcupadas.value = [];
    return;
  }

  try {
    const { data: reservasConfirmadas, error } = await supabase
      .from('reservas')
      .select('hora')
      .eq('fecha', fecha)
      .eq('estado', 'confirmada');

    if (error) {
      console.error('Error cargando horarios ocupados:', error);
      return;
    }

    horasOcupadas.value = reservasConfirmadas.map((r) => r.hora.slice(0, 5)); // HH:mm
  } catch (error) {
    console.error('Error cargando horarios ocupados:', error);
    horasOcupadas.value = [];
  }
};

// Verificar si una hora está en el carrito
const estaEnCarrito = (hora: string) => {
  return carrito.value.some(
    (reserva) => reserva.fecha === fechaSeleccionada.value && reserva.hora === hora,
  );
};

// Agregar al carrito
const agregarAlCarrito = (hora: string) => {
  if (!user.value?.id || !fechaSeleccionada.value) return;

  if (horasOcupadas.value.includes(hora)) {
    alert('Este horario ya no está disponible. Por favor, elige otro.');
    return;
  }

  if (estaEnCarrito(hora)) {
    alert('Este horario ya está en tu carrito.');
    return;
  }

  carrito.value.push({
    fecha: fechaSeleccionada.value,
    hora: hora,
    tipo: tipoClase.value, // Guardar el tipo seleccionado
  });

  guardarCarrito();
};

// Quitar del carrito
const quitarDelCarrito = async (index: number) => {
  if (index < 0 || index >= carrito.value.length) return;

  const reserva: ReservaCarrito | undefined = carrito.value[index];
  if (!reserva) return;

  carrito.value.splice(index, 1);
  guardarCarrito();

  // Actualizar disponibilidad si es la fecha seleccionada
  if (fechaSeleccionada.value === reserva.fecha) {
    await cargarHorariosOcupados(fechaSeleccionada.value);
  }
};

// ✅ Guardar carrito
const guardarCarrito = () => {
  localStorage.setItem('carritoReservas', JSON.stringify(carrito.value));
};

// ✅ Cargar carrito
const cargarCarrito = () => {
  const carritoGuardado = localStorage.getItem('carritoReservas');
  if (carritoGuardado) {
    carrito.value = JSON.parse(carritoGuardado);
  }
};

// Cargar mis reservas confirmadas
const cargarMisReservas = async () => {
  if (!user.value?.id) {
    console.log('❌ No hay usuario logueado');
    misReservas.value = [];
    return;
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('user_id', user.value.id)
      .eq('estado', 'confirmada')
      .gte('fecha', new Date().toISOString().split('T')[0])
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true });

    if (error) {
      console.error('❌ Error cargando reservas:', error);
      return;
    }

    console.log('✅ Reservas cargadas desde BD:', data);
    misReservas.value = data || [];
  } catch (error) {
    console.error('💥 Error cargando reservas:', error);
    misReservas.value = [];
  }
};

// Función para verificar si se puede cancelar una reserva
const puedeCancelar = (reserva: ReservaConfirmada): boolean => {
  const fechaReserva = new Date(reserva.fecha + 'T' + reserva.hora);
  const ahora = new Date();
  const diferenciaHoras = (fechaReserva.getTime() - ahora.getTime()) / (1000 * 60 * 60);
  return diferenciaHoras >= 72;
};

// Cancelar reserva con confirmación + Stripe refund
const cancelarReserva = (reserva: ReservaConfirmada) => {
  // Validar 72 horas en el frontend primero
  const fechaReserva = new Date(reserva.fecha + 'T' + reserva.hora);
  const ahora = new Date();
  const diferenciaHoras = (fechaReserva.getTime() - ahora.getTime()) / (1000 * 60 * 60);

  console.log('⏰ Validación frontend - Diferencia en horas:', diferenciaHoras);

  if (diferenciaHoras < 72) {
    const horasRestantes = Math.max(0, Math.floor(diferenciaHoras));
    $q.notify({
      type: 'negative',
      message: `No puedes cancelar con menos de 72 horas de antelación`,
      caption: `Tiempo restante: ${horasRestantes} horas`,
      timeout: 6000,
      actions: [{ icon: 'close', color: 'white' }],
    });
    return; // Detener la ejecución aquí
  }

  $q.dialog({
    title: 'Cancelar reserva',
    message: `¿Estás seguro de que quieres cancelar la reserva del ${formatFecha(reserva.fecha)} a las ${reserva.hora.slice(0, 5)}? Se procesará un reembolso.`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void (async () => {
      try {
        console.log('🔄 Enviando solicitud de cancelación para reserva:', reserva.id);

        const { data, error } = await supabase.functions.invoke('cancel-reserva', {
          body: { reservaId: reserva.id },
        });

        console.log('📨 Respuesta recibida:', { data, error });

        if (error) {
          throw new Error(error.message || 'Error desconocido en la función');
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        // Actualizar la lista local
        misReservas.value = misReservas.value.filter((r) => r.id !== reserva.id);

        // Recargar disponibilidad
        if (fechaSeleccionada.value) {
          await cargarHorariosOcupados(fechaSeleccionada.value);
        }

        $q.notify({
          type: 'positive',
          message: data?.message || 'Reserva cancelada y reembolso realizado con éxito',
          timeout: 5000,
        });
      } catch (err: unknown) {
        console.error('💥 Error cancelando reserva:', err);
        let errorMessage = 'Error al cancelar la reserva';

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }

        $q.notify({
          type: 'negative',
          message: errorMessage,
          timeout: 6000,
        });
      }
    })();
  });
};

// Watchers y lifecycle
onMounted(async () => {
  cargarCarrito();
  await cargarMisReservas();
});

watch(
  () => fechaSeleccionada.value,
  (nuevaFecha: string) => {
    if (nuevaFecha) {
      void cargarHorariosOcupados(nuevaFecha);
    }
  },
);


</script>

