<template>
  <q-page class="q-pa-lg">
    <h4>Reserva de Horarios</h4>

    <!-- Carrito de reservas -->
    <div v-if="carrito.length > 0" class="q-mb-lg bg-blue-1 q-pa-md rounded-borders">
      <h6>🛒 Carrito de Reservas</h6>
      <q-list bordered>
        <q-item v-for="(reserva, index) in carrito" :key="index">
          <q-item-section>
            <q-item-label>{{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}</q-item-label>
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
      </q-list>

      <div class="q-mt-md text-right">
        <q-btn color="primary" label="Ir al Carrito" to="/CarritoCompra" />
      </div>
    </div>

    <!-- Calendario -->
    <div class="row justify-center q-mb-lg">
      <q-date
        v-model="fechaSeleccionada"
        :options="opcionesFechas"
        :min="fechaMinima"
        :max="fechaMaxima"
        landscape
        class="col-12 col-md-8 custom-calendar"
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

      <div v-if="horariosDisponiblesFiltrados.length > 0" class="row q-gutter-sm">
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

    <!-- Mis reservas CONFIRMADAS -->
    <div class="q-mt-xl">
      <h5>Mis Reservas Confirmadas</h5>
      <q-list bordered v-if="misReservas.length > 0">
        <q-item v-for="reserva in misReservas" :key="reserva.id">
          <q-item-section>
            <q-item-label>{{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="negative" icon="delete" @click="cancelarReserva(reserva.id)" size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
      <p v-else class="text-grey">No tienes reservas confirmadas.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';

interface ReservaCarrito {
  id?: string;
  fecha: string;
  hora: string;
}

interface ReservaConfirmada {
  id: string;
  user_id: string;
  fecha: string;
  hora: string;
  estado: string;
  created_at?: string;
}

const { user } = useAuth();

const fechaSeleccionada = ref('');
const horasOcupadas = ref<string[]>([]);
const misReservas = ref<ReservaConfirmada[]>([]);
const carrito = ref<ReservaCarrito[]>([]);

// Fechas mínima y máxima (3 meses vista)
const fechaMinima = new Date().toISOString().split('T')[0];
const fechaMaxima = computed(() => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString().split('T')[0];
});

// Configurar nombres de días y meses en español
const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

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

// Formatear fecha en español
const formatFecha = (fecha: string) => {
  const d = new Date(fecha);
  const weekday = weekdays[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${weekday} ${day} de ${month} de ${year}`;
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

    // Normalizar las horas
    horasOcupadas.value = reservasConfirmadas.map((r) => {
      const [hora, minuto] = r.hora.split(':');
      return `${hora}:${minuto}`;
    });
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

  // Verificar si ya está ocupado
  if (horasOcupadas.value.includes(hora)) {
    alert('Este horario ya no está disponible. Por favor, elige otro.');
    return;
  }

  // Verificar si ya está en el carrito
  if (estaEnCarrito(hora)) {
    alert('Este horario ya está en tu carrito.');
    return;
  }

  // Añadir al carrito local
  carrito.value.push({
    fecha: fechaSeleccionada.value,
    hora: hora,
  });

  guardarCarrito();
};

// Quitar del carrito
const quitarDelCarrito = async (index: number) => {
  if (index < 0 || index >= carrito.value.length) return;

  const reserva = carrito.value[index];
  if (!reserva) return;

  carrito.value.splice(index, 1);
  guardarCarrito();

  // Actualizar disponibilidad si es la fecha seleccionada
  if (fechaSeleccionada.value === reserva.fecha) {
    await cargarHorariosOcupados(fechaSeleccionada.value);
  }
};

// Guardar carrito en localStorage
const guardarCarrito = () => {
  localStorage.setItem('carritoReservas', JSON.stringify(carrito.value));
};

// Cargar carrito desde localStorage
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

// Cancelar reserva
const cancelarReserva = async (reservaId: string) => {
  try {
    const { error } = await supabase.from('reservas').delete().eq('id', reservaId);

    if (error) throw error;

    misReservas.value = misReservas.value.filter((reserva) => reserva.id !== reservaId);

    if (fechaSeleccionada.value) {
      await cargarHorariosOcupados(fechaSeleccionada.value);
    }

    alert('Reserva eliminada correctamente');
  } catch (error) {
    console.error('Error cancelando reserva:', error);
    alert('Error al eliminar la reserva');
  }
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
