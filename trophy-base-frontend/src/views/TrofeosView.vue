<script setup>
import { ref, onMounted } from 'vue'

const trofeos = ref([])
const cargando = ref(true)

async function cargarTrofeos() {
  try {
    const respuesta = await fetch('http://localhost:3000/trofeos')
    trofeos.value = await respuesta.json()
  } catch (error) {
    console.error('Error al cargar los trofeos:', error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  cargarTrofeos()
})
</script>

<template>
  <main>
    <h1>Trophy Base</h1>
    <h2>Trofeos</h2>

    <p v-if="cargando">Cargando trofeos...</p>

    <p v-else-if="trofeos.length === 0">
      No hay trofeos registrados.
    </p>

    <div v-else>
      <div v-for="trofeo in trofeos" :key="trofeo.id">
        <h3>{{ trofeo.nombre }}</h3>

        <img
          :src="trofeo.imagen"
          :alt="trofeo.nombre"
          width="150"
        />

        <p><strong>Juego:</strong> {{ trofeo.juego }}</p>
        <p><strong>Dificultad:</strong> {{ trofeo.dificultad }}</p>
        <p><strong>Requisito:</strong> {{ trofeo.requisito }}</p>
        <p>
          <strong>Estado:</strong>
          {{ trofeo.estado ? 'Conseguido' : 'Pendiente' }}
        </p>

        <hr />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

img {
  max-width: 150px;
}
</style>