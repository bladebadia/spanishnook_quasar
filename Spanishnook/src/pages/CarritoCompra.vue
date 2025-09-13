<template>
  <q-page class="q-pa-lg">
    <h4>🛒 Carrito de Reservas</h4>

    <div v-if="carrito.length === 0" class="text-center q-mt-xl">
      <q-icon name="shopping_cart" size="100px" color="grey-4" />
      <p class="text-grey q-mt-md">Tu carrito está vacío</p>
      <q-btn color="primary" label="Volver a Reservas" to="/HorarioReserva" class="q-mt-md" />
    </div>

    <div v-else>
      <!-- Lista de reservas en carrito -->
      <q-list bordered class="q-mb-lg">
        <q-item
          v-for="(reserva, index) in carrito"
          :key="index"
          class="q-mb-sm"
          :class="{ 'bg-negative-1': esReservaConflictiva(reserva) }"
        >
          <q-item-section>
            <q-item-label class="text-h6" :class="{ 'text-white': esReservaConflictiva(reserva) }">
              {{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}
            </q-item-label>
            <q-item-label v-if="esReservaConflictiva(reserva)" class="text-white">
              ⚠️ Esta hora ya está ocupada
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              color="negative"
              icon="delete"
              @click="quitarDelCarrito(index)"
              round
              flat
              :class="{ 'text-white': esReservaConflictiva(reserva) }"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Resumen del pedido -->
      <div class="bg-grey-2 q-pa-md rounded-borders q-mb-lg">
        <h6>Resumen del Pedido</h6>
        <div class="row justify-between items-center">
          <span>{{ carrito.length }} reserva(s)</span>
          <span class="text-h6 text-primary">Total: {{ total }}€</span>
        </div>
        <div v-if="reservasConflictivas.length > 0" class="text-negative q-mt-sm">
          ⚠️ {{ reservasConflictivas.length }} reserva(s) no disponible(s)
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="row q-gutter-md justify-end">
        <q-btn color="grey" label="Seguir Reservando" to="/HorarioReserva" outline />
        <q-btn
          color="primary"
          label="Confirmar Reservas"
          @click="confirmarReservas"
          :disabled="!usuarioLogueado || reservasConflictivas.length > 0"
          :loading="confirmando"
        />
      </div>

      <!-- Mensajes informativos -->
      <q-banner v-if="!usuarioLogueado" class="bg-warning text-dark q-mt-md">
        ⚠️ Debes iniciar sesión para confirmar reservas
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from 'src/supabaseClient';
import { useAuth } from 'src/stores/auth';

const { user } = useAuth();
const router = useRouter();

interface ReservaCarrito {
  fecha: string;
  hora: string;
}

const carrito = ref<ReservaCarrito[]>([]);
const confirmando = ref(false);
const reservasConflictivas = ref<ReservaCarrito[]>([]);

// Computed properties
const usuarioLogueado = computed(() => !!user.value?.id);
const total = computed(() => carrito.value.length * 25); // 25€ por reserva

// Verificar si una reserva es conflictiva
const esReservaConflictiva = (reserva: ReservaCarrito) => {
  return reservasConflictivas.value.some(
    (conflictiva) => conflictiva.fecha === reserva.fecha && conflictiva.hora === reserva.hora,
  );
};

// Cargar carrito desde localStorage
const cargarCarrito = () => {
  const carritoGuardado = localStorage.getItem('carritoReservas');
  if (carritoGuardado) {
    carrito.value = JSON.parse(carritoGuardado);
  }
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

// Quitar reserva del carrito
const quitarDelCarrito = (index: number) => {
  const reservaEliminada = carrito.value[index];
  carrito.value.splice(index, 1);
  guardarCarrito();

  // Eliminar también de las conflictivas si estaba ahí
  reservasConflictivas.value = reservasConflictivas.value.filter(
    (conflictiva) =>
      !(conflictiva.fecha === reservaEliminada.fecha && conflictiva.hora === reservaEliminada.hora),
  );
};

// Guardar carrito en localStorage
const guardarCarrito = () => {
  localStorage.setItem('carritoReservas', JSON.stringify(carrito.value));
};

// Verificar disponibilidad de TODAS las reservas
const verificarDisponibilidad = async () => {
  try {
    if (carrito.value.length === 0) {
      reservasConflictivas.value = [];
      return;
    }

    const horasParaVerificar = carrito.value.map((reserva) => ({
      fecha: reserva.fecha,
      hora: reserva.hora + ':00',
    }));

    // Consultar TODAS las reservas confirmadas que coincidan
    const { data: reservasOcupadas, error } = await supabase
      .from('reservas')
      .select('fecha, hora')
      .eq('estado', 'confirmada')
      .in('fecha', [...new Set(horasParaVerificar.map((h) => h.fecha))])
      .in('hora', [...new Set(horasParaVerificar.map((h) => h.hora))]);

    if (error) throw error;

    // Encontrar las reservas conflictivas
    reservasConflictivas.value = carrito.value.filter((reserva) => {
      const horaBD = reserva.hora + ':00';
      return reservasOcupadas.some(
        (ocupada) => ocupada.fecha === reserva.fecha && ocupada.hora === horaBD,
      );
    });
  } catch (error) {
    console.error('Error verificando disponibilidad:', error);
    alert('Error al verificar disponibilidad. Por favor, intenta nuevamente.');
  }
};

// Confirmar todas las reservas
const confirmarReservas = async () => {
  if (!usuarioLogueado.value || reservasConflictivas.value.length > 0) return;

  confirmando.value = true;

  try {
    // Verificar una última vez por si acaso
    await verificarDisponibilidad();
    if (reservasConflictivas.value.length > 0) {
      return;
    }

    // Insertar todas las reservas
    const reservasParaInsertar = carrito.value.map((reserva) => ({
      user_id: user.value!.id,
      fecha: reserva.fecha,
      hora: reserva.hora + ':00',
      estado: 'confirmada',
    }));

    const { error } = await supabase.from('reservas').insert(reservasParaInsertar);

    if (error) {
      if (error.code === '23505') {
        // Si hay conflicto durante la inserción, actualizar y mostrar
        await verificarDisponibilidad();
        return;
      }
      throw error;
    }

    // Limpiar y redirigir
    carrito.value = [];
    reservasConflictivas.value = [];
    guardarCarrito();

    alert('¡Reservas confirmadas exitosamente!');
    await router.push('/AreaPersonal');
  } catch (error) {
    console.error('Error confirmando reservas:', error);
    alert('Error al confirmar las reservas. Por favor, intenta nuevamente.');
  } finally {
    confirmando.value = false;
  }
};

onMounted(() => {
  cargarCarrito();
});
</script>

<style scoped>
.q-item {
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.3s ease;
}

.bg-negative-1 {
  background-color: #851319;
}

.text-h6 {
  font-weight: 500;
}

.text-white {
  color: white !important;
}
</style>
