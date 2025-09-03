<template>
  <q-layout view="lHh Lpr lFf">
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

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- ❌ NO incluir el footer aquí -->
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/stores/auth';

const { user } = useAuth();
const { locale } = useI18n();

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
