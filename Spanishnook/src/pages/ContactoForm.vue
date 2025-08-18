<template>
  <q-page class="row items-center justify-evenly">
    <div class="row justify-center">
      <div class="col-8 col-md-12">
        <q-card flat bordered style="max-width: 600px; width: 100%">
          <q-card-section class="text-center">
            <h3>Formulario de Contacto</h3>
            <p>
              Si tienes alguna pregunta o comentario, por favor completa el siguiente formulario.
            </p>
          </q-card-section>
          <q-card-section>
            <q-form @submit="submitForm" class="q-gutter-md">
              <q-input
                v-model="form.name"
                label="Nombre *"
                filled
                :rules="[(val) => !!val || 'El nombre es requerido']"
              />

              <q-input
                v-model="form.email"
                label="Email *"
                type="email"
                filled
                :rules="[
                  (val) => !!val || 'El email es requerido',
                  (val) => /.+@.+\..+/.test(val) || 'Email debe ser válido',
                ]"
              />

              <q-input
                v-model="form.message"
                label="Mensaje *"
                type="textarea"
                filled
                rows="4"
                :rules="[(val) => !!val || 'El mensaje es requerido']"
              />

              <div class="text-center">
                <q-btn
                  label="Enviar Mensaje"
                  type="submit"
                  color="primary"
                  size="lg"
                  class="q-px-xl"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const form = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  $q.notify({
    type: 'positive',
    message: '¡Mensaje enviado con éxito!',
    icon: 'send',
  });

  // Reset form
  form.value = {
    name: '',
    email: '',
    message: '',
  };
};

//const onClick = () => {
//  $q.notify({
//    type: 'info',
//    message: '¡Chat en línea!',
//    icon: 'chat',
//  });
//};
</script>
