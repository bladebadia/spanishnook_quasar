<template>
  <q-page class="q-pa-md column items-center justify-evenly">
    <div class="q-mb-md text-h5">Registro</div>

    <q-card class="q-pa-md" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <!-- Email -->
        <q-input filled v-model="email" label="Correo electrónico" type="email" dense />

        <!-- Contraseña -->
        <q-input
          filled
          v-model="password"
          label="Contraseña"
          type="password"
          class="q-mt-md"
          :error="passwordError"
          :hide-bottom-space="!passwordError"
          :error-message="'La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo'"
          dense
        />

        <!-- Confirmar contraseña -->
        <q-input
          filled
          v-model="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          class="q-mt-md"
          :error="confirmError"
          :hide-bottom-space="!confirmError"
          :error-message="'Las contraseñas no coinciden'"
          dense
        />

        <!-- Nivel de español -->
        <q-select
          filled
          v-model="nivel"
          :options="niveles"
          label="Nivel de español"
          class="q-mt-md"
          dense
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Registrarse" color="primary" @click="registrar" />
      </q-card-actions>

      <!-- Enlace al login -->
      <q-card-section class="q-pt-none text-center">
        <router-link to="/login" class="text-primary"> Ya tengo cuenta </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { supabase } from 'src/supabaseClient';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const nivel = ref<string | null>(null);
const mostrarErrores = ref(false);

const niveles = ['A1', 'A2', 'B1', 'B2', 'C1'];

// Reglas de contraseña
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const passwordValida = computed(() => passwordRegex.test(password.value));

// Estados de error (solo después de intentar registrar)
const passwordError = computed(() => mostrarErrores.value && !passwordValida.value);
const confirmError = computed(
  () => mostrarErrores.value && confirmPassword.value !== password.value,
);

async function registrar() {
  mostrarErrores.value = true;

  if (
    !email.value ||
    !passwordValida.value ||
    confirmPassword.value !== password.value ||
    !nivel.value
  ) {
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: { nivel: nivel.value }, // guarda el nivel como metadata del usuario
    },
  });

  if (error) {
    console.error('Error registrando:', error.message);
    return;
  }

  console.log('Usuario registrado:', data);
  // Puedes redirigir al login o mostrar mensaje
}
</script>
