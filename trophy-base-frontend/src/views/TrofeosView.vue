<script setup>
import { ref, onMounted } from 'vue'

const trofeos = ref([])
const cargando = ref(true)

const nuevoTrofeo = ref({
  nombre: '',
  juego: '',
  dificultad: '',
  requisito: '',
  estado: false,
  imagen: '',
})

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

async function crearTrofeo() {
  try {
    const respuesta = await fetch('http://localhost:3000/trofeos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoTrofeo.value),
    })

    if (!respuesta.ok) {
      throw new Error('No se pudo crear el trofeo')
    }

    nuevoTrofeo.value = {
      nombre: '',
      juego: '',
      dificultad: '',
      requisito: '',
      estado: false,
      imagen: '',
    }

    await cargarTrofeos()
  } catch (error) {
    console.error('Error al crear el trofeo:', error)
  }
}

onMounted(() => {
  cargarTrofeos()
})
</script>

<template>
  <main>
    <h1>Trophy Base</h1>

    <section>
      <h2>Agregar trofeo</h2>

      <form @submit.prevent="crearTrofeo">
        <div>
          <label>Nombre:</label>
          <input v-model="nuevoTrofeo.nombre" type="text" required />
        </div>

        <div>
          <label>Juego:</label>
          <input v-model="nuevoTrofeo.juego" type="text" required />
        </div>

        <div>
          <label>Dificultad:</label>
          <input v-model="nuevoTrofeo.dificultad" type="text" required />
        </div>

        <div>
          <label>Requisito:</label>
          <input v-model="nuevoTrofeo.requisito" type="text" required />
        </div>

        <div>
          <label>URL de imagen:</label>
          <input v-model="nuevoTrofeo.imagen" type="text" required />
        </div>

        <div>
          <label>
            <input v-model="nuevoTrofeo.estado" type="checkbox" />
            Conseguido
          </label>
        </div>

        <button type="submit">Agregar trofeo</button>
      </form>
    </section>

    <hr />

    <section>
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
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

form {
  max-width: 500px;
}

form div {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input[type='text'] {
  width: 100%;
  padding: 8px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

img {
  max-width: 150px;
}
</style>