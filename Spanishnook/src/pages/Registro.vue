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
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Registrarse" color="primary" @click="registrar" />
      </q-card-actions>

      <q-card-section class="q-pt-none text-center">
        <router-link to="/Acceder" class="text-primary"> Ya tengo cuenta </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserRegistro' });
import { ref, computed } from 'vue';
import { supabase } from '../supabaseClient';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const mostrarErrores = ref(false);

// Regla de contraseña
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const passwordValida = computed(() => passwordRegex.test(password.value));

// Errores (solo después de intentar registrar)
const passwordError = computed(() => mostrarErrores.value && !passwordValida.value);
const confirmError = computed(
  () => mostrarErrores.value && confirmPassword.value !== password.value,
);

async function registrar() {
  mostrarErrores.value = true;

  if (!email.value || !passwordValida.value || confirmPassword.value !== password.value) {
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: 'http://localhost:9000/AuthCallback',
    },
  });

  if (error) {
    console.error('Error registrando:', error.message);
    return;
  }

  console.log('Usuario registrado:', data);
}
</script>
