<template>
  <q-page>
    <div>
      <q-img style="width: 100%; max-height: 660px" src="/img/banner.jpg" fit="cover">
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
            background-color: rgba(0, 0, 0, 0);
          "
        ></div>
      </q-img>
    </div>

    <div class="column items-center text-justify q-mt-xl">
      <h1 class="text-h1 titulo-responsivo" style="color: #851319">
        Un lugar donde aprender español se siente como en casa
      </h1>

      <p class="q-mt-md texto-responsivo" style="max-width: 1250px; font-size: 1.6rem">
        Aprender español puede ser algo cómodo, cercano y hecho para ti. En SpanishNook encontrarás
        tu lugar: un espacio online con sesiones en vivo donde aprender a tu ritmo con clases
        dinámicas, seguimiento personal y materiales pensados para ti. Aprende español con
        confianza, en un entorno donde sentirse a gusto es tan importante como progresar.
      </p>
      <q-btn
        class="oval-btn"
        items-center
        color="primary"
        unelevated
        to="/ClasesIndividuales"
        style="font-size: 1.8rem"
      >
        crea tu espacio
      </q-btn>
    </div>

    <div v-intersect="onImgIntersect" style="width: 100%" class="row q-mb-xl full-width">
      <transition name="slide-fade-left">
        <div
          v-if="showAnimatedImg"
          class="row q-my-xl q-py-xl"
          style="width: 100%; position: relative; min-height: 300px"
        >
          <img
            src="/img/animacion1.png"
            alt="Estudiantes"
            class="img-animada move-lr"
            style="
              max-width: 300px;
              width: 100%;
              position: absolute;
              left: 0;
              top: 0;
              margin: 0;
              padding: 0;
            "
            @animationend="mostrarBocadillo = true"
          />
          <transition name="fade">
            <div v-if="mostrarBocadillo" class="bocadillo-texto">
              ¡Bienvenid@ a
              <br />Spanish Nook!
            </div>
          </transition>
        </div>
      </transition>
    </div>

    <!-- Card promocional que aparece al hacer scroll -->
    <div
      v-intersect="onPromoIntersect"
      class="q-mt-xl q-mb-xl row justify-center"
      style="min-height: 40px; width: 100%"
    >
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div v-if="showPromoCard" class="row" style="width: 100%">
          <div class="col-12 col-md-6 items-center flex flex-center">
            <q-card class="q-pa-lg" style="max-width: 600px; width: 100%">
              <img src="img/estudiante_1024.jpg" />
              <q-card-section class="text-h4 text-center"
                >¡Descubre nuestras clases!</q-card-section
              >
              <q-card-section class="text-body text-justify" style="font-size: 1.3rem">
                Explora la forma de aprender que mejor se adapta a ti. Reserva tu primera clase y
                vive la experiencia SpanishNook.
              </q-card-section>
              <q-card-actions>
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  unelevated
                  style="font-size: 1.2rem"
                >
                  Encuentra tus clases
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12 col-md-6 text-left">
            <h2 class="text-h3 q-mb-md">¿Qué encontrarás en nuestras clases?</h2>
            <ul class="text-h5 lista-check">
              <li class="q-py-sm">Clases en vivo: aprende, conversa y pregunta en tiempo real</li>
              <li class="q-py-sm">Diferentes modalidades: privadas, grupales y de conversación</li>
              <li class="q-py-sm">Seguimiento contínuo de tu progreso y feedback personalizado</li>
              <li class="q-py-sm">Clases adaptadas a tu nivel y objetivos</li>
              <li class="q-py-sm">Materiales exclusivos y dinámicos</li>
              <li class="q-py-sm">Ambiente relajado y motivador</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <div
      v-intersect="onPromoIntersect1"
      class="q-mt-xl q-mb-xl row justify-center bg-grey-2"
      style="min-height: 40px; width: 100%"
    >
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div
          v-if="showPromoCard1"
          class="row"
          style="width: 100%"
          enter-active-class="animated fadeInUpBig slower "
        >
          <div class="col-12 items-center flex flex-center column q-pa-lg">
            <p
              class="texto-responsivo text-h3 text-center text-bold q-mb-md"
              style="font-size: 2rem !important"
              text-color="#851319"
            >
              Diferentes caminos, un mismo objetivo: hablar español
            </p>

            <p class="texto-responsivo text-h8 text-center" style="font-size: 1.2rem">
              Aprende en directo, con tu profesor y compañeros al otro lado de la pantalla.
            </p>
          </div>
          <div class="col-12 items-justify flex flex-center q-pa-none"></div>
          <div class="col-12 items-start flex q-pa-md">
            <q-card class="q-pa-md" style="width: 30%">
              <q-img
                src="img/estudiante_1024.jpg"
                fit="contain"
                style="max-height: 250px; margin: 0 auto; display: block"
                class="card-img-animada q-ma-md"
              />
              <q-card-section class="text-h4 text-center text-bold">Clases privadas</q-card-section>
              <q-card-section class="text-body text-justify" style="font-size: 1.3rem"
                >Avanza en tu español con un profesor dedicado solo a ti. Tú decides el ritmo, los
                temas y tus metas.</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  class="text-h5"
                  unelevated
                  style="font-size: 1.4rem"
                  >Quiero mi clase 1:1</q-btn
                >
              </q-card-actions>
            </q-card>
            <q-card class="q-pa-md q-ml-xl" style="width: 30%">
              <q-img
                src="img/estudiante_1024.jpg"
                fit="contain"
                style="max-height: 250px; margin: 0 auto; display: block"
                class="card-img-animada q-ma-md"
              />
              <q-card-section class="text-h4 text-center text-bold">Clases grupales</q-card-section>
              <q-card-section class="text-body text-justify" style="font-size: 1.3rem"
                >Aprende español paso a paso junto a compañeros de tu mismo nivel. Grupos reducidos
                y dinámicos para avanzar en compañía.</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  class="text-h5"
                  unelevated
                  style="font-size: 1.4rem"
                  >Aprender en grupo</q-btn
                >
              </q-card-actions>
            </q-card>
            <q-card class="q-pa-md q-ml-xl" style="width: 30%">
              <q-img
                src="img/estudiante_1024.jpg"
                fit="contain"
                style="max-height: 250px; margin: 0 auto; display: block"
                class="card-img-animada q-ma-md"
              />
              <q-card-section class="text-h4 text-center text-bold"
                >Clases de conversación (B1+)</q-card-section
              >
              <q-card-section class="text-body text-justify" style="font-size: 1.3rem"
                >Mejora tu confianza y fluidez conversando en español en grupos pequeños, relajados
                y divertidos. Muy pronto abriremos nuevas plazas.</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  class="text-h5"
                  unelevated
                  style="font-size: 1.4rem"
                  >Únete a la lista de espera</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </transition>
    </div>

    <div
      v-intersect="onPromoIntersect2"
      class="q-mt-xl q-mb-xl row degradado-fondo"
      style="min-height: 400px; width: 100%"
    >
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div
          v-if="showPromoCard2"
          class="row"
          style="width: 100%; position: relative"
          enter-active-class="animated fadeInUpBig slower "
        >
          <div class="col-12 q-pa-lg" style="position: absolute; top: 20%; left: 5%">
            <p class="text-h3 text-bold" style="color: #fffdf8">
              <strong>Descubre tu punto de partida: test de nivel gratuito</strong>
            </p>
            <p class="text-body text-bold" style="font-size: 1.5rem; color: #fffdf8">
              En solo 10 minutos sabrás cuál es tu nivel de español y qué opción es mejor para ti.
              El primer paso para aprender a tu ritmo.
            </p>
            <q-btn
              color="black"
              to="/ClasesIndividuales"
              class="oval-btn text-h4"
              unelevated
              style="font-size: 1.5rem"
              >Hacer el test</q-btn
            >
          </div>
        </div>
      </transition>
    </div>

    <div v-intersect="onPromoIntersect4" class="q-mt-xl q-mb-xl row flex flex-center">
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div
          v-if="showPromoCard4"
          class="row"
          style="width: 55%"
          enter-active-class="animated fadeInUpBig slower "
        >
          <q-card class="q-pa-lg items-center" style="width: 100%">
            <q-item>
              <q-item-section avatar>
                <q-avatar size="180px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </q-item-section>
              <q-item-label
                class="text-h2 text-align: right text-bold q-pt-xl q-pl-xl"
                style="font-size: 1.8rem"
              >
                Quién hay detrás de SpanishNook
              </q-item-label>
            </q-item>
            <q-separator />
            <q-item class="flex flex-justify q-pa-md">
              <q-item-label class="text-justify text-h5" style="width: 100%">
                Detrás de SpanishNook estoy yo, Paula, profesora de español desde hace más de 4
                años. Siempre he creído que para aprender un idioma hay que sentirse cómodo,
                motivado y acompañado. Por eso este rincón online existe: para que el aprendizaje
                sea personal, funcional, cercano y, sobre todo, una experiencia positiva.
              </q-item-label>
            </q-item>
            <q-card-actions class="flex flex-center">
              <q-btn
                color="primary"
                to="/ClasesIndividuales"
                size="lg"
                unelevated
                style="font-size: 1.4rem"
                >Más sobre SpanishNook</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </transition>
    </div>

    <!-- Sección de FAQs -->
    <div class="q-my-xl faqs-section">
      <h3 class="text-h3 text-bold text-center q-mb-lg">Preguntas frecuentes (FAQs)</h3>
      <q-expansion-item class="text-h5 q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5>¿Cómo funcionan las clases?</h5>
        </template>
        <div class="text-body text-justify q-px-xl q-mx-md" style="font-size: 1.2rem">
          Todas las clases son en vivo (NO grabadas). Nos conectamos online a través de videollamada
          y trabajamos con materiales dinámicos en aulas virtuales.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5 q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5>¿Qué necesito para empezar?</h5>
        </template>
        <div class="text-body text-justify q-px-xl q-mx-md" style="font-size: 1.2rem">
          Solo necesitas un ordenador o tablet, conexión a internet y ganas de aprender. El resto lo
          ponemos nosotros.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5 q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5>¿Puedo cambiar de modalidad si me equivoco?</h5>
        </template>
        <div class="text-body text-justify q-px-xl q-mx-md" style="font-size: 1.2rem">
          Claro. Queremos que estés cómod@: si una clase no es lo que necesitas, te ayudamos a
          encontrar la opción más adecuada.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5 q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5>¿Qué nivel de español necesito para apuntarme?</h5>
        </template>
        <div class="text-body text-justify q-px-xl q-mx-md" style="font-size: 1.2rem">
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado (A1-C1).
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5 q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5>¿Qué pasa si no puedo asistir a una clase?</h5>
        </template>
        <div class="text-body text-justify q-px-xl q-mx-md" style="font-size: 1.2rem">
          Dependerá de la modalidad de la clase que selecciones. Consulta las diferentes opciones de
          clases y sus condiciones.
        </div>
      </q-expansion-item>
    </div>

    <!-- Sección de Contacto -->
    <div class="q-my-xl contacto-section flex flex-center column items-center">
      <h2 class="text-h3 text-center q-mb-md" style="color: #851319">¿Aún tienes dudas?</h2>
      <p class="text-body text-center q-mb-lg" style="max-width: 1200px; font-size: 1.4rem">
        Estamos al otro lado: ponte en contacto con nosotros a través de alguno de nuestros canales
        disponibles y te responderemos lo antes posible.
      </p>
      <q-btn
        color="primary"
        size="lg"
        unelevated
        to="/Contacto"
        class="oval-btn q-mb-md"
        style="font-size: 1.4rem"
      >
        Contáctanos
      </q-btn>
    </div>
    <div class="q-my-xl"></div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showPromoCard = ref(false);
const showPromoCard1 = ref(false);
const showPromoCard2 = ref(false);

const showPromoCard4 = ref(false);
const mostrarBocadillo = ref(false);
const showAnimatedImg = ref(false);

// Solo mostrar la animación una vez por sesión

let animacionMostrada = false;
function onImgIntersect(entry: IntersectionObserverEntry) {
  if (entry.isIntersecting && !animacionMostrada) {
    showAnimatedImg.value = false;
    setTimeout(() => {
      showAnimatedImg.value = true;
      animacionMostrada = true;
    }, 10);
  }
  // No ocultar la animación ni el bocadillo al salir del viewport
  return true;
}

function onPromoIntersect(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting) {
    showPromoCard.value = true;
  }
  return true;
}

function onPromoIntersect1(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting) {
    showPromoCard1.value = true;
  }
  return true;
}

function onPromoIntersect2(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting) {
    showPromoCard2.value = true;
  }
  return true;
}

function onPromoIntersect4(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting) {
    showPromoCard4.value = true;
  }
  return true;
}
</script>

<style>
/* Estilos para los botones ovalados */
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

/* Imagen responsiva */
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
    font-size: 1.8rem;
  }
}

@media (max-width: 600px) {
  .titulo-responsivo {
    font-size: 1.8rem;
    font-weight: bold;
  }
}

/* Estilos para el texto "APRENDE ESPAÑOL" responsivo */
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

/*Estilos lista*/

.lista-check {
  list-style: none;
  padding-left: 0;
}
.lista-check > li::before {
  content: '\2713'; /* Unicode para ✓ */
  color: #2ecc40 !important;
  margin-right: 0.5em;
  font-size: 1.1em;
  font-family: inherit;
}

/* Animación personalizada fade-scale */
.card-img-animada {
  transition:
    transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.4s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.card-img-animada:hover {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 8px 32px rgba(44, 204, 64, 0.18);
  z-index: 2;
}

.degradado-fondo {
  background: #851319;
}

.faqs-section {
  border-radius: 18px;
  padding: 32px 0;
  max-width: 900px;
  margin: 0 auto;
}
.contacto-section {
  border-radius: 18px;
  padding: 32px 0 40px 0;
  max-width: 900px;
  margin: 0 auto;
}

/* Agrandar icono de q-expansion-item en FAQs */
.faqs-section .q-expansion-item__toggle-icon {
  font-size: 3.5rem !important;
}
/* Agrandar icono de q-expansion-item en FAQs usando ::v-deep para Quasar */
.faqs-section ::v-deep .q-expansion-item__toggle-icon {
  font-size: 2.5rem !important;
}

/* Animación de entrada izquierda a derecha */
.slide-fade-left-enter-active {
  /* No usar para la traslación, solo para fade si se desea */
}
.slide-fade-left-leave-active {
  display: none;
}
.move-lr {
  animation: moveLeftToRight 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes moveLeftToRight {
  0% {
    opacity: 0;
    left: 0;
    transform: translateX(0);
  }
  20% {
    opacity: 0;
    left: 0;
    transform: translateX(0);
  }
  100% {
    opacity: 1;
    left: 80%;
    transform: translateX(-100%);
  }
}

.bocadillo-texto {
  position: absolute;
  right: 600px;
  top: 40px;
  background: #f9f9f8;
  border-radius: 50% 50% 60% 60% / 60% 60% 50% 50%;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.07),
    0 0 0 8px #e0e7ff inset;
  padding: 28px 38px 24px 38px;
  font-size: 1.2rem;
  color: #333333;
  min-width: 180px;
  z-index: 10;
  border: 2px solid #2f06e4;
  transform: rotate(-30deg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-sizing: border-box;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}
.bocadillo-texto::after,
.bocadillo-texto::before {
  content: '';
  position: absolute;
  background: #f9f9f8;
  border: 2px solid #2f06e4;
  z-index: 9;
}
.bocadillo-texto::after {
  width: 38px;
  height: 38px;
  left: 80%;
  top: 80%;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}
.bocadillo-texto::before {
  width: 22px;
  height: 22px;
  left: 95%;
  top: 95%;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
