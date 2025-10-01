<template>
  <q-page>
    <div>
      <q-img style="width: 100%; max-height: 600px;" 
        fit="cover" position="center" src="/img/banner_1920.jpg"
         >
        
      </q-img>
    </div>

    <div class="column items-center text-justify q-mt-xl">
      <p class=" titulo-responsivo" style="color: #851319">
       {{ t('indexeUnLugarDonde') }}
      </p>

      <p class="q-mt-md texto-responsivo" >
        {{ t('indexAprenderEspañolPuede') }}
      </p>
      <q-btn
        class="oval-btn"
        items-center
        color="primary"
        unelevated
        to="/ClasesIndividuales"
      >
        {{ t('indexCreaTuEspacio') }}
      </q-btn>
    </div>

    <div v-intersect="onImgIntersect" style="width: 100%" class="row justify-center q-my-xl">
      <transition name="slide-fade-left">
        <div
          v-if="showAnimatedImg"
          class="row justify-center items-center"
          style="width: 100%;  position: relative;"
        >
          <!-- Tarjeta con texto a la izquierda -->
          <div   class="col-12 col-md-6 flex justify-end items-center " >
            <q-card flat  style=" width: 100%;">
              <q-card-section>                
                <p class="texto-responsivo q-pa-none q-ma-none ">
                  Tu profesora de español en SpanishNook. Estoy aquí para acompañarte en tu viaje 
                  de aprendizaje, adaptándome a tu ritmo y necesidades.
                </p>
                <p class="texto-responsivo ">
                  ¿Preparad@ para descubrir una nueva forma de aprender español?
                </p>
              </q-card-section>
              <q-card-actions class="justify-center">
                <q-btn 
                  color="primary" 
                  to="/sobreSpanish" 
                  unelevated
                  class="oval-btn"
                  style="font-size: 1.1rem;"
                >
                  Conoce más sobre mí
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
          
          <!-- Imagen centrada a la derecha -->
          <div flat class="col-12 col-md-6 flex justify-center items-center q-pa-md">
            <div flat class="image-container-centered" :class="{ 'image-appear': showAnimatedImg }">
              <img
                src="/img/41_frida.png"
                alt="Paula - Profesora de SpanishNook"
                class="frida-image"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>


    <!-- Card promocional que aparece al hacer scroll -->
    <div
      v-intersect="onPromoIntersect"
      class="q-mt-xl q-mb-xl row justify-center"
      
    >
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div v-if="showPromoCard" class="row align-center" >
          <div class="col-12 col-md-6 items-center flex flex-center column q-pa-xs-none q-pa-lg ">
            <q-card class="q-pa-lg tarjeta"  >
              <img src="img/Home/tarjeta1_descubre_nuestras_clases.png"
                fit="cover"
                style="width: 80%; height: auto; display: block; margin: 0 auto;"/>
              <q-card-section class="titulo-tarjeta text-center"
                >{{ t('indexDescubreNuestrasClases') }}</q-card-section
              >
              <q-card-section class="texto-tarjeta text-justify">
                {{t('indexDescubreNuestrasClasesTexto')}}
              </q-card-section>
              <q-card-actions>
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  unelevated
                  class="cuadrado-btn"
                >
                  {{ t('indexEncuentraTusClases') }}
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12 col-md-6 text-center q-pa-md">
            <p class="subtitulo-responsivo q-mb-md">{{t('indexQueEncontraras')}}</p>
            <ul class=" lista-check">
              <li class="q-py-sm">{{t('indexclasesEnVivo')}}</li>
              <li class="q-py-sm">{{t('indexdiferentesModalidades')}}</li>
              <li class="q-py-sm">{{t('indexseguimientoContinuo')}}</li>
              <li class="q-py-sm">{{t('indexClasesAdaptadas')}}</li>
              <li class="q-py-sm">{{t('indexMaterialesExclusivos')}}</li>
              <li class="q-py-sm">{{t('indexAmbienteRelajado')}}</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <div
      v-intersect="onPromoIntersect1"
      class="q-mt-xl q-mb-xl row justify-center bg-grey-2"      
    >
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div
          v-if="showPromoCard1"
          class="row"
          enter-active-class="animated fadeInUpBig slower "
        >
          <div class="col-12 items-center flex flex-center column q-pa-lg q-mb-md q-mb-md-xl">
            <p
              class="titulo-responsivo text-center q-mb-md"
              text-color="#851319"
            >
              {{t('indexDiferentesCaminos')}}
            </p>

            <p class="texto-responsivo text-center">
              {{t('indexAprendeEnDirecto')}}
            </p>
          </div>
          <q-separator class="q-my-xl" />

          <div class="col-12 row  justify-center ">
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="tarjeta-onPromo1" >
              <q-img
                src="img/Home/tarjeta2_clases_privadas.svg"
                fit="contain"
                style="max-height: 350px; width: 100%; margin: 0 auto; display: block"
                class="card-img-animada q-ma-md"
                ratio="1"
              />
              <q-card-section class="text-center titulo-tarjeta">{{t('indexClasesPrivadas')}}</q-card-section>
              <q-card-section class="texto-tarjeta text-justify q-mx-xl q-mx-md-lg" >
                {{t('indexAvanzaEnTu')}}
              </q-card-section>
              <q-card-actions class="flex flex-center">
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  class="btn-tarjeta-fixed"
                  unelevated
                  >{{t('indexQuieroMiClase')}}</q-btn
                >
              </q-card-actions>
              </q-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="tarjeta-onPromo1" >
              <q-img
                src="img/Home/tarjeta3_clases_grupales.svg"
                fit="contain"
                style="max-height: 350px; width: 100%; margin: 0 auto; display: block; transform: rotate(90deg);"
                class="card-img-animada q-ma-md"
                ratio="1"
              />
              <q-card-section class="titulo-tarjeta text-center">{{t('indexClasesGrupales')}}</q-card-section>
              <q-card-section class="texto-tarjeta text-justify q-mx-xl q-mx-md-lg" 
                              >{{t('indexAprendeEspañol')}}</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  class="btn-tarjeta-fixed"
                  unelevated
                  >{{t('indexAprenderEnGrupo')}}</q-btn
                >
              </q-card-actions>
              </q-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
            <q-card class="tarjeta-onPromo1"  >
              <q-img
                src="img/Home/tarjeta4_conversacion.svg"
                fit="contain"
                sstyle="max-height: 350px; width: 100%; margin: 0 auto; display: block; transform: rotate(90deg);"
                class="card-img-animada q-ma-md"
                ratio="1"
              />
              <q-card-section class="titulo-tarjeta text-center"
                >{{t('indexClasesDeConversacion')}}</q-card-section
              >
              <q-card-section class="texto-tarjeta text-justify"
                >{{t('indexMejoraTuConfianza')}}</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn
                  color="primary"
                  to="/ClasesIndividuales"
                  class="btn-tarjeta-fixed"
                  unelevated
                  >{{t('indexUneteALaLista')}}</q-btn
                >
              </q-card-actions>
            </q-card>
            </div>
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
  import { useI18n } from 'vue-i18n';
  // Importar los estilos CSS
  import '../css/pages/IndexPage.css';

  const showPromoCard = ref(false);
  const showPromoCard1 = ref(false);
  const showPromoCard2 = ref(false);

  const showPromoCard4 = ref(false);
  const showAnimatedImg = ref(false);
  const {  t } = useI18n();

// Solo mostrar la animación una vez por sesión

  let animacionMostrada = false;

function onImgIntersect(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting && !animacionMostrada) {
    showAnimatedImg.value = true;
    animacionMostrada = true;
  }
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

</style>
