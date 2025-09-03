<template>
  <q-page class="q-pa-lg">
    <h4>🛒 Carrito de Reservas</h4>

    <div v-if="carrito.length === 0" class="text-center q-mt-xl">
      <q-icon name="shopping_cart" size="100px" color="grey-4" />
      <p class="text-grey q-mt-md">Tu carrito está vacío</p>
      <q-btn color="primary" label="Volver a Reservas" to="/reserva" class="q-mt-md" />
    </div>

    <div v-else>
      <q-list bordered class="q-mb-lg">
        <q-item v-for="(reserva, index) in carrito" :key="index" class="q-mb-sm">
          <q-item-section>
            <q-item-label class="text-h6">
              {{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}
            </q-item-label>
            <q-item-label caption v-if="reserva.expira_en">
              ⏳ Expira en: {{ tiempoRestante(reserva.expira_en) }}
            </q-item-label>
            <q-item-label caption v-else class="text-negative">
              ⚠️ Tiempo de reserva no disponible
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn color="negative" icon="delete" @click="quitarDelCarrito(index)" round flat />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Botones de acción -->
      <div class="row q-gutter-md justify-end">
        <q-btn color="grey" label="Seguir Reservando" to="/HorarioReserva" outline />
        <q-btn
          color="primary"
          label="Confirmar Reservas"
          @click="confirmarReservas"
          :disabled="hayReservasExpiradas"
        />
      </div>

      <!-- Alerta de reservas expiradas -->
      <q-banner v-if="hayReservasExpiradas" class="bg-negative text-white q-mt-md">
        ⚠️ Tienres reservas que han expirado. Por favor, elimínalas y vuelve a reservar.
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from 'src/supabaseClient';
import { useAuth } from 'src/stores/auth';

const { user } = useAuth();
const router = useRouter();

interface ReservaCarrito {
  id?: string;
  fecha: string;
  hora: string;
  expira_en?: string;
}

const carrito = ref<ReservaCarrito[]>([]);
const temporizador = ref<number | null>(null);

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

// Calcular tiempo restante
const tiempoRestante = (expira_en: string) => {
  const ahora = new Date();
  const expira = new Date(expira_en);
  const diffMs = expira.getTime() - ahora.getTime();

  if (diffMs <= 0) return 'Expirado';

  const diffMins = Math.floor(diffMs / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);

  return `${diffMins}:${diffSecs.toString().padStart(2, '0')} minutos`;
};

// Verificar si hay reservas expiradas
const hayReservasExpiradas = computed(() => {
  const ahora = new Date();
  return carrito.value.some((reserva) => reserva.expira_en && new Date(reserva.expira_en) < ahora);
});

// Quitar reserva del carrito
const quitarDelCarrito = async (index: number) => {
  const reserva = carrito.value[index];

  if (!reserva) return;

  try {
    if (reserva.id) {
      await supabase.from('reservas').delete().eq('id', reserva.id);
    }

    carrito.value.splice(index, 1);
    guardarCarrito();
  } catch (error) {
    console.error('Error eliminando reserva:', error);
    carrito.value.splice(index, 1);
    guardarCarrito();
  }
};

// Guardar carrito en localStorage
const guardarCarrito = () => {
  localStorage.setItem('carritoReservas', JSON.stringify(carrito.value));
};

// Confirmar todas las reservas
const confirmarReservas = async () => {
  if (!user.value?.id) {
    alert('Debes iniciar sesión para confirmar reservas');
    return;
  }

  try {
    // Actualizar todas las reservas a estado "confirmada"
    for (const reserva of carrito.value) {
      if (reserva.id) {
        const { error } = await supabase
          .from('reservas')
          .update({ estado: 'confirmada' })
          .eq('id', reserva.id);

        if (error) throw error;
      }
    }

    // Limpiar carrito
    carrito.value = [];
    guardarCarrito();

    alert('¡Reservas confirmadas exitosamente!');
    void router.push('/AreaPersonal');
  } catch (error) {
    console.error('Error confirmando reservas:', error);
    alert('Error al confirmar las reservas');
  }
};

// Iniciar temporizador para actualizar contadores
const iniciarTemporizador = () => {
  temporizador.value = window.setInterval(() => {
    // Forzar re-renderizado para actualizar contadores
    carrito.value = [...carrito.value];

    // Si hay reservas expiradas, mostrar alerta
    if (hayReservasExpiradas.value) {
      // Opcional: limpiar automáticamente las expiradas
      const ahora = new Date();
      carrito.value = carrito.value.filter(
        (reserva) => !reserva.expira_en || new Date(reserva.expira_en) >= ahora,
      );
      guardarCarrito();
    }
  }, 1000);
};

onMounted(() => {
  cargarCarrito();
  iniciarTemporizador();
});

onUnmounted(() => {
  if (temporizador.value) {
    clearInterval(temporizador.value);
  }
});
</script>

<style scoped>
.q-item {
  border-radius: 8px;
  margin-bottom: 8px;
}
</style>
