<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { trofeosService } from '../services/trofeosService'

const trofeos = ref([])
const cargando = ref(true)
const trofeoEditando = ref(null)
const router = useRouter()
const errorMsg = ref('')

const estaAutenticado = computed(() => !!localStorage.getItem('token'))

// Búsqueda
const busqueda = ref('')

// Paginación
const paginaActual = ref(1)
const porPagina = 4

const nuevoTrofeo = ref({
  nombre: '',
  juego: '',
  dificultad: '',
  requisito: '',
  estado: false,
  imagen: '',
})

// Filtra los trofeos por nombre
const trofeosFiltrados = computed(() => {
  return trofeos.value.filter((trofeo) =>
    trofeo.nombre
      .toLowerCase()
      .includes(busqueda.value.toLowerCase()),
  )
})

// Calcula cuántas páginas hay
const totalPaginas = computed(() => {
  return Math.ceil(trofeosFiltrados.value.length / porPagina)
})

// Devuelve solamente los trofeos de la página actual
const trofeosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  const fin = inicio + porPagina

  return trofeosFiltrados.value.slice(inicio, fin)
})

function reiniciarPagina() {
  paginaActual.value = 1
}

function paginaAnterior() {
  if (paginaActual.value > 1) {
    paginaActual.value--
  }
}

function paginaSiguiente() {
  if (paginaActual.value < totalPaginas.value) {
    paginaActual.value++
  }
}

async function cargarTrofeos() {
  try {
    const respuesta = await trofeosService.getAll()
    trofeos.value = respuesta.data
  } catch (error) {
    errorMsg.value = error.message || 'Error al cargar los trofeos'
  } finally {
    cargando.value = false
  }
}

async function crearTrofeo() {
  try {
    await trofeosService.create(nuevoTrofeo.value)
    nuevoTrofeo.value = { nombre: '', juego: '', dificultad: '', requisito: '', estado: false, imagen: '' }
    paginaActual.value = 1

    await cargarTrofeos()
  } catch (error) {
    errorMsg.value = error.message || 'No se pudo crear el trofeo. ¿Iniciaste sesión?'
  }
}

async function eliminarTrofeo(id) {
  if (!confirm('¿Seguro que desea eliminar este trofeo?')) return
  errorMsg.value = ''
  try {
    await trofeosService.remove(id)
    paginaActual.value = 1
    await cargarTrofeos()
  } catch (error) {
    errorMsg.value = error.message || 'No se pudo eliminar. ¿Iniciaste sesión?'
  }
}

function editarTrofeo(trofeo) {
  trofeoEditando.value = { ...trofeo }
}

function cancelarEdicion() {
  trofeoEditando.value = null
}

async function guardarEdicion() {
  errorMsg.value = ''
  try {
    await trofeosService.update(trofeoEditando.value.id, {
      nombre: trofeoEditando.value.nombre,
      juego: trofeoEditando.value.juego,
      dificultad: trofeoEditando.value.dificultad,
      requisito: trofeoEditando.value.requisito,
      estado: trofeoEditando.value.estado,
      imagen: trofeoEditando.value.imagen,
    })
    trofeoEditando.value = null
    await cargarTrofeos()
  } catch (error) {
    errorMsg.value = error.message || 'No se pudo editar. ¿Iniciaste sesión?'
  }
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  cargarTrofeos()
})
</script>
<template>
  <main>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>Trophy Base</h1>
      <button v-if="estaAutenticado" @click="logout">🚪 Cerrar sesión</button>
    </div>

    <!-- Mensaje de error global -->
    <p v-if="errorMsg" style="color: red; margin-bottom: 12px;">{{ errorMsg }}</p>

    <!-- CREAR TROFEO -->
    <section v-if="estaAutenticado">
      <h2>Agregar trofeo</h2>
      <form @submit.prevent="crearTrofeo">
        <div><label>Nombre:</label><input v-model="nuevoTrofeo.nombre" type="text" required /></div>
        <div><label>Juego:</label><input v-model="nuevoTrofeo.juego" type="text" required /></div>
        <div><label>Dificultad:</label><input v-model="nuevoTrofeo.dificultad" type="text" required /></div>
        <div><label>Requisito:</label><input v-model="nuevoTrofeo.requisito" type="text" required /></div>
        <div><label>URL de imagen:</label><input v-model="nuevoTrofeo.imagen" type="text" required /></div>
        <div><label><input v-model="nuevoTrofeo.estado" type="checkbox" /> Conseguido</label></div>
        <button type="submit">Agregar trofeo</button>
      </form>
    </section>

    <p v-else>
      <RouterLink to="/login">Inicia sesión</RouterLink> para agregar, editar o eliminar trofeos.
    </p>

    <hr />

    <!-- EDITAR TROFEO -->
    <section v-if="trofeoEditando">
      <h2>Editar trofeo</h2>
      <form @submit.prevent="guardarEdicion">
        <div><label>Nombre:</label><input v-model="trofeoEditando.nombre" type="text" required /></div>
        <div><label>Juego:</label><input v-model="trofeoEditando.juego" type="text" required /></div>
        <div><label>Dificultad:</label><input v-model="trofeoEditando.dificultad" type="text" required /></div>
        <div><label>Requisito:</label><input v-model="trofeoEditando.requisito" type="text" required /></div>
        <div><label>URL de imagen:</label><input v-model="trofeoEditando.imagen" type="text" required /></div>
        <div><label><input v-model="trofeoEditando.estado" type="checkbox" /> Conseguido</label></div>
        <button type="submit">Guardar cambios</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </section>

    <hr v-if="trofeoEditando" />

    <!-- LISTA -->
    <section>
      <h2>Trofeos</h2>
      <div class="buscador">
        <label>Buscar por nombre:</label>
        <input v-model="busqueda" @input="reiniciarPagina" type="text" placeholder="Buscar trofeo..." />
      </div>

      <p v-if="cargando">Cargando trofeos...</p>
      <p v-else-if="trofeos.length === 0">No hay trofeos registrados.</p>
      <p v-else-if="trofeosFiltrados.length === 0">No se encontraron trofeos con ese nombre.</p>

      <div v-else>
        <div v-for="trofeo in trofeosPaginados" :key="trofeo.id" class="trofeo">
          <h3>{{ trofeo.nombre }}</h3>
          <img :src="trofeo.imagen" :alt="trofeo.nombre" />
          <p><strong>Juego:</strong> {{ trofeo.juego }}</p>
          <p><strong>Dificultad:</strong> {{ trofeo.dificultad }}</p>
          <p><strong>Requisito:</strong> {{ trofeo.requisito }}</p>
          <p><strong>Estado:</strong> {{ trofeo.estado ? 'Conseguido' : 'Pendiente' }}</p>
          
          <template v-if="estaAutenticado">
            <button @click="editarTrofeo(trofeo)">Editar</button>
            <button @click="eliminarTrofeo(trofeo.id)">Eliminar</button>
          </template>

          <hr />
        </div>

        <div v-if="totalPaginas > 1" class="paginacion">
          <button @click="paginaAnterior" :disabled="paginaActual === 1">Anterior</button>
          <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
          <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas">Siguiente</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main { max-width: 900px; margin: 40px auto; font-family: Arial, sans-serif; }
form { max-width: 500px; }
form div { margin-bottom: 12px; }
label { display: block; margin-bottom: 4px; }
input[type='text'] { width: 100%; padding: 8px; box-sizing: border-box; }
button { padding: 8px 16px; margin-right: 8px; cursor: pointer; }
button:disabled { cursor: not-allowed; }
img { width: 150px; max-width: 100%; }
.trofeo { margin-bottom: 20px; }
.buscador { max-width: 500px; margin-bottom: 25px; }
.paginacion { margin-top: 20px; margin-bottom: 30px; }
.paginacion span { margin-right: 8px; }
</style>