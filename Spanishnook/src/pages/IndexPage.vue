<template>
  <q-page>
    <div>
      <q-img style="width: 100%; max-height: 600px;" 
        fit="cover" position="center" src="/img/banner_1920.jpg"
         >
        
      </q-img>
    </div>

    <div class="column items-center text-justify q-my-lg q-ma-md-md">
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

    <!--Tarjeta descubre nuestras clases y lista  -->
    <div
      v-intersect="onPromoIntersect"
      class="row justify-center q-my-xl q-my-md-xl">
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div v-if="showPromoCard" class="row align-center" >
          <div class="col-12 col-md-6 items-center flex flex-center column q-pa-xs-none q-pa-lg ">           
            <q-card class="q-pa-lg " style="width: 80%;" >
              <img src="img/Home/tarjeta1_descubre_nuestras_clases.png"
                fit="cover"
                style="width: 80%; height: auto; display: block; margin: 0 auto;"/>
              <q-card-section class="subtitulo-responsivo text-center"
                >{{ t('indexDescubreNuestrasClases') }}</q-card-section
              >
              <q-card-section class="texto-responsivo text-justify">
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
    <!-- Tarjetas de promoción de clases -->
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
            <!-- Componente 1: Clases Privadas -->
            <PromoCard
              :image-src="'img/Home/tarjeta2_clases_privadas.svg'"
              :title="t('indexClasesPrivadas')"
              :description="t('indexAvanzaEnTu')"
              :button-text="t('indexQuieroMiClase')"
              button-link="/ClasesIndividuales"
            />
            <!-- Componente 2: Clases Grupales -->
            <PromoCard
              :image-src="'img/Home/tarjeta3_clases_grupales.svg'"
              :title="t('indexClasesGrupales')"
              :description="t('indexAprendeEspañol')"
              :button-text="t('indexAprenderEnGrupo')"
              button-link="/ClasesIndividuales"
            />
            <!-- Componente 3: Clases de Conversación -->
            <PromoCard
              :image-src="'img/Home/tarjeta4_conversacion.svg'"
              :title="t('indexClasesDeConversacion')"
              :description="t('indexMejoraTuConfianza')"
              :button-text="t('indexUneteALaLista')"
              button-link="/ClasesIndividuales"
            />            
          </div>
        </div>
      </transition>
    </div>
    <!-- Banner promocional test nivel que aparece al hacer scroll -->
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
          <div class="col-12 q-pa-none q-pa-md-lg" style="position: absolute; top: 20%; ">
            <p class="titulo-responsivo " style="color: #fffdf8">
              <strong>{{ t('indexDescubreTuPunto') }}</strong>
            </p>
            <p class="texto-responsivo" style=" color: #fffdf8">
              {{ t('indexEnSolo') }}
            </p>
            <q-btn
              color="black"
              to="/ClasesIndividuales"
              class="oval-btn q-mx-lg"
              unelevated
              >{{ t('indexHacerTest') }}</q-btn
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
                class="subtitulo-responsivo text-align: right text-bold q-pt-xl q-pl-xl"
              >
                {{t('indexQuienHayDetras')}}
              </q-item-label>
            </q-item>
            <q-separator />
            <q-item class="flex flex-justify q-pa-md">
              <q-item-label class="text-justify texto-responsivo" style="width: 100%">
                {{t('indexDetrasDeSpanishnook')}}
              </q-item-label>
            </q-item>
            <q-card-actions class="flex flex-center">
              <q-btn
                color="primary"
                to="/ClasesIndividuales"
                size="lg"
                unelevated
                class="cuadrado-btn"
                >{{t('indexMasSobreSpanishnook')}}</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </transition>
    </div>

    <!-- Sección de FAQs -->
    <div class="q-my-xl faqs-section">
      <p class="titulo-responsivo text-center q-mb-lg">{{t('indexPreguntasFrecuentes')}}</p>
      <q-expansion-item class=" q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="help" color="primary" text-color="white" class="faqs-icon" />
          </q-item-section>
          <p class="subtitulo-responsivo">{{t('indexComoFuncionanClases')}}</p>
        </template>
        <div class="texto-responsivo text-justify q-px-xl q-mx-md">
          {{t('indexTodasClasesEnVivo')}}
        </div>
      </q-expansion-item>

      <q-expansion-item class=" q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="help" color="primary" text-color="white" class="faqs-icon" />
          </q-item-section>
          <p class="subtitulo-responsivo">{{t('indexQueNecesitoParaEmpezar')}}</p>
        </template>
        <div class="texto-responsivo text-justify q-px-xl q-mx-md">
         {{t('indexSoloNecesito')}}
        </div>
      </q-expansion-item>

      <q-expansion-item class=" q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="help" color="primary" text-color="white" class="faqs-icon" />
          </q-item-section>
          <p class="subtitulo-responsivo">{{t('indexPuedoCambiarDeModalidad')}}</p>
        </template>
        <div class="texto-responsivo text-justify q-px-xl q-mx-md">
          {{t('indexClaroQueremos')}}
        </div>
      </q-expansion-item>

      <q-expansion-item class=" q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="help" color="primary" text-color="white" class="faqs-icon" />
          </q-item-section>
          <p class="subtitulo-responsivo">{{t('indexQueNivelDeEspañol')}}</p>
        </template>
        <div class="texto-responsivo text-justify q-px-xl q-mx-md" >
          {{t('indexNoNecesitoNingun')}}
        </div>
      </q-expansion-item>

      <q-expansion-item class=" q-mb-md" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="help" color="primary" text-color="white"  />
          </q-item-section>
          <p class="subtitulo-responsivo">{{t('indexQuePasaSiNoPuedoAsistir')}}</p>
        </template>
        <div class="texto-responsivo text-justify q-px-xl q-mx-md" style="font-size: 1.2rem">
          {{t('indexDependeraDeLaModalidad')}}
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
  import PromoCard from '../components/PromoCard.vue';

  const showPromoCard = ref(false);
  const showPromoCard1 = ref(false);
  const showPromoCard2 = ref(false);

  const showPromoCard4 = ref(false);
  const {  t } = useI18n();

  

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
