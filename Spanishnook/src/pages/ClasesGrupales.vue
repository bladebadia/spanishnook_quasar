<template>
<q-page class="row items-center justify-evenly">
  <q-img
        style="width: 100%; max-height:800px;"
        src="/img/estudiantes_1024.jpg"
        fit="cover"
        >
        <div
          class="text-weight-bolder titulo-responsivo"
          style="          
          top: 30%;
          left: 25%;
          transform: translate(-50%, -50%);
          color: white;
          text-shadow: 0 2px 8px #000;
          text-align: center;
          width: 90%;
          z-index: 2;
          background-color:rgba(0, 0, 0, 0.0)
          "
          >
           CLASES GRUPALES
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
  <div>
    <h2 class="text-h2 q-my-lg">Clases Grupales</h2>
    <p class="text-h5 q-my-xs texto-responsivo q-my-md">
      Únete a nuestras clases grupales y mejora tu español en un ambiente colaborativo y divertido.
    </p>
  </div>
    <!-- Imagen animada de izquierda a derecha -->
  <div v-intersect="onImgIntersect" style="width: 100%;" class="row q-mb-xl full-width">
    <transition name="slide-fade-left">
      <div v-if="showAnimatedImg" class="row q-mb-xl " style="width: 100%; position: relative; min-height: 300px;">
        <img
          src="/img/corazon.png"
          alt="Estudiantes"
          class="img-animada move-lr"
          style="max-width: 300px; width: 100%; position: absolute; left: 0; top: 0; margin: 0; padding: 0;"
        />
      </div>
    </transition>
  </div>
  

  <!-- Div con números ascendentes y título -->
  <div class="numeros-div  q-mb-xl q-pt-none flex column items-center justify-center bg-primary"
       v-intersect="onLogrosIntersect"
       style="width: 100%;">
    <h2 class="text-h2 q-my-lg">¡Unete a ell@s!</h2>
    <div class="numeros-lista flex row justify-around full-width">
      <div class="numero-item q-pa-none q-ma-none">
        <div class="numero" style = "color: white; font-size: 3rem;">{{ count1 }}</div>
        <div class="desc" style="font-size: 3rem; color:white">Alumnos</div>
      </div>
      <div class="numero-item ">
          <div class="numero " style = "color: white; font-size: 3rem;">{{ count2 }}</div>
          <div class="desc" style="font-size: 3rem; color:white">Cursos</div>
        </div>
        <div class="numero-item">
          <div class="numero" style = "color: white; font-size: 3rem;">{{ count3 }}</div>
          <div class="desc" style="font-size: 3rem; color:white">Clases privadas</div>
        </div>
        <div class="numero-item">
          <div class="numero" style = "color: white; font-size: 3rem;">{{ count4 }}</div>
          <div class="desc" style="font-size: 3rem; color:white">Cuarto paso</div>
        </div>
    </div>
  </div>

  <!-- div de servicio clases grupales -->
  <div class="servicio-clases-grupales">
    <div class="row flex q-my-xl" style="width: 100%; gap: 32px;">
      <div class="col-12 col-md-5">
          <q-card class="q-pa-xl shadow-2 bg-white text-primary text-center">
            <h2 class="text-h4 q-mb-md">Cursos </h2>
            <q-select
              v-model="cursoSeleccionado"
              :options="cursos"
              label="Selecciona un curso"
              outlined
              dense
              class="q-mb-md"
            />
          </q-card>
      </div>
      <div class="col-12 col-md-5">
          <q-card  class="q-pa-xl shadow-2 bg-white text-dark">
            <div class="text-h5 q-mb-md">Nuestro grupos formativos</div>
            <p class="q-mb-none">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio pariatur ab reprehenderit nisi sunt ipsam odit amet dicta at doloremque harum praesentium quos aliquam ipsum, itaque rem nesciunt. Reiciendis, similique?</p>
          </q-card>
          
      </div>
    </div>
    <div class="flex flex-center">
      <q-card v-if="cursoSeleccionado" class="q-pa-xl shadow-2 bg-white text-dark">
        <div class="flex flex-center">
          <p class="text-h4">
            Curso seleccionado {{ cursoSeleccionado }}
          </p>
        </div>        
        <p class="q-mb-none">{{ cursoSeleccionado }}</p>
      </q-card>
      <q-card v-else class="q-pa-xl shadow-2 bg-white text-dark">
        <div class="text-h5 q-mb-md">Selecciona un curso para ver la descripción</div>
      </q-card>
    </div>
    
  </div>
  </q-page>
</template>


<script setup lang="ts">

  import type { Ref } from 'vue';
  import { ref, onMounted, onUnmounted } from 'vue';
    // Cursos para el selector
    const cursos = [
      { coste : 230 ,label: 'A1 (A1.1/A1.2)', value: 'A1', descripcion: 'Mejora tu fluidez y confianza hablando en grupo sobre temas cotidianos y de actualidad.' },
      { coste : 230 ,label: 'A2 (A2.1/A2.2)', value: 'A2', descripcion: 'Mejora tu fluidez y confianza hablando en grupo sobre temas cotidianos y de actualidad.' },
      { coste : 230 ,label: 'B1 (B1.1/B1.2)', value: 'B1', descripcion: 'Mejora tu fluidez y confianza hablando en grupo sobre temas cotidianos y de actualidad.' },
      { coste : 230 ,label: 'B2 ', value: 'B2', descripcion: 'Mejora tu fluidez y confianza hablando en grupo sobre temas cotidianos y de actualidad.' },
      { coste : 230 ,label: 'C1', value: 'C1', descripcion: 'Mejora tu fluidez y confianza hablando en grupo sobre temas cotidianos y de actualidad.' },
      { coste : 230 ,label: 'Conversación', value: 'conversacion', descripcion: 'Mejora tu fluidez y confianza hablando en grupo sobre temas cotidianos y de actualidad.' },
      { coste : 230 ,label: 'Gramática', value: 'gramatica', descripcion: 'Refuerza las bases gramaticales del español con ejercicios prácticos y explicaciones claras.' },
      { coste : 230 ,label: 'Preparación DELE', value: 'dele', descripcion: 'Prepárate para los exámenes oficiales DELE con simulacros y estrategias específicas.' },
      { coste : 230 ,label: 'Cultura y Sociedad', value: 'cultura', descripcion: 'Descubre la cultura hispana a través de actividades, debates y recursos auténticos.' }
    ];
    const cursoSeleccionado = ref(null);
  const showAnimatedImg = ref(false);
  let lastScrollY = window.scrollY;
  let scrollDirection: 'down' | 'up' = 'down';


  function onImgIntersect(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting && scrollDirection === 'down') {
      showAnimatedImg.value = false;
      setTimeout(() => {
        showAnimatedImg.value = true;
      }, 10);
    }
    if (!entry.isIntersecting) {
      showAnimatedImg.value = false;
    }
    return true;
  }

  function handleScroll() {
  const currentY = window.scrollY;
  scrollDirection = currentY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentY;
}

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

    // Animación de conteo ascendente para los números
    const count1 = ref(0);
    const count2 = ref(0);
    const count3 = ref(0);
    const count4 = ref(0);

    function animateCount(refVar: Ref<number, number>, target: number, duration = 1200) {
      const start = 0;
      const increment = Math.ceil(target / (duration / 20));
      let current = start;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          refVar.value = target;
          clearInterval(interval);
        } else {
          refVar.value = current;
        }
      }, 20);
    }


    let logrosAnimado = false;
    function onLogrosIntersect(entry: IntersectionObserverEntry) {
      if (entry.isIntersecting && !logrosAnimado) {
        logrosAnimado = true;
        animateCount(count1, 600);
        animateCount(count2, 240);
        animateCount(count3, 360);
        animateCount(count4, 48);
      }
      if (!entry.isIntersecting) {
        logrosAnimado = false;
        count1.value = 0;
        count2.value = 0;
        count3.value = 0;
        count4.value = 0;
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });


</script>

<style>
  .titulo-responsivo {
  font-size: 4rem;
}

.oval-btn {
  border-radius: 64px !important;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: bold;
  font-size: 3rem;
  margin-top: 30px;
}
@media (max-width: 900px) {
.oval-btn {
  border-radius: 64px !important;
  padding-left: 25px;
  padding-right: 25px;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 30px;
}
}

/* Animación de entrada izquierda a derecha */
.slide-fade-left-enter-active {
  /* No usar para la traslación, solo para fade si se desea */
}
.slide-fade-left-leave-active {
  display: none;
}
.move-lr {
  animation: moveLeftToRight 2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
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
.row.q-mb-xl {
  overflow: visible !important;
}
.img-animada {
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
}

.numeros-div {
  width: 500px;
  max-width: 95vw;
  background: #fffbe6;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 32px 16px;
}
.numeros-lista {
  width: 100%;
  gap: 16px;
}
.numero-item {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.numero {
  font-size: 2.5rem;
  font-weight: bold;
  color: #e47106;
  margin-bottom: 8px;
}
.desc {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
}
</style>



