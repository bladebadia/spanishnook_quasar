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

      <!-- Sección de enlaces -->
      <q-card-section class="q-pt-none text-center">
        <div class="q-mb-md">
          <span>¿Aún no tienes cuenta? </span>
          <router-link to="/Registro" class="text-primary"> Regístrate aquí </router-link>
        </div>

        <div>
          <a href="#" @click.prevent="olvidarPassword" class="text-primary">
            ¿Has olvidado tu contraseña?
          </a>
        </div>
      </q-card-section>
    </q-card>

    <!-- Diálogo para recuperar contraseña -->
    <q-dialog v-model="mostrarDialogoRecuperacion" persistent>
      <q-card style="width: 400px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">Recuperar contraseña</div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="emailRecuperacion"
            label="Correo electrónico"
            type="email"
            dense
            :error="!!errorRecuperacion"
            :error-message="errorRecuperacion"
          />
          <p class="text-caption text-grey q-mt-sm">
            Te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            label="Enviar"
            color="primary"
            @click="enviarLinkRecuperacion"
            :loading="loadingRecuperacion"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de confirmación -->
    <q-dialog v-model="mostrarDialogoConfirmacion">
      <q-card style="width: 400px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">Correo enviado</div>
        </q-card-section>

        <q-card-section>
          <p>
            Se ha enviado un enlace de recuperación a <strong>{{ emailRecuperacion }}</strong
            >.
          </p>
          <p class="text-caption text-grey q-mt-sm">
            Revisa tu bandeja de entrada y la carpeta de spam.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

// Variables para recuperación de contraseña
const mostrarDialogoRecuperacion = ref(false);
const mostrarDialogoConfirmacion = ref(false);
const emailRecuperacion = ref('');
const loadingRecuperacion = ref(false);
const errorRecuperacion = ref('');

// Función para abrir el diálogo de recuperación
const olvidarPassword = () => {
  emailRecuperacion.value = email.value;
  mostrarDialogoRecuperacion.value = true;
  errorRecuperacion.value = '';
};

// Función para enviar el link de recuperación
const enviarLinkRecuperacion = async () => {
  if (!emailRecuperacion.value) {
    errorRecuperacion.value = 'Por favor, introduce tu correo electrónico';
    return;
  }

  loadingRecuperacion.value = true;
  errorRecuperacion.value = '';

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(emailRecuperacion.value, {
      redirectTo: `${window.location.origin}/ResetPassword`,
    });

    if (error) {
      throw error;
    }

    // Mostrar confirmación
    mostrarDialogoRecuperacion.value = false;
    mostrarDialogoConfirmacion.value = true;
  } catch (error) {
    console.error('Error enviando email de recuperación:', error);
    if (error instanceof Error) {
      errorRecuperacion.value = error.message;
    } else {
      errorRecuperacion.value = 'Error al enviar el email de recuperación';
    }
  } finally {
    loadingRecuperacion.value = false;
  }
};

// Función de login
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
    await router.push('/');
  } catch (error) {
    console.error('Error inesperado:', error);
    credencialesError.value = true;
  } finally {
    loading.value = false;
  }
}
</script>
