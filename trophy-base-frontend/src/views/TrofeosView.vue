<script setup>
import { ref, onMounted } from 'vue'

const trofeos = ref([])
const cargando = ref(true)
const trofeoEditando = ref(null)

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

async function eliminarTrofeo(id) {
  const confirmar = confirm('¿Seguro que desea eliminar este trofeo?')

  if (!confirmar) {
    return
  }

  try {
    const respuesta = await fetch(
      `http://localhost:3000/trofeos/${id}`,
      {
        method: 'DELETE',
      },
    )

    if (!respuesta.ok) {
      throw new Error('No se pudo eliminar el trofeo')
    }

    await cargarTrofeos()
  } catch (error) {
    console.error('Error al eliminar el trofeo:', error)
  }
}

function editarTrofeo(trofeo) {
  trofeoEditando.value = { ...trofeo }
}

function cancelarEdicion() {
  trofeoEditando.value = null
}

async function guardarEdicion() {
  try {
    const respuesta = await fetch(
      `http://localhost:3000/trofeos/${trofeoEditando.value.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: trofeoEditando.value.nombre,
          juego: trofeoEditando.value.juego,
          dificultad: trofeoEditando.value.dificultad,
          requisito: trofeoEditando.value.requisito,
          estado: trofeoEditando.value.estado,
          imagen: trofeoEditando.value.imagen,
        }),
      },
    )

    if (!respuesta.ok) {
      throw new Error('No se pudo editar el trofeo')
    }

    trofeoEditando.value = null

    await cargarTrofeos()
  } catch (error) {
    console.error('Error al editar el trofeo:', error)
  }
}

onMounted(() => {
  cargarTrofeos()
})
</script>

<template>
  <main>
    <h1>Trophy Base</h1>

    <!-- CREAR TROFEO -->
    <section>
      <h2>Agregar trofeo</h2>

      <form @submit.prevent="crearTrofeo">
        <div>
          <label>Nombre:</label>
          <input
            v-model="nuevoTrofeo.nombre"
            type="text"
            required
          />
        </div>

        <div>
          <label>Juego:</label>
          <input
            v-model="nuevoTrofeo.juego"
            type="text"
            required
          />
        </div>

        <div>
          <label>Dificultad:</label>
          <input
            v-model="nuevoTrofeo.dificultad"
            type="text"
            required
          />
        </div>

        <div>
          <label>Requisito:</label>
          <input
            v-model="nuevoTrofeo.requisito"
            type="text"
            required
          />
        </div>

        <div>
          <label>URL de imagen:</label>
          <input
            v-model="nuevoTrofeo.imagen"
            type="text"
            required
          />
        </div>

        <div>
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

    <!-- EDITAR TROFEO -->
    <section v-if="trofeoEditando">
      <h2>Editar trofeo</h2>

      <form @submit.prevent="guardarEdicion">
        <div>
          <label>Nombre:</label>
          <input
            v-model="trofeoEditando.nombre"
            type="text"
            required
          />
        </div>

        <div>
          <label>Juego:</label>
          <input
            v-model="trofeoEditando.juego"
            type="text"
            required
          />
        </div>

        <div>
          <label>Dificultad:</label>
          <input
            v-model="trofeoEditando.dificultad"
            type="text"
            required
          />
        </div>

        <div>
          <label>Requisito:</label>
          <input
            v-model="trofeoEditando.requisito"
            type="text"
            required
          />
        </div>

        <div>
          <label>URL de imagen:</label>
          <input
            v-model="trofeoEditando.imagen"
            type="text"
            required
          />
        </div>

        <div>
          <label>
            <input
              v-model="trofeoEditando.estado"
              type="checkbox"
            />
            Conseguido
          </label>
        </div>

        <button type="submit">
          Guardar cambios
        </button>

        <button
          type="button"
          @click="cancelarEdicion"
        >
          Cancelar
        </button>
      </form>
    </section>

    <hr v-if="trofeoEditando" />

    <!-- LISTA DE TROFEOS -->
    <section>
      <h2>Trofeos</h2>

      <p v-if="cargando">
        Cargando trofeos...
      </p>

      <p v-else-if="trofeos.length === 0">
        No hay trofeos registrados.
      </p>

      <div v-else>
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

          <button @click="editarTrofeo(trofeo)">
            Editar
          </button>

          <button @click="eliminarTrofeo(trofeo.id)">
            Eliminar
          </button>

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
  box-sizing: border-box;
}

button {
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
}

img {
  width: 150px;
  max-width: 100%;
}

.trofeo {
  margin-bottom: 20px;
}
</style>