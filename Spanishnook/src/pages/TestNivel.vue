<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="!testCompleted && currentQuestion === 0 && !showResults">
      <q-card flat bordered class="instruction-card">
        <q-card-section class="text-center q-pb-none">
          <q-icon name="quiz" size="4rem" color="primary" />
        </q-card-section>
        <q-card-section class="text-center">
          <h2 class="text-h3 text-primary text-weight-bold q-mb-md">Test de Nivel de Español</h2>
          <p class="text-h6 text-grey-7 q-mb-lg">Evalúa tu conocimiento del idioma español</p>

          <div class="text-left q-mb-lg">
            <h3 class="text-h5 text-weight-bold q-mb-md">Instrucciones:</h3>
            <ul class="text-body1 text-grey-8">
              <li class="q-mb-sm">El test consta de 25 preguntas secuenciadas por niveles</li>
              <li class="q-mb-sm">
                Cada pregunta tiene 3 opciones de respuesta, selecciona una. Cuando creas que no
                sabes/puedes continuar con el test, deja las preguntas en blanco
              </li>
              <li class="q-mb-sm">
                Al completar el test recibirás tu nivel de español (A1, A2, B1, B2, C1). Ten en
                cuenta: el resultado de este test es una orientación aproximada de tu nivel de
                español. No sustituye a una evaluación oficial.
              </li>
              <li class="q-mb-sm">El test toma aproximadamente 10 minutos</li>
            </ul>
          </div>

          <q-btn
            size="lg"
            color="primary"
            label="Comenzar Test"
            icon="play_arrow"
            class="q-px-xl"
            @click="currentQuestion = 1"
          />
        </q-card-section>
      </q-card>

    </div>


    <!-- Questions Page -->
    <div v-if="!testCompleted && currentQuestion > 0 && !showResults">
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <q-card flat bordered class="question-card">
            <q-card-section>
              <!-- Progress Bar -->
              <div class="q-mb-lg">
                <div class="row items-center q-mb-sm">
                  <div class="col">
                    <span class="text-body2 text-grey-6">
                      Pregunta {{ currentQuestion }} de {{ testQuestions.length }}
                    </span>
                  </div>
                  <div class="col-auto">
                    <q-chip
                      :label="testQuestions[currentQuestion - 1]?.level"
                      color="secondary"
                      text-color="white"
                      size="sm"
                    />
                  </div>
                </div>
                <q-linear-progress
                  :value="currentQuestion / testQuestions.length"
                  color="primary"
                  size="8px"
                  rounded
                />
              </div>
              <!-- Question -->
              <h3 class="text-h5 text-weight-bold q-mb-lg">
                {{ testQuestions[currentQuestion - 1]?.question }}
              </h3>

              <!-- Answer Options La expresión ${String.fromCharCode(65 + index)}. ${option} convierte el índice de la opción (0, 1, 2, 3, ...) en una letra del abecedario (A, B, C, D, ...), seguida de un punto y el texto de la opción.-->
              <div class="q-gutter-sm q-mb-lg">
                <q-btn
                  v-for="(option, index) in testQuestions[currentQuestion - 1]?.options"
                  :key="index"
                  :label="`${String.fromCharCode(65 + index)}. ${option}`"
                  :color="selectedAnswers[currentQuestion - 1] === index ? 'primary' : 'grey-3'"
                  :text-color="selectedAnswers[currentQuestion - 1] === index ? 'white' : 'grey-8'"
                  class="full-width text-left q-pa-md"
                  no-caps
                  @click="selectAnswer(index)"
                />
              </div>
              <!-- Boton anterior -->
              <div class="row justify-between">
                <q-btn
                  v-if="currentQuestion > 1"
                  label="Anterior"
                  icon="chevron_left"
                  color="grey-6"
                  flat
                  @click="previousQuestion"
                />
                <q-space />
                <!-- Boton siguiente o finalizar -->
                <q-btn
                  v-if="currentQuestion < testQuestions.length"
                  label="Siguiente"
                  icon-right="chevron_right"
                  color="primary"
                  :disable="selectedAnswers[currentQuestion - 1] === undefined"
                  @click="nextQuestion"
                />
                <q-btn
                  v-if="currentQuestion === testQuestions.length"
                  label="Finalizar Test"
                  icon-right="check"
                  color="positive"
                  :disable="selectedAnswers[currentQuestion - 1] === undefined"
                  @click="finishTest"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!-- Results Page -->
    <div v-if="showResults">
      <div class="row justify-center">
        <div class="col-12 col-md-8">
          <q-card flat bordered class="results-card">
            <q-card-section class="text-center">
              <q-icon name="emoji_events" size="4rem" color="positive" class="q-mb-md" />
              <h2 class="text-h3 text-primary text-weight-bold q-mb-md">¡Test Completado!</h2>

              <div class="row justify-center items-center q-mb-lg">
                <div class="col-12 col-sm-6 text-center">
                  <q-circular-progress
                    :value="(testScore / testQuestions.length) * 100"
                    size="120px"
                    :thickness="0.1"
                    color="primary"
                    track-color="grey-3"
                    class="q-ma-md"
                  >
                    <div class="text-h4 text-weight-bold">
                      {{ testScore }}/{{ testQuestions.length }}
                    </div>
                  </q-circular-progress>
                  <div class="text-body1 text-grey-7">
                    {{ Math.round((testScore / testQuestions.length) * 100) }}% Correcto
                  </div>
                </div>

                <div class="col-12 col-sm-6 text-center">
                  <div class="text-h4 text-weight-bold text-primary q-mb-sm">Tu Nivel:</div>
                  <q-chip
                    :label="testLevel"
                    color="primary"
                    text-color="white"
                    size="lg"
                    class="q-pa-md"
                  />
                  <div class="text-body2 text-grey-7 q-mt-sm">
                    <span v-if="testLevel.includes('A1')">
                      Acceso - Conoces lo básico del español: presentarse, hablar de uno mismo y
                      usar frases básicas de uso cotidiano.
                    </span>
                    <span v-else-if="testLevel.includes('A2')">
                      Plataforma - Puedes comunicarte en situaciones simples con frases sencillas
                      para la vida diaria: compras, trabajo, familia y ocio.
                    </span>
                    <span v-else-if="testLevel.includes('B1')">
                      Umbral - Tienes dominio intermedio del idioma. Eres capaz de entender y
                      desenvolverte en conversaciones y textos claros. Hablar de experiencias y
                      planes.
                    </span>
                    <span v-else-if="testLevel.includes('B2')">
                      Avanzado - Puedes comunicarte con fluidez con personas nativas, expresar
                      opiniones y entender temas complejos.
                    </span>
                    <span v-else-if="testLevel.includes('C1')">
                      Dominio - Te expresas con soltura y naturalidad en casi cualquier situación.
                    </span>
                  </div>
                </div>
              </div>

              <div class="q-gutter-md">
                <q-btn label="Repetir Test" icon="refresh" color="secondary" @click="restartTest" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//import { useQuasar } from 'quasar';

//const $q = useQuasar();
// Test de nivel variables
const currentQuestion = ref(0);
const selectedAnswers = ref<number[]>([]);
const testCompleted = ref(false);
const testScore = ref(0);
const testLevel = ref('');
const showResults = ref(false);
//const step = ref(1);
const testQuestions = [
  {
    question: "1 ¿Cómo se escribe '2976' en español?",
    options: [
      'mil dos novecentos setenta y seis',
      'dos mil novecientos sesenta y seis',
      'dos mil novecientos setenta y seis',
    ],
    correct: 2,
    level: 'A1',
  },
  {
    question: "2 ¿Cuál es la forma correcta del verbo 'ser' para 'yo'?",
    options: ['soy', 'eres', 'es'],
    correct: 0,
    level: 'A1',
  },
  {
    question: '3 El profesor tiene muchos ___,',
    options: ['lápiz', 'lápices', 'lápizs'],
    correct: 1,
    level: 'A1',
  },
  {
    question: "4 ¿Cuál es el femenino de: 'el gato / ___'?",
    options: ['el gata', 'la gata', 'las gatas'],
    correct: 1,
    level: 'A1',
  },
  {
    question: '5 Completa: nosotros ___ a las 7 de la mañana.',
    options: ['despertamos nos', 'despiertamos', 'nos despertamos'],
    correct: 2,
    level: 'A1',
  },
  {
    question: '6 Completa: hoy (yo) ___ un examen difícil.',
    options: ['estoy', 'tiene', 'tengo'],
    correct: 2,
    level: 'A1',
  },
  {
    question: '7 Hoy ___ (comer, nosotros) una ensalada muy rica.',
    options: ['comemos', 'hemos comido', 'comerábamos'],
    correct: 1,
    level: 'A2',
  },
  {
    question: '8 ¿___ (ir, vosotros) al concierto ayer?',
    options: ['fuisteis', 'fuiste', 'iban'],
    correct: 0,
    level: 'A2',
  },
  {
    question: '9 Acuérdate de comprar los huevos y de ____ (poner) en la nevera.',
    options: ['poner', 'ponerlos', 'ponelo'],
    correct: 1,
    level: 'A2',
  },
  {
    question: '10 Mañana voy ___ Valencia ___ tren.',
    options: ['a/en', 'en/en', 'para/a'],
    correct: 0,
    level: 'A2',
  },
  {
    question: '11 Para comprar un buen collar debes ir a una ___.',
    options: ['droguería', 'joyería', 'charcutería'],
    correct: 1,
    level: 'A2',
  },
  {
    question: '12 Por favor chicos, ___ las manos antes de comer.',
    options: ['lavais', 'lavad', 'lavaos'],
    correct: 2,
    level: 'B1',
  },
  {
    question: '13 ¡Ojalá ___ el examen de lengua!',
    options: ['aprobar', 'aprobemos', 'aprobamos'],
    correct: 1,
    level: 'B1',
  },
  {
    question: '14 Espero que ___ un buen trabajo pronto.',
    options: ['conseguimos', 'conseguir', 'consigamos'],
    correct: 2,
    level: 'B1',
  },
  {
    question: '15 Hoy llueve mucho ___ no saldremos a pasear.',
    options: ['así que', 'porque', 'como'],
    correct: 0,
    level: 'B1',
  },
  {
    question: '16 ¿Qué expresión usarías para dar una opinión?',
    options: ['Me parece que...', 'Hay que...', 'Tengo que...'],
    correct: 0,
    level: 'B1',
  },
  {
    question: '18 Cuando Carla llegó al trabajo, la reunión ya ___.',
    options: ['empezó', 'ha empezado', 'había empezado'],
    correct: 2,
    level: 'B1',
  },
  {
    question: '19 No encuentro el móvil, ___ en casa.',
    options: ['me lo habré dejado', 'me lo habría dejado', 'me lo olvidaré'],
    correct: 0,
    level: 'B2',
  },
  {
    question: '20 Aunque el viaje ___ peligroso, creo que valdría la pena.',
    options: ['es', 'ha sido', 'fuese'],
    correct: 2,
    level: 'B2',
  },
  {
    question: '¿Cuál de estas frases utiliza la palabra “realizar” de forma correcta?',
    options: [
      'Mañana voy a realizar un café para mis amigos.',
      'Finalmente logró realizar su sueño de estudiar en el extranjero.',
      'No pude realizar a tu hermano en la fiesta porque había mucha gente.',
    ],
    correct: 1,
    level: 'B2',
  },
  {
    question: '22 ¿Cuál de las siguientes frases está formulada correctamente?',
    options: [
      'Aunque estaba cansado, pero terminó el trabajo a tiempo.',
      'Mañana voy a haber terminado el informe antes de la reunión.',
      'Si hubiera sabido la respuesta, la habría dicho sin dudar.',
    ],
    correct: 2,
    level: 'B2',
  },
  {
    question: '23 Mi abuelo tiene 90 años pero está fenomenal, ___.',
    options: ['está como una cabra', 'está como una vaca', 'está como un roble'],
    correct: 2,
    level: 'C1',
  },
  {
    question: '24 Me pareció increíble que ___ aquel traje para la fiesta.',
    options: ['se ponga,', 'se hubiera puesto', 'se haya puesto'],
    correct: 1,
    level: 'C1',
  },
  {
    question: '25 Lucas siempre dice que la profesora es guapísima y maravillosa. ¡___!',
    options: ['es un pelota,', 'es un pringao', 'es un maceta'],
    correct: 0,
    level: 'C1',
  },
];

// Metodos
const finishTest = () => {
  let score = 0;
  selectedAnswers.value.forEach((answer, index) => {
    if (testQuestions[index] && answer === testQuestions[index].correct) {
      score++;
    }
    console.log(`Score: ${score}`);
  });

  testScore.value = score;
  const percentage = (score / testQuestions.length) * 100;

  if (percentage >= 100) {
    testLevel.value = 'C1 - Dominio';
    if (percentage >= 90) {
      testLevel.value = 'B2 - Avanzado';
    } else if (percentage >= 70) {
      testLevel.value = 'B1 - Intermedio';
    } else if (percentage >= 50) {
      testLevel.value = 'A2 - Plataforma';
    } else testLevel.value = 'A1 - Acceso';
  }

  testCompleted.value = true;
  showResults.value = true;
};

const restartTest = () => {
  currentQuestion.value = 0;
  selectedAnswers.value = [];
  testCompleted.value = false;
  testScore.value = 0;
  testLevel.value = '';
  showResults.value = false;
};

function selectAnswer(answerIndex: number) {
  selectedAnswers.value[currentQuestion.value - 1] = answerIndex;
}

function nextQuestion() {
  if (currentQuestion.value < testQuestions.length) {
    currentQuestion.value++;
  } else {
    finishTest();
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 1) {
    currentQuestion.value--;
  }
};
// Show results
//showResults.value = true;
// Set test score and level
// testScore.value = score;
// testLevel.value = getTestLevel(score);
</script>


  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"