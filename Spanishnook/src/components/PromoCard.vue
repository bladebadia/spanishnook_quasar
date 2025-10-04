<!-- filepath: /workspaces/Spanishnook/Spanishnook/src/components/PromoCard.vue -->
<template>
  <div class="col-12 col-sm-6 col-md-4">
    <q-card class="tarjeta-onPromo1">
      <q-img
        :src="imageSrc"
        fit="contain"
        :style="computedImageStyle"
        class="card-img-animada q-ma-md"
        ratio="1"
        @error="onImageError"
      />
      <q-card-section class="text-center titulo-tarjeta">
        {{ title }}
      </q-card-section>
      <q-card-section class="texto-tarjeta text-justify q-mx-xs q-mx-md-lg">
        {{ description }}
      </q-card-section>
      <q-card-actions class="flex flex-center">
        <q-btn
          color="primary"
          :to="buttonLink"
          class="btn-tarjeta-fixed"
          unelevated
        >
          {{ buttonText }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageStyle?: string;
}

const props = defineProps<Props>();

const computedImageStyle = computed(() => {
  const baseStyle = 'max-height: 350px; width: 100%; margin: 0 auto; display: block';
  return props.imageStyle ? `${baseStyle}; ${props.imageStyle}` : baseStyle;
});

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  console.warn('Error cargando imagen:', target.src);
  target.src = '/img/estudiante_1024.jpg';
};
</script>

<style scoped>
/* Estilos específicos del componente PromoCard */

/* Contenedor de tarjeta */
.tarjeta-onPromo1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  position: relative;
  padding-bottom: 60px;
  padding-left: 3%;
  padding-right: 3%;
  margin-left: 8%;
  margin-right: 8%;
  max-width: 84%;
  box-shadow: none !important;
  background: white;
  border-radius: 12px;
}

/* Título de la tarjeta */
.titulo-tarjeta {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Texto de la tarjeta */
.texto-tarjeta {
  font-size: 1.3rem;
}

/* Botón centrado en la parte inferior */
.btn-tarjeta-fixed {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(80% - 32px);
  margin: 0;
  border-radius: 64px !important;
  padding-left: 0px;
  padding-right: 0px;
  font-weight: bold;
  font-size: 1rem;
}

/* Ajustar las acciones de la tarjeta */
.tarjeta-onPromo1 .q-card-actions {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  margin-top: 0;
  padding-top: 0;
  justify-content: center;
}

/* Asegurar que el contenido no se superponga */
.tarjeta-onPromo1 .q-card-section:last-of-type {
  padding-bottom: 0;
  margin-bottom: 8px;
}

/* Animación de imagen */
.card-img-animada {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 12px;
  overflow: hidden;
}

.card-img-animada:hover {
  transform: scale(1.15);
}

/* Asegurar que las imágenes SVG se muestren correctamente */
.tarjeta-onPromo1 .q-img {
  background-color: transparent;
}

.tarjeta-onPromo1 .q-img__content {
  background-color: transparent;
}

/* ========== RESPONSIVE DESIGN ========== */

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .tarjeta-onPromo1 {
    width: 84%;
    height: 550px;
    position: relative;
    padding-bottom: 60px;
    margin: 0 auto;
  }
  
  .titulo-tarjeta {
    font-size: 1.3rem;
  }
  
  .texto-tarjeta {
    font-size: 1.3rem;
  }
  
  .btn-tarjeta-fixed {
    font-size: 1.2rem;
  }
}

/* Tablets (600px - 1023px) */
@media (max-width: 1023px) and (min-width: 600px) {
  .tarjeta-onPromo1 {
    min-height: 480px;
    padding-bottom: 60px;
    max-width: 80%;
    margin: 0 auto;
  }
  
  .titulo-tarjeta {
    font-size: 1.3rem;
  }
  
  .texto-tarjeta {
    font-size: 1.2rem;
  }
  
  .btn-tarjeta-fixed {
    font-size: 1.1rem;
  }
}

/* Móviles (max-width: 599px) */
@media (max-width: 599px) {
  .tarjeta-onPromo1 {
    min-height: 400px;
    margin-bottom: 1rem;
    padding-bottom: 30px;
    max-width: 95%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    padding-left: 0.5%;
  padding-right: 0.5%;
  }
  
  .titulo-tarjeta {
    font-size: 1.3rem;
  }
  
  .texto-tarjeta {
    font-size: 1rem;
  }
  
  .btn-tarjeta-fixed {
    bottom: 12px;
    width: calc(70% - 24px);
    font-size: 0.9rem;
   
  }
  
  .tarjeta-onPromo1 .q-card-actions {
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
}
</style>