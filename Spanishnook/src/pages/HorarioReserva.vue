<template>
  <q-page class="q-pa-lg">
    <h4>Reserva de Horarios</h4>

    <!-- Calendario -->
    <div class="row justify-center q-mb-lg">
      <q-date
        v-model="fechaSeleccionada"
        :options="opcionesFechas"
        :min="fechaMinima"
        :max="fechaMaxima"
        landscape
        class="col-12 col-md-6"
      />
    </div>

    <!-- Horarios disponibles -->
    <div v-if="fechaSeleccionada" class="q-mt-lg">
      <h5>Horarios disponibles para {{ formatFecha(fechaSeleccionada) }}</h5>

      <div class="row q-gutter-sm">
        <q-btn
          v-for="hora in horariosDisponibles"
          :key="hora"
          color="primary"
          :label="hora"
          @click="reservarHora(hora)"
          :disabled="reservando"
          outline
        />
      </div>

      <div v-if="horariosDisponibles.length === 0" class="text-grey q-mt-md">
        No hay horarios disponibles para esta fecha.
      </div>
    </div>

    <!-- Mis reservas -->
    <div class="q-mt-xl">
      <h5>Mis reservas</h5>
      <q-list bordered v-if="misReservas.length > 0">
        <q-item v-for="reserva in misReservas" :key="reserva.id">
          <q-item-section>
            <q-item-label>{{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}</q-item-label>
            <q-item-label caption>Estado: {{ reserva.estado }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="negative" icon="delete" @click="cancelarReserva(reserva.id)" size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
      <p v-else class="text-grey">No tienes reservas activas.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { user } = useAuth();

const fechaSeleccionada = ref('');
const horariosDisponibles = ref<string[]>([]);
const misReservas = ref<any[]>([]);
const reservando = ref(false);

// Fechas mínima y máxima (3 meses vista)
const fechaMinima = new Date().toISOString().split('T')[0];
const fechaMaxima = computed(() => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString().split('T')[0];
});

// Horarios disponibles (9:00 AM to 6:00 PM)
const todosLosHorarios = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

// Opciones para fechas disponibles
const opcionesFechas = (date: string) => {
  const selectedDate = new Date(date);
  const today = new Date();
  const maxDate = new Date();

  maxDate.setMonth(today.getMonth() + 3);
  today.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return false;
  }
  if (selectedDate > maxDate) {
    return false;
  }
  const day = selectedDate.getDay();
  if (day === 0 || day === 6) {
    return false;
  }
  return true;
};

// Formatear fecha
const formatFecha = (fecha: string) => {
  // ✅ Tipo string
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Cargar horarios disponibles
const cargarHorariosDisponibles = async (fecha: string) => {
  // ✅ Tipo string
  if (!fecha) return;

  try {
    // Obtener reservas existentes para esta fecha
    const { data: reservasExistentes } = await supabase
      .from('reservas')
      .select('hora')
      .eq('fecha', fecha)
      .in('estado', ['pendiente', 'confirmada']);

    // Filtrar horarios disponibles
    const horasOcupadas = reservasExistentes?.map((r) => r.hora) || [];
    horariosDisponibles.value = todosLosHorarios.filter((hora) => !horasOcupadas.includes(hora));
  } catch (error) {
    console.error('Error cargando horarios:', error);
  }
};

// Reservar una hora
const reservarHora = async (hora: string) => {
  if (!user.value?.id || !fechaSeleccionada.value) return;

  reservando.value = true;
  try {
    const { data, error } = await supabase
      .from('reservas')
      .insert({
        user_id: user.value.id,
        fecha: fechaSeleccionada.value,
        hora: hora,
        estado: 'pendiente',
      })
      .select();

    if (error) throw error;

    //$q.notify({
    //type: 'positive',
    //message: `Reserva confirmada para el ${formatFecha(fechaSeleccionada.value)} a las ${hora}`,
    //});

    // Recargar datos
    await cargarHorariosDisponibles(fechaSeleccionada.value);
    await cargarMisReservas();
  } catch (error) {
    //$q.notify({
    //type: 'negative',
    //message: 'Error al realizar la reserva',
    // });
  } finally {
    reservando.value = false;
  }
};

// Cargar mis reservas
const cargarMisReservas = async () => {
  if (!user.value?.id) return;

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('user_id', user.value.id)
      .gte('fecha', new Date().toISOString().split('T')[0])
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true });

    if (error) throw error;
    misReservas.value = data || [];
  } catch (error) {
    console.error('Error cargando reservas:', error);
  }
};

// Cancelar reserva
const cancelarReserva = async (reservaId: string) => {
  try {
    const { error } = await supabase.from('reservas').delete().eq('id', reservaId);

    if (error) throw error;

    misReservas.value = misReservas.value.filter((reserva) => reserva.id !== reservaId);

    if (fechaSeleccionada.value) {
      await cargarHorariosDisponibles(fechaSeleccionada.value);
    }

    alert('Reserva eliminada correctamente');
  } catch (error) {
    console.error('Error cancelando reserva:', error);
    alert('Error al eliminar la reserva');
  }
};

// Watchers y lifecycle
onMounted(() => {
  cargarMisReservas();
});
watch(
  () => fechaSeleccionada.value,
  (nuevaFecha: string) => {
    if (nuevaFecha) {
      cargarHorariosDisponibles(nuevaFecha);
    }
  },
);
</script>
