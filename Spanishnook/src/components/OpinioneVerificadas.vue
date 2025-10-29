<!-- filepath: /workspaces/Spanishnook/Spanishnook/src/components/OpinioneVerificadas.vue -->
<template>
  <q-card flat bordered class="opinion-card full-height">
    <q-card-section class="text-center q-pb-none">
      <!-- Rating de estrellas -->
      <div class="row items-center justify-center q-mb-sm">
        <q-rating
          :model-value="opinion.rating"
          max="5"
          size="1.5em"
          color="yellow-8"
          readonly
        />
      </div>
      
      <!-- Avatar del usuario -->
      <q-avatar :size="avatarSize" class="q-mb-sm">
        <img :src="opinion.avatar" :alt="opinion.name">
      </q-avatar>
      
      <!-- Nombre y país -->
      <div class="text-weight-bold text-body1">{{ opinion.name }}</div>
      <div class="text-caption text-grey-6 row items-center justify-center">
        <span>{{ opinion.country }}</span>
        <q-icon 
          v-if="opinion.verified" 
          name="verified" 
          color="primary" 
          size="sm" 
          class="q-ml-xs" 
        />
      </div>
    </q-card-section>
    
    <!-- Comentario de la opinión -->
    <q-card-section class="q-pt-sm">
      <p class="text-body2 text-center text-italic opinion-text">
        "{{ opinion.comment }}"
      </p>
      
      <!-- Fecha opcional -->
      <div v-if="opinion.date" class="text-caption text-grey-5 text-center q-mt-sm">
        {{ formatDate(opinion.date) }}
      </div>
    </q-card-section>
    
    <!-- Curso/Programa opcional -->
    <q-card-section v-if="opinion.course" class="q-pt-none">
      <q-chip 
        :label="opinion.course"
        size="sm"
        color="grey-3"
        text-color="grey-8"
        class="full-width justify-center"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Definir las props del componente
interface Opinion {
  name: string;
  country: string;
  avatar: string;
  rating: number;
  comment: string;
  verified?: boolean;
  date?: string;
  course?: string;
}

interface Props {
  opinion: Opinion;
  avatarSize?: string;
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  avatarSize: '60px',
  compact: false
});

// Computed para el tamaño del avatar responsivo
const avatarSize = computed(() => {
  if (props.compact) return '45px';
  return props.avatarSize;
});

// Función para formatear fecha
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long'
  });
};
</script>

<style scoped>
.opinion-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  min-height: 300px;
}

.opinion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.opinion-card .q-avatar {
  border: 3px solid #f0f0f0;
  transition: border-color 0.3s ease;
}

.opinion-card:hover .q-avatar {
  border-color: #1976d2;
}

.opinion-text {
  line-height: 1.5;
  font-style: italic;
  color: #555;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.q-rating {
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .opinion-card {
    margin-bottom: 20px;
    min-height: 280px;
  }
  
  .opinion-text {
    font-size: 0.9rem;
    min-height: 50px;
  }
}

@media (max-width: 480px) {
  .opinion-card {
    min-height: 260px;
  }
  
  .opinion-text {
    font-size: 0.85rem;
    min-height: 45px;
  }
}
</style>