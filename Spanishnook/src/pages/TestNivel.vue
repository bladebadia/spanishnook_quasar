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
              <li class="q-mb-sm">El test consta de 8 preguntas de diferentes niveles</li>
              <li class="q-mb-sm">Cada pregunta tiene 4 opciones de respuesta</li>
              <li class="q-mb-sm">Puedes navegar entre preguntas usando los botones</li>
              <li class="q-mb-sm">Al final recibirás tu nivel estimado (A1, A2, B1, B2)</li>
              <li class="q-mb-sm">El test toma aproximadamente 5-10 minutos</li>
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

<!-- Timeline horizontal con q-stepper -->
    <div class="q-my-xl">
      <q-stepper   alternative-labels  v-model="step" >
        <q-step name="Paso 1" title="Paso 1" done-icon='looks_one'
                caption="Descripción del primer paso"
                :done="true">
        </q-step>
        <q-step name="2" title="Paso 2" done-icon="looks_two" :done="true"
                caption="Lorem ipsum dolor sit amet"
                >
        </q-step>
        <q-step name="Paso 3" title="Paso 3" done-icon="looks_3" :done="true"
                caption="Descripción del tercer paso"
                >
        </q-step>
        <q-step name="Paso 4" title="Paso 4" done-icon="looks_4" :done="true"
                caption="Descripción del cuarto paso"
                >
        </q-step>
      </q-stepper>
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
                      Principiante - Conoces lo básico del español
                    </span>
                    <span v-else-if="testLevel.includes('A2')">
                      Elemental - Puedes comunicarte en situaciones simples
                    </span>
                    <span v-else-if="testLevel.includes('B1')">
                      Intermedio - Tienes un buen dominio del idioma
                    </span>
                    <span v-else-if="testLevel.includes('B2')">
                      Avanzado - Excelente conocimiento del español
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
const step = ref(1);
const testQuestions = [
  {
    question: "¿Cómo se dice 'Hello' en español?",
    options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
    correct: 1,
    level: 'A1',
  },
  {
    question: "¿Cuál es la forma correcta del verbo 'ser' para 'yo'?",
    options: ['soy', 'eres', 'es', 'somos'],
    correct: 0,
    level: 'A1',
  },
  {
    question: "¿Qué significa 'Me gusta la música'?",
    options: ["I don't like music", 'I like music', 'I play music', 'I hear music'],
    correct: 1,
    level: 'A2',
  },
  {
    question: "¿Cuál es el pretérito perfecto de 'comer' para 'él'?",
    options: ['come', 'comió', 'ha comido', 'comía'],
    correct: 2,
    level: 'A2',
  },
  {
    question: '¿Qué expresión usarías para dar una opinión?',
    options: ['Me parece que...', 'Hay que...', 'Tengo que...', 'Voy a...'],
    correct: 0,
    level: 'B1',
  },
  {
    question:
      "¿Cuál es la diferencia entre 'por' y 'para' en esta frase: 'Estudió ___ tres horas ___ el examen'?",
    options: ['por, por', 'para, para', 'por, para', 'para, por'],
    correct: 2,
    level: 'B1',
  },
  {
    question: '¿Qué tiempo verbal expresa una acción hipotética en el pasado?',
    options: [
      'Condicional simple',
      'Subjuntivo imperfecto',
      'Condicional compuesto',
      'Pluscuamperfecto',
    ],
    correct: 2,
    level: 'B2',
  },
  {
    question: '¿Cuál es el uso correcto del subjuntivo en esta frase?',
    options: ['Espero que vienes', 'Espero que vengas', 'Espero que vendrás', 'Espero que viniste'],
    correct: 1,
    level: 'B2',
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

  if (percentage >= 90) {
    testLevel.value = 'B2 - Avanzado';
  } else if (percentage >= 70) {
    testLevel.value = 'B1 - Intermedio';
  } else if (percentage >= 50) {
    testLevel.value = 'A2 - Elemental';
  } else {
    testLevel.value = 'A1 - Principiante';
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
