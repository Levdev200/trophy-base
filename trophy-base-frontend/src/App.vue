<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const sesionIniciada = ref(!!localStorage.getItem('token'))

watch(
  () => route.path,
  () => {
    sesionIniciada.value = !!localStorage.getItem('token')
  },
)

function cerrarSesion() {
  localStorage.removeItem('token')
  sesionIniciada.value = false
  router.push('/login')
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        Trofeos
      </RouterLink>

      <template v-if="sesionIniciada">
        <RouterLink to="/gestion">
          Gestionar
        </RouterLink>

        <button @click="cerrarSesion">
          Cerrar sesión
        </button>
      </template>

      <template v-else>
        <RouterLink to="/login">
          Iniciar sesión
        </RouterLink>

        <RouterLink to="/registro">
          Registrarse
        </RouterLink>
      </template>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  padding: 20px;
  font-family: Arial, sans-serif;
}

nav a {
  margin-right: 15px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>