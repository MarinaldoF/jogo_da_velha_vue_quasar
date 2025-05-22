<template>
  <q-page padding>
    <q-card class="q-pa-md q-mb-md">
      <q-form @submit.prevent="salvarPergunta">
        <q-input
          v-model="form.titulo"
          label="Pergunta"
          filled
          required
        />

        <div
          v-for="(alternativa, index) in form.alternativas"
          :key="index"
          class="q-my-sm"
        >
          <q-input
            v-model="form.alternativas[index]"
            label="Alternativa"
            filled
            :hint="'Alternativa ' + (index + 1)"
            @blur="sincronizarAlternativas"
          />
        </div>

        <q-select
          v-model="form.correta"
          :options="alternativasValidas"
          label="Resposta correta"
          filled
          use-input
          use-chips
          emit-value
          map-options
          :disable="alternativasValidas.length < 2"
        />

        <div class="q-mt-md">
          <q-btn type="submit" label="Salvar" color="primary" />
          <q-btn
            v-if="editandoId"
            label="Cancelar Edição"
            flat
            @click="cancelarEdicao"
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>

    <q-card
      v-for="pergunta in perguntas"
      :key="pergunta.id"
      class="q-mb-sm"
    >
      <q-card-section>
        <div class="text-subtitle1">{{ pergunta.titulo }}</div>
        <q-list dense>
          <q-item v-for="(alt, idx) in pergunta.alternativas" :key="idx">
            <q-item-section>
              {{ alt }}
              <q-icon
                v-if="alt === pergunta.correta"
                name="check"
                color="green"
                class="q-ml-sm"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions>
        <q-btn flat icon="edit" color="primary" @click="editarPergunta(pergunta)" />
        <q-btn flat icon="delete" color="red" @click="removerPergunta(pergunta.id)" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import QuizService from 'src/services/QuizService'

const perguntas = ref([])

const form = ref({
  titulo: '',
  alternativas: ['', '', '', ''],
  correta: ''
})

const editandoId = ref(null)

const alternativasValidas = computed(() =>
  form.value.alternativas.filter(alt => alt.trim() !== '')
)

const carregarPerguntas = async () => {
  try {
    perguntas.value = await QuizService.getPerguntas()
  } catch (err) {
    console.error('Erro ao carregar perguntas:', err)
    alert('Erro ao carregar perguntas')
  }
}

const salvarPergunta = async () => {
  if (!form.value.titulo.trim()) {
    alert('Informe a pergunta')
    return
  }

  if (alternativasValidas.value.length < 2) {
    alert('Informe pelo menos 2 alternativas')
    return
  }

  if (!form.value.correta || !alternativasValidas.value.includes(form.value.correta)) {
    alert('Escolha uma alternativa correta válida')
    return
  }

  if (!editandoId.value && perguntas.value.length >= 10) {
    alert('Limite de 10 perguntas atingido.')
    return
  }

  const nova = {
    titulo: form.value.titulo.trim(),
    alternativas: [...alternativasValidas.value],
    correta: form.value.correta
  }

  try {
    if (editandoId.value) {
      await QuizService.atualizarPergunta(editandoId.value, nova)
      console.log('Pergunta atualizada!')
    } else {
      await QuizService.adicionarPergunta(nova)
      console.log('Pergunta adicionada!')
    }

    resetForm()
    await carregarPerguntas()
  } catch (err) {
    console.error('Erro ao salvar pergunta:', err)
    alert('Erro ao salvar pergunta')
  }
}

const editarPergunta = (pergunta) => {
  form.value = {
    titulo: pergunta.titulo,
    alternativas: [...pergunta.alternativas],
    correta: pergunta.correta
  }
  editandoId.value = pergunta.id
}

const cancelarEdicao = () => {
  resetForm()
}

const removerPergunta = async (id) => {
  try {
    await QuizService.deletarPergunta(id)
    console.log('Pergunta deletada')
    await carregarPerguntas()
  } catch (err) {
    console.error('Erro ao deletar pergunta:', err)
    alert('Erro ao deletar pergunta')
  }
}

const resetForm = () => {
  form.value = {
    titulo: '',
    alternativas: ['', '', '', ''],
    correta: ''
  }
  editandoId.value = null
}

const sincronizarAlternativas = () => {
  if (!alternativasValidas.value.includes(form.value.correta)) {
    form.value.correta = ''
  }
}

onMounted(() => {
  carregarPerguntas()
})
</script>
