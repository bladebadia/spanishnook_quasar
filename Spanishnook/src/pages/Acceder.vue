<template>
  <q-page class="q-pa-md column items-center justify-evenly">
    <div class="q-mb-md text-h5">Acceder</div>

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
        <q-btn label="Entrar" color="primary" @click="login" />
      </q-card-actions>

      <q-card-section class="q-pt-none text-center">
        <span>¿Aún no tienes cuenta? </span>
        <router-link to="/Registro" class="text-primary"> Regístrate aquí </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserAcceder' });

import { ref } from 'vue';
import { supabase } from '../supabaseClient';

const email = ref('');
const password = ref('');

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
  // Aquí puedes redirigir al dashboard o página principal
}
</script>
