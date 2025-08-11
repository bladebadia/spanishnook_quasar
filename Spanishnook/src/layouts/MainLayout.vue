<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar>
        <q-space></q-space>

        <a href="tel:+34912345678" class="text-white q-mx-md">
          <q-btn flat dense class="text-white underline-btn q-mx-md">
            <q-icon name="phone" class="q-m-xs" />
            +34 912 345 678
          </q-btn>
        </a>

        <q-btn to="/AreaPersonal" flat dense class="text-white underline-btn q-mx-md"
          >Area Personal
        </q-btn>

        <q-btn to="/NuevoRegistro" flat dense class="text-white underline-btn q-mx-md"
          >Registro
        </q-btn>
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
        <q-toolbar-title> Spanish nook </q-toolbar-title>
        <q-tabs class="justify-center q-m-lg" 
          v-model="tab" shrink stretch
          v-if="$q.screen.gt.sm">
          <q-route-tab to="/IndexPage" name="tab1" label="Home" class="q-mx-md" />
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
        <q-space  v-if="$q.screen.gt.sm"/>
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

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
//import router from 'src/router';

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
