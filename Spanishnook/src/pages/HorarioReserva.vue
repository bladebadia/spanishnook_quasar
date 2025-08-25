<template>
  <q-page class="q-pa-lg">
    <h4>Reserva de Horarios</h4>

    <!-- Reservas temporales pendientes -->
    <div v-if="reservasTemporales.length > 0" class="q-mb-lg bg-yellow-2 q-pa-md rounded-borders">
      <h6>Reservas Pendientes de Confirmación</h6>
      <q-list bordered>
        <q-item v-for="reserva in reservasTemporales" :key="reserva.id">
          <q-item-section>
            <q-item-label>{{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}</q-item-label>
            <q-item-label caption>
              Expira en: {{ calcularTiempoRestante(reserva.expira_en) }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              color="positive"
              icon="check"
              @click="confirmarReserva(reserva.id)"
              size="sm"
              label="Confirmar"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

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
          v-for="hora in todosLosHorarios"
          :key="`${hora}-${horariosDisponibles.includes(hora)}`"
          :color="horariosDisponibles.includes(hora) ? 'primary' : 'grey'"
          :label="hora"
          @click="reservarHora(hora)"
          :disabled="!horariosDisponibles.includes(hora) || reservando"
          outline
        />
      </div>

      <div v-if="horariosDisponibles.length === 0" class="text-grey q-mt-md">
        No hay horarios disponibles para esta fecha.
      </div>
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';

interface Reserva {
  id: string;
  user_id: string;
  fecha: string;
  hora: string;
  estado: string;
  expira_en?: string;
  created_at?: string;
}

const { user } = useAuth();

const fechaSeleccionada = ref('');
const horariosDisponibles = ref<string[]>([]);
const misReservas = ref<Reserva[]>([]);
const reservasTemporales = ref<Reserva[]>([]);
const reservando = ref(false);
const temporizador = ref<number | null>(null);

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
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

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

// Formatear fecha
const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Calcular tiempo restante
const calcularTiempoRestante = (expiraEn: string | undefined) => {
  if (!expiraEn) return '';

  const ahora = new Date();
  const expira = new Date(expiraEn);
  const diffMs = expira.getTime() - ahora.getTime();
  const diffMins = Math.max(0, Math.floor(diffMs / 60000));

  return `${diffMins} minutos`;
};

// Cargar horarios disponibles
const cargarHorariosDisponibles = async (fecha: string) => {
  if (!fecha) {
    horariosDisponibles.value = [];
    return;
  }

  try {
    const ahora = new Date().toISOString();

    const { data: reservasExistentes, error } = await supabase
      .from('reservas')
      .select('hora')
      .eq('fecha', fecha)
      .or('estado.in.(pendiente,confirmada),and(estado.eq.temporal,expira_en.gt.' + ahora + ')');

    if (error) {
      console.error('Error cargando horarios ocupados:', error);
      return;
    }

    const horasOcupadas = reservasExistentes?.map((r) => r.hora) || [];
    horariosDisponibles.value = todosLosHorarios.filter((hora) => !horasOcupadas.includes(hora));
  } catch (error) {
    console.error('Error cargando horarios:', error);
    horariosDisponibles.value = [];
  }
};

// Reservar una hora
const reservarHora = async (hora: string) => {
  if (!user.value?.id || !fechaSeleccionada.value) return;

  // Validación frontend
  if (!horariosDisponibles.value.includes(hora)) {
    alert('Este horario ya está reservado. Por favor, elige otro.');
    return;
  }

  reservando.value = true;
  try {
    const expiraEn = new Date();
    expiraEn.setMinutes(expiraEn.getMinutes() + 15);

    const { error } = await supabase.from('reservas').insert({
      user_id: user.value.id,
      fecha: fechaSeleccionada.value,
      hora: hora,
      estado: 'temporal',
      expira_en: expiraEn.toISOString(),
    });

    if (error) {
      // Manejo específico de error de duplicado
      if (error.code === '23505') {
        alert(
          'Este horario acaba de ser reservado. Por favor, actualiza la página y elige otro horario.',
        );
        // Recargar horarios disponibles
        await cargarHorariosDisponibles(fechaSeleccionada.value);
        return;
      }
      throw error;
    }

    alert('⏳ Reserva temporal creada. Tienes 15 minutos para confirmar.');

    // Actualizar UI inmediatamente
    horariosDisponibles.value = horariosDisponibles.value.filter((h) => h !== hora);
    await cargarReservasTemporales();
  } catch (error) {
    console.error('Error realizando reserva:', error);
    alert('Error al realizar la reserva');
  } finally {
    reservando.value = false;
  }
};

// Confirmar reserva permanente
const confirmarReserva = async (reservaId: string) => {
  try {
    const { error } = await supabase
      .from('reservas')
      .update({
        estado: 'confirmada',
        expira_en: null,
      })
      .eq('id', reservaId);

    if (error) throw error;

    alert('✅ Reserva confirmada permanentemente');
    await cargarMisReservas();
    await cargarReservasTemporales();
    if (fechaSeleccionada.value) {
      await cargarHorariosDisponibles(fechaSeleccionada.value);
    }
  } catch (error) {
    console.error('Error confirmando reserva:', error);
    alert('Error al confirmar la reserva');
  }
};

// Verificar y limpiar reservas expiradas
// Verificar y limpiar reservas expiradas - MEJORADA
const verificarReservasExpiradas = async () => {
  try {
    const ahora = new Date().toISOString();

    const { data: expiradas, error: selectError } = await supabase
      .from('reservas')
      .select('*')
      .lt('expira_en', ahora)
      .eq('estado', 'temporal');

    if (selectError) {
      console.error('Error buscando reservas expiradas:', selectError);
      return;
    }

    console.log('Reservas expiradas encontradas:', expiradas?.length);

    const { error: deleteError } = await supabase
      .from('reservas')
      .delete()
      .lt('expira_en', ahora)
      .eq('estado', 'temporal');

    if (deleteError) {
      console.error('Error eliminando reservas expiradas:', deleteError);
      return;
    }

    console.log('Reservas expiradas eliminadas');

    await Promise.all([
      cargarReservasTemporales(),
      fechaSeleccionada.value
        ? cargarHorariosDisponibles(fechaSeleccionada.value)
        : Promise.resolve(),
    ]);
  } catch (error) {
    console.error('Error en verificación de expirados:', error);
  }
};

// Iniciar temporizador
const iniciarTemporizador = () => {
  if (temporizador.value !== null) {
    clearInterval(temporizador.value);
  }

  temporizador.value = window.setInterval(() => {
    void verificarReservasExpiradas();
  }, 60000);
};

// Cargar reservas temporales
const cargarReservasTemporales = async () => {
  if (!user.value?.id) {
    reservasTemporales.value = [];
    return;
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('user_id', user.value.id)
      .eq('estado', 'temporal')
      .order('expira_en', { ascending: true });

    if (error) throw error;
    reservasTemporales.value = data || [];
  } catch (error) {
    console.error('Error cargando reservas temporales:', error);
    reservasTemporales.value = [];
  }
};

// Cargar mis reservas (excluyendo temporales)
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
      .neq('estado', 'temporal')
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
      await cargarHorariosDisponibles(fechaSeleccionada.value);
    }

    alert('Reserva eliminada correctamente');
  } catch (error) {
    console.error('Error cancelando reserva:', error);
    alert('Error al eliminar la reserva');
  }
};

// Cleanup
onUnmounted(() => {
  if (temporizador.value !== null) {
    clearInterval(temporizador.value);
  }
});

// Watchers y lifecycle
onMounted(async () => {
  await verificarReservasExpiradas();

  // cargar datos
  await Promise.all([cargarMisReservas(), cargarReservasTemporales()]);

  // Iniciar temporizador
  iniciarTemporizador();
});

watch(
  () => fechaSeleccionada.value,
  (nuevaFecha: string) => {
    if (nuevaFecha) {
      void cargarHorariosDisponibles(nuevaFecha);
    }
  },
);
</script>
