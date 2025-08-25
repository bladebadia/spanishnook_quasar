<template>
  <q-page clas="q-pa-none" style="padding-bottom: 0px;">
    
    <div >
      <q-img
        src="/img/estudiante_1024.jpg"       
        alt="Imagen estudiante"
        >
        <div
          class="text-weight-bolder titulo-responsivo"
          style="          
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-shadow: 0 2px 8px #000;
          text-align: center;
          width: 90%;
          z-index: 2;
          background-color:rgba(0, 0, 0, 0.0)
          "
          >
            APRENDE ESPAÑOL
        </div>
        <div
          style="
          position: absolute;
          top: 75%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
           background-color:rgba(0, 0, 0, 0.0)
          "
          >
          <q-btn class="oval-btn" color="primary" unelevated to="/ClasesIndividuales">
            Empieza ahora
          </q-btn>
        </div>
      </q-img>
    </div>

    
    <div class="column items-center text-center q-mt-xl">
      <h1 class="text-h2 titulo-responsivo">Español a tu ritmo y desde cualquier lugar</h1>
      <p class="q-mt-md texto-responsivo" style="max-width: 1000px;">
        Aprender español puede ser algo cómodo, cercano y hecho para ti. En Spanish Nook encontrarás
        tu lugar: un espacio online donde aprender a tu ritmo con clases dinámicas, materiales
        adaptados a ti y un ambiente relajado para que hablar español se sienta como estar en casa.
      </p>
    </div>
 
  <!-- Card promocional que aparece al hacer scroll -->
    <div
      v-intersect="onPromoIntersect"
      class="q-mt-xl q-mb-xl row flex "
      style="min-height: 40px; width: 100%; display: flex; justify-content: center;"
    >
      <transition name="fade-scale">
        <div v-if="showPromoCard" class="row   " style="width: 100%; ">
          <div class="col-12 col-md-6 items-center flex flex-center">
            <q-card class="q-pa-lg" style="max-width: 500px; width: 100%;">
              <img src="https://cdn.quasar.dev/img/mountains.jpg">
              <q-card-section class="text-h6 text-center">¡Descubre nuestras clases personalizadas!</q-card-section>
              <q-card-section class="text-subtitle2 text-center">
                Reserva una clase de prueba y vive la experiencia Spanish Nook.
              </q-card-section>
              <q-card-actions >
                <q-btn color="primary" to="/ClasesIndividuales" unelevated>Reserva tu clase</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12 col-md-6 text-left ">
            <h2 class="text-h5 q-mb-md">Clases personalizadas</h2>
            <ul class="q-pl-md">
              <li>Clases adaptadas a tu nivel y objetivos</li>
              <li>Ambiente relajado y motivador</li>
              <li>Materiales exclusivos y dinámicos</li>
              <li>Atención personalizada</li>
              <li>Clases adaptadas a tu nivel y objetivos</li>
              <li>Ambiente relajado y motivador</li>
              <li>Materiales exclusivos y dinámicos</li>
              <li>Atención personalizada</li>
            </ul>
            <p class="q-mt-md">¡Aprende español de verdad, a tu ritmo y con resultados!</p>
          </div>
        </div>
      </transition>
    </div>
    <div></div>
    <div
      v-intersect="onPromoIntersect1"
      class="q-mt-xl q-mb-xl row flex "
      style="min-height: 40px; width: 100%; display: flex; justify-content: center;"
    >
      <transition name="fade-scale">
        <div v-if="showPromoCard1" class="row   " style="width: 100%; ">
          <div class="col-12 col-md-6 text-right ">
            <h2 class="text-h5 q-mb-md">Clases grupales</h2>
            <ul class="q-pl-md">
              <li>Clases adaptadas a tu nivel y objetivos</li>
              <li>Ambiente relajado y motivador</li>
              <li>Materiales exclusivos y dinámicos</li>
              <li>Atención personalizada</li>
              <li>Clases adaptadas a tu nivel y objetivos</li>
              <li>Ambiente relajado y motivador</li>
              <li>Materiales exclusivos y dinámicos</li>
              <li>Atención personalizada</li>
            </ul>
            <p class="q-mt-md">¡Aprende español de verdad, a tu ritmo y con resultados!</p>
          </div>
          <div class="col-12 col-md-6 items-center flex flex-center">
            <q-card class="q-pa-lg" style="max-width: 500px; width: 100%;">
              <img src="https://cdn.quasar.dev/img/mountains.jpg">
              <q-card-section class="text-h6 text-center">¡Descubre nuestras clases grupales!</q-card-section>
              <q-card-section class="text-subtitle2 text-center">
                Reserva una clase de prueba y vive la experiencia Spanish Nook.
              </q-card-section>
              <q-card-actions >
                <q-btn color="primary" to="/ClasesIndividuales" unelevated>Reserva tu clase</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          
        </div>
      </transition>
    </div>
    <div class="q-my-xl"></div>
      
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showPromoCard = ref(false);
const showPromoCard1 = ref(false);

function onPromoIntersect(entry: IntersectionObserverEntry): boolean {
  showPromoCard.value = entry.isIntersecting;
  return true; // Sigue observando siempre
}
function onPromoIntersect1(entry: IntersectionObserverEntry): boolean {
  showPromoCard1.value = entry.isIntersecting;
  return true; // Sigue observando siempre
}
</script>
<style>

.oval-btn {
  border-radius: 64px !important;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: bold;
  font-size: 1.6rem;
  margin-top: 30px;
}
@media (max-width: 900px) {
.oval-btn {
  border-radius: 64px !important;
  padding-left: 25px;
  padding-right: 25px;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 30px;
}
}

@media (max-width: 600px) {
.oval-btn {
  border-radius: 64px !important;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  font-size: 0.8rem;
  margin-top: 30px;
}
}
.img-responsiva {
  width: 100%;
  height: auto;
}
/* Texto "APRENDE ESPAÑOL" responsivo */
.titulo-responsivo {
  font-size: 3.2rem;
}

@media (max-width: 900px) {
  .titulo-responsivo {
    font-size: 2.3rem;
  }
}

@media (max-width: 600px) {
  .titulo-responsivo {
    font-size: 1.8rem;
    font-weight: bold;
  }
}
.texto-responsivo {
  font-size: 1.8rem;
}

@media (max-width: 900px) {
  .texto-responsivo {
    font-size: 1.4rem;
  }
}

@media (max-width: 600px) {
  .texto-responsivo {
    font-size: 1.1rem;
  }
}

/* Animación personalizada fade-scale */
.fade-scale-enter-active {
  transition: opacity 2s, transform 2s;
}
.fade-scale-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.promo-row {
  flex-wrap: wrap;
}
.promo-texto-explicativo {
  padding-left: 24px;
  padding-right: 24px;
}
@media (max-width: 900px) {
  .promo-texto-explicativo {
    padding-left: 0;
    padding-right: 0;
    margin-top: 24px;
    text-align: center;
  }
}
</style>
