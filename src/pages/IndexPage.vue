<template>
  <q-page class="flex flex-center">
    <div class="tabuleiro">
      <div class="titulo">Jogo da velha</div>
      <div class="linha" v-for="(linha, indiceLinha) in tabuleiro" :key="indiceLinha">
        <div
          class="celula"
          v-for="(celula, indiceColuna) in linha"
          :key="indiceColuna"
          @click="fazerJogada(indiceLinha, indiceColuna)"
        >
          {{ celula }}
        </div>
      </div>
      <div class="btnReiniciar">
        <q-btn
          label="Reiniciar Jogo"
          color="primary"
         @click="reiniciarJogo"
        />
      </div>
      <div class="ganhador">
      ganhador: {{ ganhadorAtual }}
    </div>
    </div>


  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';

const tabuleiro = ref([
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
]);

const jogadorAtual = ref('X');
const jogoAtivo = ref(true);



const ganhadorAtual = computed(() => {
  if (jogoAtivo.value) {
    return null;
  }
  return jogadorAtual.value === 'X' ? 'O' : 'X';
});

const verificarVencedor = () => {
  const tamanho = tabuleiro.value.length;

  // Verificar linhas e colunas
  for (let i = 0; i < tamanho; i++) {
    // Verificar linha
    if (
      tabuleiro.value[i][0] &&
      tabuleiro.value[i].every(celula => celula === tabuleiro.value[i][0])
    ) {
      alert(`Jogador ${tabuleiro.value[i][0]} venceu!`);
      jogoAtivo.value = false;
      return;
    }

    // Verificar coluna
    if (
      tabuleiro.value[0][i] &&
      tabuleiro.value.every(linha => linha[i] === tabuleiro.value[0][i])
    ) {
      alert(`Jogador ${tabuleiro.value[0][i]} venceu!`);
      jogoAtivo.value = false;
      return;
    }
  }

  // Verificar diagonal principal
  if (
    tabuleiro.value[0][0] &&
    tabuleiro.value.every((linha, index) => linha[index] === tabuleiro.value[0][0])
  ) {
    alert(`Jogador ${tabuleiro.value[0][0]} venceu!`);
    jogoAtivo.value = false;
    return;
  }

  // Verificar diagonal secundária
  if (
    tabuleiro.value[0][tamanho - 1] &&
    tabuleiro.value.every((linha, index) => linha[tamanho - 1 - index] === tabuleiro.value[0][tamanho - 1])
  ) {
    alert(`Jogador ${tabuleiro.value[0][tamanho - 1]} venceu!`);
    jogoAtivo.value = false;
    return;
  }

  // Verificar empate
  if (tabuleiro.value.flat().every(celula => celula !== '')) {
    alert('O jogo terminou empatado!');
    jogoAtivo.value = false;
  }
};

const reiniciarJogo = () => {
  tabuleiro.value = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
  jogadorAtual.value = 'X';
  jogoAtivo.value = true;
}

const fazerJogada = (linha, coluna) => {
  if (jogoAtivo.value && tabuleiro.value[linha][coluna] === '') {
    tabuleiro.value[linha][coluna] = jogadorAtual.value;
    verificarVencedor();
    jogadorAtual.value = jogadorAtual.value === 'X' ? 'O' : 'X';
  }
}


</script>

<style scoped>
.tabuleiro {
  display: grid;
  flex-direction: column;
  gap: 5px;
}

.linha {
  display: flex;
  gap: 5px;
}

.celula {
  width: 150px;
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 100px;
  font-weight: bold;
}
.titulo {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  color:blueviolet ;
}
.btnReiniciar {
  margin-top: 20px;
  text-align: center;
}
.ganhador {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
</style>