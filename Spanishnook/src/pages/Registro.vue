<template>
  <q-page class="q-pa-md column items-center justify-evenly">
    <div class="q-mb-md text-h5">Registro</div>

    <q-card class="q-pa-md" style="width: 400px; max-width: 90vw">
      <!-- Formulario para manejar el submit con Enter -->
      <form @submit.prevent="registrar">
        <q-card-section>
          <!-- Nombre/Apodo - SOLO espacio cuando hay error -->
          <q-input
            filled
            v-model="nombre"
            label="Nombre o apodo"
            dense
            :error="false"
            :hide-bottom-space="true"
          />

          <!-- Email - SOLO espacio cuando hay error -->
          <q-input
            filled
            v-model="email"
            label="Correo electrónico"
            type="email"
            class="q-mt-md"
            dense
            :error="!!errorMessage"
            :error-message="errorMessage"
            :hide-bottom-space="!errorMessage"
          />

          <!-- Contraseña - SOLO espacio cuando hay error -->
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            type="password"
            class="q-mt-md"
            dense
            :error="passwordError && mostrarErrores"
            :hide-bottom-space="!(passwordError && mostrarErrores)"
            :error-message="
              passwordError && mostrarErrores
                ? 'La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo'
                : ''
            "
          />

          <!-- Confirmar contraseña - SOLO espacio cuando hay error -->
          <q-input
            filled
            v-model="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            class="q-mt-md"
            dense
            :error="confirmError && mostrarErrores"
            :hide-bottom-space="!(confirmError && mostrarErrores)"
            :error-message="confirmError && mostrarErrores ? 'Las contraseñas no coinciden' : ''"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Registrarse" color="primary" type="submit" :loading="loading" />
        </q-card-actions>
      </form>

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
import { useRouter } from 'vue-router';

const nombre = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const mostrarErrores = ref(false);
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();

// Regla de contraseña
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const passwordValida = computed(() => passwordRegex.test(password.value));

// Errores (solo después de intentar registrar)
const passwordError = computed(() => !passwordValida.value);
const confirmError = computed(() => confirmPassword.value !== password.value);

async function registrar() {
  loading.value = true;
  mostrarErrores.value = true;
  errorMessage.value = '';

  // Validaciones básicas
  if (
    !nombre.value ||
    !email.value ||
    !passwordValida.value ||
    confirmPassword.value !== password.value
  ) {
    loading.value = false;
    return;
  }

  try {
    // MÉTODO CORRECTO: Intentar iniciar sesión para ver si el usuario existe
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: 'dummy_password_incorrect', // Contraseña incorrecta a propósito
    });

    // Si el error es de credenciales inválidas, el usuario EXISTE
    if (signInError && signInError.message.includes('Invalid login credentials')) {
      errorMessage.value = 'Este correo electrónico ya está registrado. Por favor, inicia sesión.';
      loading.value = false;
      return;
    }

    // Si hay otro error diferente, puede que el usuario no exista
    // o que haya otro problema, procedemos con el registro

    // Intentar el registro
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: 'http://localhost:9000/AuthCallback',
        data: {
          nombre: nombre.value,
        },
      },
    });

    if (error) {
      // Manejo de errores de Supabase Auth
      if (
        error.message.includes('already registered') ||
        error.message.includes('User already exists') ||
        error.message.includes('already exists') ||
        error.message.includes('user already exists')
      ) {
        errorMessage.value =
          'Este correo electrónico ya está registrado. Por favor, inicia sesión.';
      } else {
        errorMessage.value = `Error al registrarse: ${error.message}`;
      }
      console.error('Error registrando:', error.message);
      loading.value = false;
      return;
    }

    console.log('Usuario registrado:', data);

    // Verificar si realmente se creó el usuario o si ya existía
    if (data.user?.identities?.length === 0) {
      // Esto significa que el usuario ya existía pero no se creó identidad nueva
      errorMessage.value = 'Este correo electrónico ya está registrado. Por favor, inicia sesión.';
      loading.value = false;
      return;
    }

    await router.push('/CheckEmail');
  } catch (error) {
    console.error('Error inesperado:', error);
    errorMessage.value = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
  } finally {
    loading.value = false;
  }
}
</script>
