<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar class="">
        <q-space></q-space>
        <q-btn to="/AreaPersonal" v-if="user" flat dense class="text-white underline-btn q-mx-md"
          >Area Personal
        </q-btn>

        <q-btn to="/Acceder" v-if="!user" flat dense class="text-white underline-btn q-mx-md"
          >Acceder
        </q-btn>
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
          src="/src/assets/Spanish Nook LOGO.png"
          alt="Logo Spanish nook"
          style="height: 50px; margin-right: 12px"
        />
        <q-toolbar-title> Spanish nook </q-toolbar-title>
        <q-tabs class="justify-center q-m-lg" v-model="tab" shrink stretch v-if="$q.screen.gt.sm">
          <q-route-tab to="/IndexPage" name="tab1" label="Home" class="q-mx-md" />
          <q-route-tab to="/sobreSpanish" name="tab5" label="Sobre Spanish Nook" class="q-mx-md" />
          <q-btn-dropdown auto-close stretch flat label="Servicios">
            <q-list>
              <q-item clickable @click="$router.push('/ClasesGrupales')">
                <q-item-section>Clases grupales</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/ClasesIndividuales')">
                <q-item-section>Clases individuales</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/EjerciciosEspañol')">
                <q-item-section>Ejercicios de español</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-route-tab to="/TestNivel" name="tab3" label="Test de nivel" class="q-mx-md" />
          <q-route-tab to="/Contacto" name="tab4" label="Contacto" class="q-mx-md" />
        </q-tabs>
        <q-space v-if="$q.screen.gt.sm" />
        <q-btn
          icon="smart_display"
          size="lg"
          flat
          class="text-white underline-btn q-sm-ml-md"
          href="@paulafromthenook"
        />
        <q-btn
          icon="smart_display"
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
    <q-footer class="bg-grey-2 text-grey-8">
      <div class="row flex q-pa-xl">
        <div class="col-12 col-sm-4 flex column items-start q-pl-xl q-ml-xl">
          <h5 class="text-bold q-pa-none q-ma-none items-start">Spanish nook</h5>
          <p class="q-pr-md q-mr-md">
            Spanish nook es un lugar donde puedes aprender español de manera divertida y efectiva.
            Ofrecemos clases grupales e individuales, ejercicios interactivos y recursos para
            mejorar tu nivel de español.
          </p>
        </div>
        <!-- Columna Mapa del sitio -->
        <div class="col-12 col-sm-4 flex column items-start">
          <div class="text-bold q-mx-xs">
            <h5 class="text-bold q-pa-none q-ma-none items-start">Mapa del sitio</h5>
          </div>
          <router-link to="/IndexPage" class="footer-link q-mb-xs">Inicio</router-link>
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
        <div class="col-12 col-sm-3 flex column">
          <div class="text-bold q-mb-xs">
            <h5 class="text-bold q-pa-none q-ma-none items-start">Enlaces de interes</h5>
          </div>
          <a href="https://www.cervantes.es/" target="_blank" rel="noopener" class="q-mb-xs"
            >Instituto Cervantes</a
          >
          <a href="https://www.rae.es/" target="_blank" rel="noopener" class="q-mb-xs">RAE</a>
          <a href="https://www.dele.org/" target="_blank" rel="noopener">DELE</a>
        </div>
      </div>

      <q-bar class="footer-bar">
        <div class="row flex items-center full-width no-wrap">
          <div class="q-mr-lg">© 2025 Spanishnook · Todos los derechos reservados</div>
          <router-link to="/Aviso" class="q-px-xl q-mx-xl">Aviso Legal</router-link>
          <router-link to="/Privacidad" class="q-px-xl q-mx-xl">Política de Privacidad</router-link>
          <router-link to="/Cookies" class="q-px-xl q-mx-xl">Política de Cookies</router-link>
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
const tab = ref('');
</script>

<style lang="scss">
.underline-btn {
  text-decoration: underline;
}
</style>

<style>
.footer-link {
  color: #310ff3e7 !important;
  font-weight: bold;
  text-decoration: none !important;
  display: inline-block;
}
.footer-link:hover {
  color: #483c24 !important;
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
</style>
