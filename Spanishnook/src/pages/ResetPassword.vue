<template>
  <q-page class="q-pa-md column items-center justify-center">
    <q-card class="q-pa-lg" style="max-width: 400px; width: 90vw">
      <q-card-section class="text-h6 text-center"> Restablecer contraseña </q-card-section>

      <q-card-section>
        <!-- Nueva contraseña -->
        <q-input
          filled
          v-model="nuevaPassword"
          label="Nueva contraseña"
          :type="mostrarPassword ? 'text' : 'password'"
          dense
          :error="passwordError && mostrarErrores"
          :hide-bottom-space="!passwordError || !mostrarErrores"
          :error-message="
            passwordError && mostrarErrores
              ? 'La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo'
              : ''
          "
        >
          <template v-slot:append>
            <q-icon
              :name="mostrarPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="mostrarPassword = !mostrarPassword"
            />
          </template>
        </q-input>

        <!-- Confirmar nueva contraseña -->
        <q-input
          filled
          v-model="confirmarPassword"
          label="Confirmar nueva contraseña"
          type="password"
          class="q-mt-md"
          dense
          :error="confirmarError && mostrarErrores"
          :hide-bottom-space="!confirmarError || !mostrarErrores"
          :error-message="confirmarError && mostrarErrores ? 'Las contraseñas no coinciden' : ''"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          label="Restablecer contraseña"
          color="primary"
          @click="resetPassword"
          :loading="loading"
          :disable="!nuevaPassword || !confirmarPassword"
        />
      </q-card-actions>

      <q-card-section v-if="success" class="text-positive text-center">
        ✅ Contraseña restablecida correctamente. Redirigiendo...
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from 'src/supabaseClient';

const router = useRouter();
const nuevaPassword = ref('');
const confirmarPassword = ref('');
const mostrarPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const success = ref(false);
const mostrarErrores = ref(false);

// ✅ Misma regla de contraseña que en registro
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const passwordValida = computed(() => passwordRegex.test(nuevaPassword.value));

// ✅ Errores (solo después de intentar)
const passwordError = computed(() => !passwordValida.value);
const confirmarError = computed(() => confirmarPassword.value !== nuevaPassword.value);

onMounted(() => {
  // Verificar que el usuario viene de un link válido de recuperación
});

const resetPassword = async () => {
  mostrarErrores.value = true;

  // ✅ Validaciones igual que en registro
  if (!passwordValida.value || confirmarPassword.value !== nuevaPassword.value) {
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const { error } = await supabase.auth.updateUser({
      password: nuevaPassword.value,
    });

    if (error) throw error;

    success.value = true;
    setTimeout(() => {
      void router.push('/Acceder');
    }, 2000);
  } catch (error) {
    console.error('Error restableciendo contraseña:', error);
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Error al restablecer la contraseña';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Espaciado consistente con el registro */
.q-mt-md {
  margin-top: 16px;
}
</style>
