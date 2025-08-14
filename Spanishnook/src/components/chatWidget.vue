<template>
  <div>
    <!-- Floating Chat Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="chat" color="primary" size="lg" @click="openChat" class="chat-fab">
        <q-tooltip anchor="center left" self="center right" class="bg-primary">
          Chat de Ayuda
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <!-- Chat Dialog -->
    <q-dialog
      v-model="chatDialogVisible"
      position="bottom"
      :maximized="$q.screen.lt.sm"
      class="chat-dialog"
    >
      <q-card class="chat-card" :style="$q.screen.gt.xs ? 'width: 400px; height: 500px' : ''">
        <!-- Chat Header -->
        <q-toolbar class="bg-primary text-white">
          <q-avatar size="32px" class="q-mr-sm">
            <q-icon name="support_agent" />
          </q-avatar>
          <q-toolbar-title class="text-weight-bold"> Asistente Spanishnook </q-toolbar-title>
          <q-btn flat round dense icon="close" @click="closeChat" />
        </q-toolbar>

        <!-- Chat Messages -->
        <q-card-section class="chat-messages q-pa-none" style="height: 350px">
          <q-scroll-area class="full-height q-px-md q-py-sm">
            <div
              v-for="message in chatMessages"
              :key="message.id"
              class="message-container"
              :class="message.sender === 'user' ? 'user-message' : 'bot-message'"
            >
              <div class="message-bubble" :class="message.sender">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">{{ message.timestamp }}</div>
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="message-container bot-message">
              <div class="message-bubble bot typing-indicator">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>

        <!-- Chat Input -->
        <q-card-section class="chat-input q-pa-sm">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="chatInput"
                placeholder="Escribe tu mensaje..."
                outlined
                dense
                @keyup.enter="sendMessage"
                class="chat-input-field"
              >
                <template v-slot:prepend>
                  <q-icon name="edit" color="grey-6" />
                </template>
              </q-input>
            </div>
            <div class="col-auto">
              <q-btn
                round
                color="primary"
                icon="send"
                @click="sendMessage"
                :disable="!chatInput.trim()"
                size="md"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

// Chat variables
const chatDialogVisible = ref(false);
const chatMessages = ref([
  {
    id: 1,
    text: '¡Hola! Soy tu asistente virtual de SpanishnookBolt. ¿En qué puedo ayudarte hoy?',
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString(),
  },
]);
const chatInput = ref('');
const isTyping = ref(false);

// Chat methods
const openChat = () => {
  chatDialogVisible.value = true;
};

const closeChat = () => {
  chatDialogVisible.value = false;
};

const sendMessage = () => {
  if (!chatInput.value.trim()) return;

  // Add user message
  const userMessage = {
    id: Date.now(),
    text: chatInput.value,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString(),
  };

  chatMessages.value.push(userMessage);
  const userInput = chatInput.value.toLowerCase();
  chatInput.value = '';

  // Show typing indicator
  isTyping.value = true;

  // Simulate bot response
  setTimeout(() => {
    isTyping.value = false;

    let botResponse = '';

    // Simple response logic based on keywords
    if (userInput.includes('hola') || userInput.includes('hello')) {
      botResponse = '¡Hola! ¿Cómo puedo ayudarte con tu aprendizaje de español?';
    } else if (userInput.includes('test') || userInput.includes('nivel')) {
      botResponse =
        'Puedes hacer nuestro test de nivel haciendo clic en "Test de Nivel" en la barra superior. Te ayudará a conocer tu nivel actual de español.';
    } else if (userInput.includes('cultura') || userInput.includes('españa')) {
      botResponse =
        'En la sección de Cultura puedes explorar la rica historia y tradiciones de España. ¡Hay mucho que descubrir!';
    } else if (userInput.includes('idioma') || userInput.includes('aprender')) {
      botResponse =
        'En la sección de Idioma encontrarás lecciones interactivas y ejercicios para mejorar tu español. ¿Te gustaría empezar?';
    } else if (userInput.includes('gracias')) {
      botResponse = '¡De nada! Estoy aquí para ayudarte en tu viaje de aprendizaje del español.';
    } else if (userInput.includes('adiós') || userInput.includes('bye')) {
      botResponse = '¡Hasta luego! Que tengas un buen día aprendiendo español.';
    } else {
      botResponse =
        'Entiendo que tienes una pregunta. Puedo ayudarte con información sobre nuestro test de nivel, cultura española, lecciones de idioma, o cualquier otra consulta sobre SpanishnookBolt.';
    }

    const botMessage = {
      id: Date.now(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    };

    chatMessages.value.push(botMessage);
  }, 1500);
};
</script>

<style lang="sass" scoped>
// Chat Styles
.chat-fab
  box-shadow: 0 4px 12px rgba(0,0,0,0.15)
  transition: all 0.3s ease

  &:hover
    transform: scale(1.1)
    box-shadow: 0 6px 20px rgba(0,0,0,0.2)

.chat-dialog
  .chat-card
    border-radius: 12px 12px 0 0
    overflow: hidden

    @media (min-width: 600px)
      border-radius: 12px
      margin-bottom: 20px

.chat-messages
  background: #f5f5f5

.message-container
  margin-bottom: 12px
  display: flex

  &.user-message
    justify-content: flex-end

  &.bot-message
    justify-content: flex-start

.message-bubble
  max-width: 80%
  padding: 8px 12px
  border-radius: 18px
  position: relative

  &.user
    background: #D2691E
    color: white
    border-bottom-right-radius: 4px

  &.bot
    background: white
    color: #333
    border: 1px solid #e0e0e0
    border-bottom-left-radius: 4px

  &.typing-indicator
    padding: 12px 16px

.message-text
  font-size: 14px
  line-height: 1.4
  margin-bottom: 4px

.message-time
  font-size: 11px
  opacity: 0.7
  text-align: right

.typing-dots
  display: flex
  align-items: center
  gap: 4px

  span
    width: 6px
    height: 6px
    border-radius: 50%
    background: #999
    animation: typing 1.4s infinite ease-in-out

    &:nth-child(1)
      animation-delay: -0.32s

    &:nth-child(2)
      animation-delay: -0.16s

@keyframes typing
  0%, 80%, 100%
    transform: scale(0.8)
    opacity: 0.5
  40%
    transform: scale(1)
    opacity: 1

.chat-input
  background: white
  border-top: 1px solid #e0e0e0

.chat-input-field
  .q-field__control
    border-radius: 20px
</style>
