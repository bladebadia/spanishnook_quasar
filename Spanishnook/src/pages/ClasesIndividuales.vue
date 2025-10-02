<template>
  <q-page class="q-pa-lg">
    <!-- Encabezado -->
    <div class="text-center q-mb-xl">
      <h3 class="text-primary">CLASES INDIVIDUALES</h3>
      <p class="text-grey-8">Reserva tu clase de español personalizada</p>
    </div>

    <!-- Contenido principal en dos columnas -->
    <div class="row q-col-gutter-lg">
      <!-- Columna izquierda: Carrito + Reservas -->
      <div class="col-12 col-md-5">
        <!-- Carrito -->
        <div v-if="carrito.length > 0" class="q-mb-lg bg-yellow-2 q-pa-md rounded-borders shadow-2">
          <h5>🛒 Carrito de Reservas</h5>
          <q-list>
            <q-item v-for="(reserva, index) in carrito" :key="index">
              <q-item-section>
                <q-item-label>
                  {{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}
                </q-item-label>
                <q-item-label caption>
                  {{ reserva.tipo === 'normal' ? 'Clase Normal' : 'Clase Conversación' }} -
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
              <q-btn color="primary" label="Ir al Carrito" to="/CarritoCompra" />
            </div>
          </q-list>
        </div>

        <!-- Mis reservas -->
        <div class="q-mt-lg">
          <h5>Mis Reservas Confirmadas</h5>
          <q-list bordered v-if="misReservas.length > 0">
            <q-item v-for="reserva in misReservas" :key="reserva.id" class="q-mb-sm">
              <q-item-section>
                <q-item-label>
                  {{ formatFecha(reserva.fecha) }} a las {{ reserva.hora.slice(0, 5) }}
                </q-item-label>
                <q-item-label caption>
                  {{ getTipoClaseTexto(reserva) }} - {{ getPrecioClase(reserva) }}€
                </q-item-label>
                <q-item-label caption v-if="!puedeCancelar(reserva)" class="text-negative">
                  No se puede cancelar (menos de 72 horas)
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
                      ? 'No se puede cancelar con menos de 72 horas de antelación'
                      : 'Cancelar reserva'
                  "
                />
              </q-item-section>
            </q-item>
          </q-list>
          <p v-else class="text-grey q-mt-sm">No tienes reservas confirmadas.</p>
        </div>
      </div>

      <!-- Columna derecha: Selector + Calendario + Horarios -->
      <div class="col-12 col-md-6">
        <div class="q-mb-md">
          <q-card class="q-pa-md shadow-1 rounded-borders">
            <q-card-section class="q-pa-sm">
              <div class="text-h6 text-center q-mb-md">Tipo de Clase</div>
              <q-option-group
                v-model="tipoClase"
                :options="opcionesTipoClase"
                color="primary"
                inline
                class="justify-center"
              />
              <div class="text-center q-mt-sm">
                <q-badge color="primary" class="q-px-sm q-py-xs text-subtitle1">
                  Precio: {{ tipoClase === 'normal' ? '32€' : '20€' }}
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
          <h5>Horarios disponibles para {{ formatFecha(fechaSeleccionada) }}</h5>

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
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';
import { useQuasar } from 'quasar';
const $q = useQuasar();

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

const fechaSeleccionada = ref('');
const horasOcupadas = ref<string[]>([]);
const misReservas = ref<ReservaConfirmada[]>([]);
const carrito = ref<ReservaCarrito[]>([]);
const tipoClase = ref<'normal' | 'conversacion'>('normal');

// Opciones para el selector de tipo de clase
const opcionesTipoClase = [
  {
    label: 'Clase Normal (32€)',
    value: 'normal',
  },
  {
    label: 'Clase Conversación (20€)',
    value: 'conversacion',
  },
];

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
  return reserva.tipo === 'normal' ? 'Clase Normal' : 'Clase Conversación';
};

// Función para obtener el precio
const getPrecioClase = (reserva: ReservaConfirmada): number => {
  return reserva.tipo === 'normal' ? 32 : 20;
};

// Formatear fecha en español
const formatFecha = (fecha: string) => {
  const d = new Date(fecha);
  return d.toLocaleDateString('es-ES', {
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

    if (error) throw error;
    misReservas.value = data || [];
  } catch (error) {
    console.error('Error cargando reservas:', error);
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

<style scoped>
.custom-calendar {
  max-width: 800px;
  min-height: 500px;
}

.time-btn {
  min-width: 80px;
  font-weight: bold;
}

/* Personalización del calendario */
.custom-calendar {
  width: 100%;
  min-height: 400px;
}

:deep(.q-date__calendar-item) {
  height: 40px;
  width: 40px;
  font-size: 14px;
}

/* Tablet */
@media (min-width: 768px) {
  .custom-calendar {
    max-width: 700px;
    min-height: 450px;
  }

  :deep(.q-date__calendar-item) {
    height: 50px;
    width: 50px;
    font-size: 16px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .custom-calendar {
    max-width: 800px;
    min-height: 500px;
  }

  :deep(.q-date__calendar-item) {
    height: 55px;
    width: 55px;
    font-size: 17px;
  }
}

/* Pantallas grandes */
@media (min-width: 1440px) {
  .custom-calendar {
    max-width: 900px;
    min-height: 550px;
  }

  :deep(.q-date__calendar-item) {
    height: 60px;
    width: 60px;
    font-size: 18px;
  }
}

/* Días deshabilitados */
:deep(.q-date__calendar-item--disabled) {
  color: #bdbdbd !important;
  background-color: #f5f5f5;
}
</style>
