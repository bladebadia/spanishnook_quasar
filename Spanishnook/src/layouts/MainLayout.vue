<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated>
      <q-bar class="">
        <q-space></q-space>
        <q-btn to="/AreaPersonal" v-if="user" flat dense class="text-white underline-btn q-mx-md"
          >Area Personal
        </q-btn>
        <q-btn to="/HorarioReserva" v-if="user" flat dense class="text-white underline-btn q-mx-md"
          >Reserva
        </q-btn>
        <q-btn to="/Acceder" v-if="!user" flat dense class="text-white underline-btn q-mx-md"
          >Acceder
        </q-btn>
        <q-separator size="180px" color="white" />
        <div class="row items-center q-gutter-sm" style="width: 100%; max-width: 250px">
          <span class="text-body1" style="white-space: nowrap">Idioma:</span>
          <q-select
            v-model="locale"
            :options="langOptions"
            emit-value
            map-options
            dense
            outlined
            color="primary"
            bg-color="white"
            style="flex: 1; max-width: 130px"
            @update:model-value="changeLang"
          />
        </div>
      </q-bar>

      <q-toolbar>
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <img
          src="/img/logoiso_320.png"
          alt="Logo Spanish nook"
          style="
            height: 50px;
            width: auto;
            min-width: 0;
            margin: 0;
            padding: 0;
            display: inline-block;
          "
          fit="contain"
          class="q-mr-md"
        />
        <q-toolbar-title> Spanish nook </q-toolbar-title>
        <q-tabs class="justify-center q-m-lg" shrink stretch v-if="$q.screen.gt.sm">
          <q-route-tab to="/IndexPage" name="tab1" Class="q-tab">Inicio</q-route-tab>
          <q-route-tab to="/sobreSpanish" name="tab5" Class="q-tab">Sobre Spanish Nook</q-route-tab>
          <q-btn-dropdown auto-close stretch flat class="q-tab q-pb-sm" label="Clases">
            <q-list>
              <q-item clickable @click="$router.push('/ClasesGrupales')">
                <q-item-section class="q-tab">Clases grupales</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/ClasesIndividuales')">
                <q-item-section class="q-tab">Clases individuales</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/EjerciciosEspañol')">
                <q-item-section class="q-tab">Ejercicios de español</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-route-tab to="/TestNivel" name="tab3" class="q-mx-md q-tab">Test de nivel</q-route-tab>
          <q-route-tab to="/Contacto" name="tab4" class="q-mx-md q-tab">Contacto</q-route-tab>
        </q-tabs>
        <q-space v-if="$q.screen.gt.sm" />
        <q-btn
          icon="mdi-facebook"
          size="lg"
          flat
          class="text-white underline-btn q-sm-ml-md"
          href="@paulafromthenook"
        />
        <q-btn
          icon="mdi-instagram"
          size="lg"
          flat
          class="text-white underline-btn q-sm-mr-lg q-pr-lg"
          href="@paulaspanishnook"
        />
        <q-btn
          icon="mdi-whatsapp"
          size="lg"
          flat
          class="text-white underline-btn q-sm-mr-lg q-pr-lg"
          href="@paulaspanishnook"
        />
        <q-btn
          icon="mdi-youtube"
          size="lg"
          flat
          class="text-white underline-btn q-sm-mr-lg q-pr-lg"
          href="@paulaspanishnook"
        />
        <q-btn
          icon="mdi-mail"
          size="lg"
          flat
          class="text-white underline-btn q-sm-mr-lg q-pr-lg"
          href="@paulaspanishnook"
        />
      </q-toolbar>
    </q-header>
    <!-- El sticky debe ir fuera de <q-page-container> y antes del footer -->

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-sticky position="bottom-right" :offset="[10, 10]">
      <q-btn
        class="whatsapp-sticky-btn enlarged-touch"
        round
        color="green-6"
        icon="mdi-whatsapp"
        size="xl"
        href="https://wa.me/34600000000"
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
      />
    </q-page-sticky>
    <q-footer class="bg-black text-white">
      <div class="row flex q-pa-md">
        <div class="col-12 col-md-3 flex column items-center">
          <q-img src="/src/assets/SpanishNookLogo.png" class="img-responsiva" />
        </div>
        <div class="col-12 col-md-3 flex column items-center q-pa-none q-ma-none">
          <h5 class="text-bold items-center q-pa-none q-ma-none">Spanish nook</h5>
          <p class="q-ma-md text-subtitle1">
            Spanish nook es un lugar donde puedes aprender español de manera divertida y efectiva.
            Ofrecemos clases grupales e individuales, ejercicios interactivos y recursos para
            mejorar tu nivel de español.
          </p>
        </div>
        <!-- Columna Mapa del sitio -->
        <div class="col-12 col-md-3 flex column items-center">
          <div class="text-bold q-mx-xs">
            <h5 class="text-bold q-pa-none q-ma-none items-center">Mapa del sitio</h5>
          </div>

          <router-link to="/IndexPage" class="footer-link q-mb-xs q-mt-md">Inicio</router-link>
          <router-link to="/sobreSpanish" class="footer-link q-mb-xs"
            >Sobre Spanish Nook</router-link
          >
          <router-link to="/ClasesGrupales" class="footer-link q-mb-xs"
            >Clases grupales</router-link
          >
          <router-link to="/ClasesIndividuales" class="footer-link q-mb-xs"
            >Clases individuales</router-link
          >
          <router-link to="/EjerciciosEspañol" class="footer-link q-mb-xs"
            >Ejercicios de español</router-link
          >
          <router-link to="/TestNivel" class="footer-link q-mb-xs">Test de nivel</router-link>
          <router-link to="/Contacto" class="footer-link">Contacto</router-link>
        </div>
        <!-- Columna Enlaces de interés -->
        <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 flex column">
          <div class="text-bold">
            <h5 class="text-bold items-center q-ma-none">Enlaces de interes</h5>
          </div>
          <a
            href="https://www.cervantes.es/"
            target="_blank"
            rel="noopener"
            class="footer-link q-mt-md"
            >Instituto Cervantes</a
          >
          <a href="https://www.rae.es/" target="_blank" rel="noopener" class="footer-link">RAE</a>
          <a href="https://www.dele.org/" target="_blank" rel="noopener" class="footer-link"
            >DELE</a
          >
        </div>
      </div>

      <q-bar class="footer-bar">
        <div class="row flex items-center full-width">
          <div class="q-mr-lg">© 2025 Spanishnook · Todos los derechos reservados</div>
          <router-link to="/Aviso" class="q-px-md q-mx-md">Aviso Legal</router-link>
          <router-link to="/Privacidad" class="q-px-md q-mx-md">Política de Privacidad</router-link>
          <router-link to="/Cookies" class="q-px-md q-mx-md">Política de Cookies</router-link>
        </div>
      </q-bar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/stores/auth';

const { user } = useAuth();
const { locale } = useI18n();
//import router from 'src/router';

const langOptions = [
  { label: 'Español', value: 'es' },
  { label: 'English', value: 'en' },
];

function changeLang(val: string) {
  locale.value = val;
}

const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    icon: 'school',
    link: '/IndexPage',
  },
  {
    title: 'Test de nivel',
    icon: 'code',
    link: '/TestNivel',
  },
  {
    title: 'Clases grupales',
    icon: 'chat',
    link: '/ClasesGrupales',
  },
  {
    title: 'Clases individuales',
    icon: 'record_voice_over',
    link: '/ClasesIndividuales',
  },
  {
    title: 'Ejercicios de español',
    icon: 'chat',
    link: '/EjerciciosEspañol',
  },
  {
    title: 'Sobre Spanish Nook',
    icon: 'rss_feed',
    link: '/SobreSpanish',
  },
  {
    title: 'Contacto',
    icon: 'rss_feed',
    link: '/Contacto',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss">
.underline-btn {
  text-decoration: underline;
}

.img-responsiva {
  width: 100%;
  height: auto;
  max-width: 200px;
  max-height: 200px;
}
.footer-link {
  color: white !important;
  font-weight: bold;
  text-decoration: none !important;
  display: inline-block;
}
.footer-link:hover {
  color: #de1212 !important;
  transform: translateX(8px);
}

.footer-bar {
  min-height: 48px;
  font-size: 1.1rem;
}

.whatsapp-sticky-btn {
  .enlarged-touch {
    min-width: 72px;
    min-height: 72px;
    padding: 12px !important;
    box-sizing: content-box;
  }
}

.q-tab {
  font-size: 1.3rem !important;
  font-weight: medium !important;
  transition: font-size 0.4s;
  margin-left: 15px;
  margin-right: 15px;
}
.q-tab:hover {
  font-size: 1.6rem !important;
}
</style>
