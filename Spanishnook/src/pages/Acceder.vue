<template>
  <q-page class="q-pa-md column items-center justify-evenly">
    <div class="q-mb-md text-h5">Acceder</div>

    <q-card class="q-pa-md" style="width: 400px; max-width: 90vw">
      <!-- Form wrapper sin afectar el layout -->
      <form @submit.prevent="login">
        <q-card-section>
          <!-- Email -->
          <q-input
            filled
            v-model="email"
            label="Correo electrónico"
            type="email"
            dense
            :error="credencialesError"
            :hide-bottom-space="true"
          />

          <!-- Contraseña -->
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            type="password"
            class="q-mt-md"
            dense
            :error="credencialesError"
            :hide-bottom-space="true"
            :error-message="credencialesError ? 'Credenciales incorrectas' : ''"
          />
        </q-card-section>

        <q-card-actions align="right">
          <!-- Botón como type submit -->
          <q-btn label="Entrar" color="primary" type="submit" :loading="loading" />
        </q-card-actions>
      </form>

      <q-card-section class="q-pt-none text-center">
        <span>¿Aún no tienes cuenta? </span>
        <router-link to="/Registro" class="text-primary"> Regístrate aquí </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabaseClient';

defineOptions({ name: 'UserAcceder' });

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const credencialesError = ref(false);

async function login() {
  loading.value = true;
  credencialesError.value = false;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      credencialesError.value = true;
      console.error('Error iniciando sesión:', error.message);
      return;
    }

    console.log('Usuario logueado:', data);
    await router.push('/IndexPage');
  } catch (error) {
    console.error('Error inesperado:', error);
    credencialesError.value = true;
  } finally {
    loading.value = false;
  }
}
</script>
