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
    <!-- Imagen animada de izquierda a derecha -->
      <div v-if="showAnimatedImg" class="row q-mb-xl " style="width: 100%; position: relative; min-height: 300px;">
        <img
          src="/img/corazon.png"
          alt="Estudiantes"
          class="img-animada move-lr"
          style="max-width: 300px; width: 100%; position: absolute; left: 0; top: 0; margin: 0; padding: 0;"
        />
        
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
      <div v-if="showAnimatedImg" class="row q-my-xl q-py-xl" style="width: 100%; position: relative; min-height: 300px;">
        <img
          src="/img/animacion4.png"
          alt="Estudiantes"
          class="img-animada move-lr"
          style="max-width: 300px; width: 100%; position: absolute; left: 0; top: 0; margin: 0; padding: 0;"
          @animationend="mostrarBocadillo = true"
          />
        <transition name="fade">
          <div v-if="mostrarBocadillo" class="bocadillo-texto">
            ¡Bienvenid@ a
            <br/>Spanish Nook!
          </div>
        </transition>
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
      <div class="col-12 flex flex-center" >
          <q-card  class="q-pa-xl shadow-2 bg-white text-dark "
            style="width: 80%;">
            <div class="text-h3 q-mb-md text-center">Nuestro grupos formativos</div>
            <p class="q-mb-none text-center text-h5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quod deserunt atque unde ipsam laboriosam aspernatur nihil? Dolores unde necessitatibus ipsa qui ab perspiciatis dolore sequi! Laboriosam quidem nobis distinctio.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, neque. Iste, quia suscipit. Porro rerum nam non repudiandae saepe harum similique excepturi quibusdam, modi sunt voluptatum, quasi officiis eum quidem?
            </p>
          </q-card>
          
      </div>
      <div class="col-12 col-md-6 flex flex-center" >
          <q-card class="q-pa-xl shadow-2 bg-white text-primary text-center"
            style="width: 80%;">
            <h2 class="text-h4 q-mb-md">Selecciona tu curso </h2>
            <q-select
              v-model="cursoSeleccionado"
              :options="cursos"
              label="Selecciona un curso"
              outlined
              
              class="q-mb-md"
            />
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

import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { supabase } from 'src/supabaseClient';

  // Cursos para el selector
    const cursos = ref<Curso[]>([]);
    const cursoSeleccionado = ref(null);
    const mostrarBocadillo = ref(false);
    const showAnimatedImg = ref(false);

    interface Curso {
      // define aquí los campos, por ejemplo:
      id: number;
      created_at: string;// pasar a Date si es necesario
      codigo_curso: string;      
      nombre_curso: string;
      estado_curso: string;
      fecha_inicio: string; // pasar a Date si es necesario
      fecha_fin: string; // pasar a Date si es necesario
      horarios_curso: string;
      precio_curso: number;
      usuario_1: string;
      usuario_2: string;
      usuario_3: string;
      usuario_4: string;
      usuario_5: string;
      usuario_6: string;
      usuario_7: string;
      usuario_8: string;
      moneda: string;
      descripcion: string;

      // ...
    }

onMounted(async () => {
  const { data, error } = await supabase.from('cursos_grupales').select('*');
  if (!error) {
    cursos.value = data;
    console.log(data);
  }else {console.log(error);}
});

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

;

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
  .bocadillo-texto {
    position: absolute;
    right: 600px;
    top: 40px;
    background: #f9f9f8;
    border-radius: 50% 50% 60% 60% / 60% 60% 50% 50%;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 0 0 8px #e0e7ff inset;
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
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.10));
  }
  .bocadillo-texto::after, .bocadillo-texto::before {
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
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
  .bocadillo-texto::before {
    width: 22px;
    height: 22px;
    left: 95%;
    top: 95%;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>



