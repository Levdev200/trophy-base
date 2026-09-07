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

    if (!respuesta.ok) {
      throw new Error('No se pudieron cargar los trofeos')
    }

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

async function eliminarTrofeo(id) {
  const confirmar = confirm('¿Seguro que desea eliminar este trofeo?')

  if (!confirmar) {
    return
  }

  try {
    const respuesta = await fetch(`http://localhost:3000/trofeos/${id}`, {
      method: 'DELETE',
    })

    if (!respuesta.ok) {
      throw new Error('No se pudo eliminar el trofeo')
    }

    await cargarTrofeos()
  } catch (error) {
    console.error('Error al eliminar el trofeo:', error)
  }
}

onMounted(() => {
  cargarTrofeos()
})
</script>

<template>
  <main>
    <h1>Trophy Base</h1>

    <section class="formulario">
      <h2>Agregar trofeo</h2>

      <form @submit.prevent="crearTrofeo">
        <div>
          <label for="nombre">Nombre:</label>
          <input
            id="nombre"
            v-model="nuevoTrofeo.nombre"
            type="text"
            required
          />
        </div>

        <div>
          <label for="juego">Juego:</label>
          <input
            id="juego"
            v-model="nuevoTrofeo.juego"
            type="text"
            required
          />
        </div>

        <div>
          <label for="dificultad">Dificultad:</label>
          <input
            id="dificultad"
            v-model="nuevoTrofeo.dificultad"
            type="text"
            required
          />
        </div>

        <div>
          <label for="requisito">Requisito:</label>
          <input
            id="requisito"
            v-model="nuevoTrofeo.requisito"
            type="text"
            required
          />
        </div>

        <div>
          <label for="imagen">URL de imagen:</label>
          <input
            id="imagen"
            v-model="nuevoTrofeo.imagen"
            type="text"
            required
          />
        </div>

        <div class="checkbox">
          <label>
            <input
              v-model="nuevoTrofeo.estado"
              type="checkbox"
            />
            Conseguido
          </label>
        </div>

        <button type="submit">
          Agregar trofeo
        </button>
      </form>
    </section>

    <hr />

    <section>
      <h2>Trofeos</h2>

      <p v-if="cargando">
        Cargando trofeos...
      </p>

      <p v-else-if="trofeos.length === 0">
        No hay trofeos registrados.
      </p>

      <div v-else class="lista-trofeos">
        <div
          v-for="trofeo in trofeos"
          :key="trofeo.id"
          class="trofeo"
        >
          <h3>{{ trofeo.nombre }}</h3>

          <img
            :src="trofeo.imagen"
            :alt="trofeo.nombre"
          />

          <p>
            <strong>Juego:</strong>
            {{ trofeo.juego }}
          </p>

          <p>
            <strong>Dificultad:</strong>
            {{ trofeo.dificultad }}
          </p>

          <p>
            <strong>Requisito:</strong>
            {{ trofeo.requisito }}
          </p>

          <p>
            <strong>Estado:</strong>
            {{ trofeo.estado ? 'Conseguido' : 'Pendiente' }}
          </p>

          <button
            class="eliminar"
            @click="eliminarTrofeo(trofeo.id)"
          >
            Eliminar
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

.formulario {
  margin-bottom: 30px;
}

form {
  max-width: 500px;
}

form div {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.checkbox label {
  display: flex;
  gap: 8px;
  align-items: center;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

.lista-trofeos {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.trofeo {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

.trofeo img {
  width: 150px;
  max-height: 150px;
  object-fit: cover;
}

.eliminar {
  margin-top: 10px;
}
</style>