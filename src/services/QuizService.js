import { db } from 'src/firebase/firebase'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const quizCollection = collection(db, 'quiz')

export default {
  async getPerguntas() {
    const snapshot = await getDocs(quizCollection)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async adicionarPergunta(pergunta) {
    return await addDoc(quizCollection, pergunta)
  },

  async atualizarPergunta(id, pergunta) {
    const perguntaRef = doc(db, 'quiz', id)
    return await updateDoc(perguntaRef, pergunta)
  },

  async deletarPergunta(id) {
    return await deleteDoc(doc(db, 'quiz', id))
  }
}
