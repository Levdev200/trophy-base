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
  <header class="barra">
    <nav class="navegacion">
      <RouterLink class="logo" to="/">
        🏆 Trophy Base
      </RouterLink>

      <div class="enlaces">
        <RouterLink to="/">
          Trofeos
        </RouterLink>

        <template v-if="sesionIniciada">
          <RouterLink to="/gestion">
            Gestionar
          </RouterLink>

          <button class="boton-sesion" @click="cerrarSesion">
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
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f3f4f7;
  color: #1f2937;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none;
}
</style>

<style scoped>
.barra {
  background: #141c2f;
  border-bottom: 3px solid #d9a928;
}

.navegacion {
  max-width: 1100px;
  margin: auto;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: white;
  font-size: 21px;
  font-weight: bold;
}

.enlaces {
  display: flex;
  align-items: center;
  gap: 20px;
}

.enlaces a {
  color: #e5e7eb;
  font-weight: 500;
}

.enlaces a:hover {
  color: #f4c542;
}

.boton-sesion {
  border: none;
  background: #d9a928;
  color: #141c2f;
  font-weight: bold;
  padding: 9px 14px;
  border-radius: 7px;
  cursor: pointer;
}

.boton-sesion:hover {
  background: #f4c542;
}

@media (max-width: 650px) {
  .navegacion {
    flex-direction: column;
    gap: 15px;
  }

  .enlaces {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>