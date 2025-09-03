<template>
  <q-page>
    <div>
<<<<<<< HEAD
      <q-img style="width: 100%; max-height: 660px" src="/img/banner.jpg" fit="cover">
=======
      <q-img
        style="width: 100%; max-height: 660px"
        src="/img/banner.jpg"
        alt="Imagen estudiante"
        fit="cover"
      >
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
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
        >
          APRENDE ESPAÑOL
        </div>
        <div
          style="
            position: absolute;
            top: 75%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            background-color: rgba(0, 0, 0, 0);
          "
        >
          <q-btn class="oval-btn" color="primary" unelevated to="/ClasesIndividuales">
            <h5>Empieza ahora</h5>
          </q-btn>
        </div>
      </q-img>
    </div>

    <div class="column items-center text-center q-mt-xl">
      <h1 class="text-h2 titulo-responsivo">Español a tu ritmo y desde cualquier lugar</h1>
      <p class="q-mt-md texto-responsivo" style="max-width: 1000px">
        Aprender español puede ser algo cómodo, cercano y hecho para ti. En Spanish Nook encontrarás
        tu lugar: un espacio online donde aprender a tu ritmo con clases dinámicas, materiales
        adaptados a ti y un ambiente relajado para que hablar español se sienta como estar en casa.
      </p>
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
              <q-card-section class="text-h5 text-center"
                >¡Descubre nuestras clases personalizadas!</q-card-section
              >
              <q-card-section class="text-h6 text-center">
                Reserva una clase de prueba y vive la experiencia Spanish Nook.
              </q-card-section>
              <q-card-actions>
                <q-btn color="primary" to="/ClasesIndividuales" unelevated>Reserva tu clase</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12 col-md-6 text-left">
            <h2 class="text-h3 q-mb-md">Clases personalizadas</h2>
            <ul class="text-h5 lista-check">
              <li class="q-py-sm">Clases adaptadas a tu nivel y objetivos</li>
              <li class="q-py-sm">Ambiente relajado y motivador</li>
              <li class="q-py-sm">Materiales exclusivos y dinámicos</li>
              <li class="q-py-sm">Atención personalizada</li>
              <li class="q-py-sm">Clases adaptadas a tu nivel y objetivos</li>
              <li class="q-py-sm">Ambiente relajado y motivador</li>
              <li class="q-py-sm">Materiales exclusivos y dinámicos</li>
              <li class="q-py-sm">Atención personalizada</li>
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
          <div class="col-12 items-center flex flex-center q-pa-lg">
            <p class="text-h3 text-center">Clases a tu medida</p>
          </div>
          <div class="col-12 items-start flex q-pa-md">
            <q-card class="q-pa-md" style="width: 30%">
              <q-img
                src="img/estudiante_1024.jpg"
                fit="contain"
                style="max-height: 250px; margin: 0 auto; display: block"
                class="card-img-animada q-ma-md"
              />
              <q-card-section class="text-h4 text-center">Clases particulares</q-card-section>
              <q-card-section class="text-h6 text-center"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed totam iure quam
                officiis odio aperiam praesentium consectetur, ex dolorum, veritatis earum cumque
                tenetur, cum obcaecati reiciendis mollitia unde velit odit.</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn color="primary" to="/ClasesIndividuales" class="text-h5" unelevated
                  >Reserva tu clase</q-btn
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
              <q-card-section class="text-h4 text-center">Clases grupales</q-card-section>
              <q-card-section class="text-h6 text-center"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed totam iure quam
                officiis odio aperiam praesentium consectetur, ex dolorum, veritatis earum cumque
                tenetur, cum obcaecati reiciendis mollitia unde velit odit.</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn color="primary" to="/ClasesIndividuales" class="text-h5" unelevated
                  >Reserva tu clase</q-btn
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
              <q-card-section class="text-h4 text-center">Clases de conversacion</q-card-section>
              <q-card-section class="text-h6 text-center"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed totam iure quam
                officiis odio aperiam praesentium consectetur, ex dolorum, veritatis earum cumque
                tenetur, cum obcaecati reiciendis mollitia unde velit odit.</q-card-section
              >
              <q-card-actions class="flex flex-center">
                <q-btn color="primary" to="/ClasesIndividuales" class="text-h5" unelevated
                  >Reserva tu clase</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
        </div>
<<<<<<< HEAD
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
          <div class="col-12 q-pa-lg" style="position: absolute; top: 20%; left: 10%">
            <p class="text-h2">Test de nivel gratuito</p>
            <p class="text-h4 q-px-xl">
              Comprueba tu nivel con nuestro test y selecciona el curso adecuado
            </p>
            <q-btn color="primary" to="/ClasesIndividuales" class="text-h4 q-ma-xl" unelevated
              >Vamos al test</q-btn
            >
          </div>
=======
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
          <div class="col-12 q-pa-lg" style="position: absolute; top: 20%; left: 10%">
            <p class="text-h2">Test de nivel gratuito</p>
            <p class="text-h4 q-px-xl">
              Comprueba tu nivel con nuestro test y selecciona el curso adecuado
            </p>
            <q-btn color="primary" to="/ClasesIndividuales" class="text-h4 q-ma-xl" unelevated
              >Vamos al test</q-btn
            >
          </div>
        </div>
      </transition>
    </div>

    <!-- Timeline horizontal con q-stepper -->
    <div v-intersect="onPromoIntersect3" class="">
      <transition enter-active-class="animated fadeInUpBig slower ">
        <div class="q-my-xl" v-if="showPromoCard3">
          <q-stepper alternative-labels v-model="step">
            <q-step
              name="Paso 1"
              title="Paso 1"
              done-icon="looks_one"
              caption="Descripción del primer paso"
              :done="true"
            >
            </q-step>
            <q-step
              name="2"
              title="Paso 2"
              done-icon="looks_two"
              :done="true"
              caption="Lorem ipsum dolor sit amet"
            >
            </q-step>
            <q-step
              name="Paso 3"
              title="Paso 3"
              done-icon="looks_3"
              :done="true"
              caption="Descripción del tercer paso"
            >
            </q-step>
            <q-step
              name="Paso 4"
              title="Paso 4"
              done-icon="looks_4"
              :done="true"
              caption="Descripción del cuarto paso"
            >
            </q-step>
          </q-stepper>
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
              <q-item-label class="text-h3 text-center q-pt-xl q-pl-xl">
                Que hay detras de Spanish nook
              </q-item-label>
            </q-item>
            <q-separator />
            <q-item class="flex flex-center q-pa-md">
              <q-item-label class="text-center text-h5" style="width: 75%">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut facere, maiores,
                explicabo ab, nihil harum quasi accusantium dicta tempora necessitatibus alias
                libero nulla officiis possimus dolore! Mollitia ipsa beatae magnam.
              </q-item-label>
            </q-item>
            <q-card-actions class="flex flex-center">
              <q-btn color="primary" to="/ClasesIndividuales" size="lg" unelevated>Conocenos</q-btn>
            </q-card-actions>
          </q-card>
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
        </div>
      </transition>
    </div>

<<<<<<< HEAD
    <!-- Sobre Spanish nook -->
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
              <q-item-label class="text-h3 text-center q-pt-xl q-pl-xl">
                Que hay detras de Spanish nook
              </q-item-label>
            </q-item>
            <q-separator />
            <q-item class="flex flex-center q-pa-md">
              <q-item-label class="text-center text-h5" style="width: 75%">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut facere, maiores,
                explicabo ab, nihil harum quasi accusantium dicta tempora necessitatibus alias
                libero nulla officiis possimus dolore! Mollitia ipsa beatae magnam.
              </q-item-label>
            </q-item>
            <q-card-actions class="flex flex-center">
              <q-btn color="primary" to="/ClasesIndividuales" size="lg" unelevated>Conocenos</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </transition>
=======
    <!-- Sección de Opiniones Verificadas -->
    <div class="q-my-xl opiniones-verificadas-section">
      <h2 class="text-h4 text-center q-mb-lg">Opiniones verificadas de nuestros alumnos</h2>
      <div class="row justify-center q-gutter-xl q-py-xl">
        <q-card class="col-12 col-md-3 q-pa-md shadow-2">
          <q-item>
            <q-item-section>
              <q-avatar size="80px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h5"> Maria G. </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 q-mb-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius. Obcaecati
                fugiat accusamus nesciunt quod veniam eum! Quia provident dicta aliquam.
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-center">
            <q-rating color="amber" size="3em" readonly :model-value="5" />
          </div>
        </q-card>

        <q-card class="col-12 col-md-3 q-pa-md shadow-2">
          <q-item>
            <q-item-section>
              <q-avatar size="80px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h5"> Maria G. </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 q-mb-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius. Obcaecati
                fugiat accusamus nesciunt quod veniam eum! Quia provident dicta aliquam.
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-center">
            <q-rating color="amber" size="3em" readonly :model-value="5" />
          </div>
        </q-card>

        <q-card class="col-12 col-md-3 q-pa-md shadow-2">
          <q-item>
            <q-item-section>
              <q-avatar size="80px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h5"> Maria G. </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 q-mb-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius. Obcaecati
                fugiat accusamus nesciunt quod veniam eum! Quia provident dicta aliquam.
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-center">
            <q-rating color="amber" size="3em" readonly :model-value="5" />
          </div>
        </q-card>
      </div>

      <div class="row justify-center bg-white">
        <q-carousel
          animated
          v-model="slide"
          infinite
          :autoplay="autoplay ? 4000 : 0"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide :name="1">
            <q-card
              class="col-12 col-md-3 q-pa-md shadow-2"
              style="min-width: 200px; max-width: 450px; width: 100%"
            >
              <q-item>
                <q-item-section>
                  <q-avatar size="80px">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-bold"> Maria G. </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 q-mb-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                    voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius.
                    Obcaecati fugiat accusamus nesciunt quod veniam eum! Quia provident dicta
                    aliquam.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <div class="text-center">
                <q-rating color="amber" size="3em" readonly :model-value="5" />
              </div>
            </q-card>
          </q-carousel-slide>

          <q-carousel-slide :name="2" style="min-width: 200px; max-width: 450px; width: 100%">
            <q-card class="col-12 col-md-3 q-pa-md shadow-2">
              <q-item>
                <q-item-section>
                  <q-avatar size="80px">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-bold"> Maria G. </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 q-mb-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                    voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius.
                    Obcaecati fugiat accusamus nesciunt quod veniam eum! Quia provident dicta
                    aliquam.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <div class="text-center">
                <q-rating color="amber" size="3em" readonly :model-value="5" />
              </div>
            </q-card>
          </q-carousel-slide>

          <q-carousel-slide :name="3" style="min-width: 200px; max-width: 450px; width: 100%">
            <q-card class="col-12 col-md-3 q-pa-md shadow-2">
              <q-item>
                <q-item-section>
                  <q-avatar size="80px">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-bold"> Maria G. </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 q-mb-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                    voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius.
                    Obcaecati fugiat accusamus nesciunt quod veniam eum! Quia provident dicta
                    aliquam.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <div class="text-center">
                <q-rating color="amber" size="3em" readonly :model-value="5" />
              </div>
            </q-card>
          </q-carousel-slide>

          <q-carousel-slide :name="4" style="min-width: 200px; max-width: 450px; width: 100%">
            <q-card class="col-12 col-md-3 q-pa-md shadow-2">
              <q-item>
                <q-item-section>
                  <q-avatar size="80px">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-bold"> Maria G. </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 q-mb-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil exercitationem
                    voluptas reiciendis cum fugit ipsa cupiditate temporibus asperiores eius.
                    Obcaecati fugiat accusamus nesciunt quod veniam eum! Quia provident dicta
                    aliquam.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <div class="text-center">
                <q-rating color="amber" size="3em" readonly :model-value="5" />
              </div>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
      </div>
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
    </div>

    <!-- Sección de FAQs -->
    <div class="q-my-xl faqs-section">
<<<<<<< HEAD
      <h2 class="text-h3 text-center q-mb-lg">Preguntas frecuentes (FAQs)</h2>
      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
=======
      <h2 class="text-h4 text-center q-mb-lg">Preguntas frecuentes (FAQs)</h2>
      <q-expansion-item
        label="¿Qué nivel de español necesito para apuntarme?"
        expand-separator
        icon="help_outline"
      >
        <div class="text-body1">
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>
<<<<<<< HEAD

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
        </div>
      </q-expansion-item>

      <q-expansion-item class="text-h5  q-mb-md"
        expand-separator
      >
        <template v-slot:header>
        <q-item-section avatar>
            <q-avatar icon="groups" color="primary" text-color="white" size="48px" />
          </q-item-section>
          <h5 >¿Que nivel de español necesito para apuntarme?</h5>

        </template>
        <div class="text-h5 text-center q-px-xl q-mx-md" >
          No necesitas ningún nivel previo. Ofrecemos clases para todos los niveles, desde
          principiante hasta avanzado.
=======
      <q-expansion-item
        label="¿Las clases son individuales o grupales?"
        expand-separator
        icon="groups"
      >
        <div class="text-body1">
          Puedes elegir entre clases individuales o grupales, según tu preferencia y objetivos.
        </div>
      </q-expansion-item>
      <q-expansion-item
        label="¿Puedo probar una clase antes de apuntarme?"
        expand-separator
        icon="star"
      >
        <div class="text-body1">
          Sí, puedes reservar una clase de prueba gratuita para conocer nuestra metodología y
          resolver tus dudas.
        </div>
      </q-expansion-item>
      <q-expansion-item
        label="¿Qué materiales se utilizan en las clases?"
        expand-separator
        icon="menu_book"
      >
        <div class="text-body1">
          Utilizamos materiales propios, recursos digitales y actividades interactivas adaptadas a
          cada alumno.
        </div>
      </q-expansion-item>
      <q-expansion-item
        label="¿Cómo reservo y pago las clases?"
        expand-separator
        icon="credit_card"
      >
        <div class="text-body1">
          Puedes reservar y pagar tus clases fácilmente a través de nuestra web o contactando con
          nosotros por WhatsApp.
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
        </div>
      </q-expansion-item>
      
      
    </div>

    <!-- Sección de Contacto -->
    <div class="q-my-xl contacto-section flex flex-center column items-center">
      <h2 class="text-h4 text-center q-mb-md">¿Tienes dudas o quieres más información?</h2>
      <p class="text-body1 text-center q-mb-lg" style="max-width: 600px">
        Escríbenos y te responderemos lo antes posible. También puedes reservar tu primera clase o
        pedir información personalizada.
      </p>
      <q-btn color="primary" size="lg" unelevated to="/Contacto" class="q-mb-md">
        Ir a la página de contacto
      </q-btn>
    </div>
    <div class="q-my-xl"></div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showPromoCard = ref(false);
const showPromoCard1 = ref(false);
const showPromoCard2 = ref(false);
const showPromoCard4 = ref(false);

let lastScrollY = window.scrollY;
let scrollDirection: 'down' | 'up' = 'down';

function handleScroll() {
  const currentY = window.scrollY;
  scrollDirection = currentY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentY;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function onPromoIntersect(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting && scrollDirection === 'down') {
    showPromoCard.value = true;
  }
  return true;
}

function onPromoIntersect1(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting && scrollDirection === 'down') {
    showPromoCard1.value = true;
  }
  return true;
}

function onPromoIntersect2(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting && scrollDirection === 'down') {
    showPromoCard2.value = true;
  }
  return true;
}

function onPromoIntersect4(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting && scrollDirection === 'down') {
    showPromoCard4.value = true;
  }
  return true;
}
</script>
<<<<<<< HEAD

<style>
/* Estilos para los botones ovalados */
=======
<style>
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
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
    font-size: 2.3rem;
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

<<<<<<< HEAD
/*Estilos lista*/
=======
/* Animación personalizada fade-scale */
.fade-scale-enter-active {
  transition:
    opacity 2s,
    transform 2s;
}
.fade-scale-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970

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
<<<<<<< HEAD
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
=======
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
}

.card-img-animada:hover {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 8px 32px rgba(44, 204, 64, 0.18);
  z-index: 2;
}

.degradado-fondo {
  background: linear-gradient(90deg, #edc00c 0%, #e47106 100%);
}

<<<<<<< HEAD
.faqs-section {
=======
.timeline-horizontal {
  position: relative;
  width: 100%;
  min-height: 180px;
}
.timeline-connector {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #2ecc40 0%, #3498db 100%);
  align-self: center;
  border-radius: 2px;
  margin: 0 8px;
}
@media (max-width: 900px) {
  .timeline-horizontal {
    flex-direction: column !important;
    align-items: stretch !important;
  }
  .timeline-connector {
    width: 4px;
    height: 40px;
    margin: 8px auto;
    background: linear-gradient(180deg, #2ecc40 0%, #3498db 100%);
  }
}
.q-stepper__title {
  font-size: 2rem !important;
}
.q-stepper__caption {
  font-size: 1.3rem !important;
}
.q-stepper__dot {
  width: 80px;
  height: 80px;
  font-size: 60px !important;
}

.opiniones-verificadas-section {
  background: #fffdf8;
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
  border-radius: 18px;
  padding: 32px 0;
  max-width: 900px;
  margin: 0 auto;
}
<<<<<<< HEAD
.contacto-section {
=======

.faqs-section {
  background: #bbadff;
  color: #fffdf8;
  border-radius: 18px;
  padding: 32px 0;
  max-width: 900px;
  margin: 0 auto;
}
.contacto-section {
  background: #ffd95c;
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
  border-radius: 18px;
  padding: 32px 0 40px 0;
  max-width: 900px;
  margin: 0 auto;
}

/* Agrandar icono de q-expansion-item en FAQs */
.faqs-section .q-expansion-item__toggle-icon {
  font-size: 3.5rem !important;
}

</style>
<<<<<<< HEAD

/* Agrandar icono de q-expansion-item en FAQs usando ::v-deep para Quasar */
.faqs-section ::v-deep .q-expansion-item__toggle-icon {
  font-size: 2.5rem !important;
}


=======
>>>>>>> be02899a25d65fe1a8a75d2aa155acd6f98c6970
