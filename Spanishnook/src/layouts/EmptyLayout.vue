<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated>
      <q-bar class="">
        <q-space></q-space>

        <q-btn to="/AreaPersonal" v-if="user" flat dense class="text-white underline-btn q-mx-md"
          >Area Personal
        </q-btn>
        <q-btn to="/Acceder" v-if="!user" flat dense class="text-white underline-btn q-mx-md"
          >Acceder
        </q-btn>
        <q-btn
          to="/CarritoCompra"
          v-if="user"
          flat
          dense
          class="text-white q-mx-md relative-position"
          icon="shopping_cart"
        >
          <q-badge v-if="carritoCount > 0" color="red" floating rounded class="badge-notification">
            {{ carritoCount }}
          </q-badge>
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
          round
          src="/img/Logotexto_500.png"
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
        <q-tabs
          class="flex flex-justify justify-center align-justify q-m-lg"
          shrink
          stretch
          v-if="$q.screen.gt.sm"
        >
          <q-route-tab to="/" name="tab1" Class="q-tab">Inicio</q-route-tab>
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
          <q-route-tab to="/TestNivel" name="tab2" class="q-tab">Test de nivel</q-route-tab>
          <q-route-tab to="/sobreSpanish" name="tab3" Class="q-tab">Sobre</q-route-tab>
          <q-route-tab to="/Contacto" name="tab4" class="q-tab">Contacto</q-route-tab>
        </q-tabs>
        <q-space v-if="$q.screen.gt.sm" />
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
      <q-banner
        v-if="showCookiesBanner"
        class="bg-primary text-white shadow-2 cookies-banner"
        style="
          position: fixed;
          left: 50%;
          bottom: 96px;
          transform: translateX(-50%);
          width: 70vw;
          max-width: 900px;
          z-index: 9999;
          font-size: 1.25rem;
          border-radius: 18px;
          padding: 24px 32px;
        "
        icon="cookie"
      >
        <div class="row items-center justify-between">
          <div style="line-height: 1.5">
            Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de
            usuario y analizar el tráfico. Si continúas navegando, consideramos que aceptas su uso.
            <q-btn
              flat
              dense
              color="white"
              label="Política de Cookies"
              to="/Cookies"
              class="q-ml-sm"
            />
          </div>
          <q-btn
            color="white"
            text-color="primary"
            label="Aceptar"
            @click="aceptarCookies"
            class="q-ml-md text-weight-bold"
            style="font-size: 1.1rem; padding: 8px 24px; border-radius: 8px"
          />
        </div>
      </q-banner>
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
      <q-bar class="footer-bar">
        <div class="row flex items-center full-width">
          <div class="q-mr-lg">© 2025 Spanishnook · Todos los derechos reservados</div>
          <router-link to="/Aviso" class="q-px-md q-mx-md text-white">Aviso Legal</router-link>
          <router-link to="/Privacidad" class="q-px-md q-mx-md text-white"
            >Política de Privacidad</router-link
          >
          <router-link to="/Cookies" class="q-px-md q-mx-md text-white"
            >Política de Cookies</router-link
          >
          <router-link to="/Condiciones" class="q-px-md q-mx-md text-white"
            >Condiciones de Venta</router-link
          >
        </div>
      </q-bar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/stores/auth';

const { user } = useAuth();
const { locale } = useI18n();

// Banner de cookies
const showCookiesBanner = ref(false);
function aceptarCookies() {
  localStorage.setItem('cookies_accepted', 'true');
  showCookiesBanner.value = false;
}

// Contador del carrito
const carritoCount = ref(0);

// Cargar carrito desde localStorage
const cargarCarrito = () => {
  const carritoGuardado = localStorage.getItem('carritoReservas');
  if (carritoGuardado) {
    const carrito = JSON.parse(carritoGuardado);
    carritoCount.value = carrito.length;
  } else {
    carritoCount.value = 0;
  }
};

// Escuchar cambios en el localStorage (para actualizar en tiempo real)
const setupCarritoListener = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === 'carritoReservas') {
      cargarCarrito();
    }
  });
};

// Temporizador para verificar cambios (por si las páginas están en la misma pestaña)
const temporizadorCarrito = ref<number | null>(null);

const iniciarTemporizadorCarrito = () => {
  temporizadorCarrito.value = window.setInterval(() => {
    cargarCarrito();
  }, 1000); // Verificar cada segundo
};

onMounted(() => {
  showCookiesBanner.value = localStorage.getItem('cookies_accepted') !== 'true';
  cargarCarrito();
  setupCarritoListener();
  iniciarTemporizadorCarrito();
});

onUnmounted(() => {
  if (temporizadorCarrito.value !== null) {
    clearInterval(temporizadorCarrito.value);
  }
});

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

/* Estilos para la notificación del carrito */
.badge-notification {
  font-size: 10px;
  padding: 2px 5px;
  min-width: 16px;
  height: 16px;
  top: -4px;
  right: -4px;
}

.relative-position {
  position: relative;
}
</style>
