<template>
  <q-page class="q-pa-md column items-center justify-evenly">
    <div class="q-mb-md text-h5">Iniciar sesión</div>

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
          dense
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Entrar" color="primary" :disable="!puedeEntrar" @click="login" />
      </q-card-actions>

      <!-- Enlace al registro -->
      <q-card-section class="q-pt-none text-center">
        <router-link to="/NuevoRegistro" class="text-primary"> No tengo cuenta </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

// Solo permitir login si los campos no están vacíos
const puedeEntrar = computed(() => email.value.trim() !== '' && password.value.trim() !== '');

import { supabase } from 'src/supabaseClient';

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.error('Error iniciando sesión:', error.message);
    return;
  }

  console.log('Usuario logueado:', data);
  // Redirigir al dashboard
}
</script>
