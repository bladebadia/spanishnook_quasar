<template>
  <q-page class="q-pa-lg">
    <h4>Reserva de Horarios</h4>

    <!-- Carrito de reservas CON CONTADOR -->
    <div v-if="carrito.length > 0" class="q-mb-lg bg-blue-1 q-pa-md rounded-borders">
      <h6>🛒 Carrito de Reservas</h6>
      <q-list bordered>
        <q-item v-for="(reserva, index) in carrito" :key="index">
          <q-item-section>
            <q-item-label>{{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}</q-item-label>
            <q-item-label caption v-if="reserva.expira_en">
              ⏳ Expira en: {{ tiempoRestante(reserva.expira_en) }}
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
        class="col-12 col-md-6"
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';

interface ReservaCarrito {
  id?: string;
  fecha: string;
  hora: string;
  expira_en?: string;
}

interface ReservaConfirmada {
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
//const horariosDisponibles = ref<string[]>([]);
const horasOcupadas = ref<string[]>([]);
const misReservas = ref<ReservaConfirmada[]>([]);
const carrito = ref<ReservaCarrito[]>([]);
const temporizadorReserva = ref<number | null>(null);

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

// Horarios disponibles filtrados (excluyendo ocupados y mostrando solo disponibles)
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

// Formatear fecha
const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Cargar TODAS las horas ocupadas (confirmadas + reservadas activas)
const cargarHorariosOcupados = async (fecha: string) => {
  if (!fecha) {
    horasOcupadas.value = [];
    return;
  }

  try {
    const ahora = new Date().toISOString();

    // Consulta EXPLÍCITA: Dos condiciones separadas
    const { data: reservasConfirmadas, error: error1 } = await supabase
      .from('reservas')
      .select('hora')
      .eq('fecha', fecha)
      .eq('estado', 'confirmada');

    const { data: reservasReservadas, error: error2 } = await supabase
      .from('reservas')
      .select('hora')
      .eq('fecha', fecha)
      .eq('estado', 'reservado')
      .gt('expira_en', ahora);

    if (error1 || error2) {
      console.error('Error cargando horarios ocupados:', error1 || error2);
      return;
    }

    // Combinar y normalizar las horas
    const todasReservas = [...(reservasConfirmadas || []), ...(reservasReservadas || [])];

    horasOcupadas.value = todasReservas.map((r) => {
      // Convertir "09:00:00" a "09:00"
      const [hora, minuto] = r.hora.split(':');
      return `${hora}:${minuto}`;
    });

    console.log('Horas ocupadas para', fecha, ':', horasOcupadas.value);
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

// Calcular tiempo restante para una reserva
const tiempoRestante = (expira_en: string) => {
  const ahora = new Date();
  const expira = new Date(expira_en);
  const diffMs = expira.getTime() - ahora.getTime();

  if (diffMs <= 0) return 'Expirado';

  const diffMins = Math.floor(diffMs / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);

  return `${diffMins}:${diffSecs.toString().padStart(2, '0')} minutos`;
};

// Agregar al carrito CON bloqueo en Supabase
const agregarAlCarrito = async (hora: string) => {
  if (!user.value?.id || !fechaSeleccionada.value) return;

  // Verificación adicional por si acaso
  if (horasOcupadas.value.includes(hora)) {
    alert('Este horario ya no está disponible. Por favor, elige otro.');
    await cargarHorariosOcupados(fechaSeleccionada.value);
    return;
  }

  try {
    const expiraEn = new Date();
    expiraEn.setMinutes(expiraEn.getMinutes() + 15);

    const { data, error } = await supabase
      .from('reservas')
      .insert({
        user_id: user.value.id,
        fecha: fechaSeleccionada.value,
        hora: hora,
        estado: 'reservado',
        expira_en: expiraEn.toISOString(),
      })
      .select();

    if (error) {
      if (error.code === '23505') {
        alert('Este horario acaba de ser reservado. Por favor, elige otro.');
        await cargarHorariosOcupados(fechaSeleccionada.value);
        return;
      }
      throw error;
    }

    // Añadir al carrito local con ID y tiempo de expiración
    carrito.value.push({
      id: data[0]?.id,
      fecha: fechaSeleccionada.value,
      hora: hora,
      expira_en: expiraEn.toISOString(),
    });

    guardarCarrito();
    await cargarHorariosOcupados(fechaSeleccionada.value);

    // Iniciar temporizador individual para esta reserva
    iniciarTemporizadorReserva();
  } catch (error) {
    console.error('Error agregando al carrito:', error);
    alert('Error al reservar el horario');
  }
};

// Quitar del carrito LIBERANDO la reserva en Supabase
const quitarDelCarrito = async (index: number) => {
  if (index < 0 || index >= carrito.value.length) return;

  const reserva = carrito.value[index];

  // Verificación adicional para TypeScript
  if (!reserva) return;

  try {
    if (reserva.id) {
      // Eliminar por ID (más eficiente)
      const { error } = await supabase.from('reservas').delete().eq('id', reserva.id);

      if (error) throw error;
    } else {
      // Fallback por fecha/hora
      const { error } = await supabase
        .from('reservas')
        .delete()
        .eq('fecha', reserva.fecha)
        .eq('hora', reserva.hora)
        .eq('user_id', user.value?.id)
        .eq('estado', 'reservado');

      if (error) throw error;
    }

    carrito.value.splice(index, 1);
    guardarCarrito();

    // Actualizar disponibilidad
    await cargarHorariosOcupados(reserva.fecha);
  } catch (error) {
    console.error('Error eliminando reserva:', error);
    // Limpiar el carrito local aunque falle en Supabase
    carrito.value.splice(index, 1);
    guardarCarrito();
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

// Verificar y limpiar reservas expiradas (SOLO cuando sea necesario)
const verificarReservasExpiradas = async () => {
  try {
    const ahora = new Date().toISOString();
    const hoy = new Date().toISOString().split('T')[0];

    // Eliminar reservas RESERVADAS expiradas
    const { error: errorReservadas } = await supabase
      .from('reservas')
      .delete()
      .eq('estado', 'reservado')
      .lt('expira_en', ahora);

    if (errorReservadas) {
      console.error('Error eliminando reservas expiradas:', errorReservadas);
    }

    // Limpiar reservas de fechas pasadas
    const { error: errorPasadas } = await supabase.from('reservas').delete().lt('fecha', hoy);

    if (errorPasadas) {
      console.error('Error eliminando reservas pasadas:', errorPasadas);
    }

    // Recargar datos después de limpiar
    if (fechaSeleccionada.value) {
      await cargarHorariosOcupados(fechaSeleccionada.value);
    }
    await cargarMisReservas();
    cargarCarrito(); // Recargar carrito por si había expirados
  } catch (error) {
    console.error('Error en verificación de expirados:', error);
  }
};

// Temporizador individual para reservas en carrito
const iniciarTemporizadorReserva = () => {
  if (temporizadorReserva.value !== null) {
    clearInterval(temporizadorReserva.value);
  }

  temporizadorReserva.value = window.setInterval(() => {
    // Actualizar visualmente los contadores
    carrito.value = [...carrito.value];

    // Verificar si alguna reserva expiró y limpiar
    const ahora = new Date();
    const reservasExpiradas = carrito.value.filter(
      (reserva) => reserva.expira_en && new Date(reserva.expira_en) < ahora,
    );

    if (reservasExpiradas.length > 0) {
      // Limpiar reservas expiradas
      void verificarReservasExpiradas();
    }
  }, 1000); // Actualizar cada segundo para el contador
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

// Cleanup
onUnmounted(() => {
  if (temporizadorReserva.value !== null) {
    clearInterval(temporizadorReserva.value);
  }
});

// Watchers y lifecycle
onMounted(async () => {
  await verificarReservasExpiradas(); // Limpiar al cargar la página
  cargarCarrito();
  await cargarMisReservas();
  iniciarTemporizadorReserva(); // Iniciar temporizador para contadores
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
