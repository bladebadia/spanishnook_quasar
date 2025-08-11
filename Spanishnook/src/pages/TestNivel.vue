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

              <!-- Answer Options -->
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
              <!-- Navigation -->
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
//const testScore = ref(0);
//const testLevel = ref('');
const showResults = ref(false);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let score = 0;
  selectedAnswers.value.forEach((answer, index) => {
    if (testQuestions[index] && answer === testQuestions[index].correct) {
      score++;
    }
  });
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
