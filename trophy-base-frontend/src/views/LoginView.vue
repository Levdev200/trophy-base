<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

async function iniciarSesion() {
  error.value = ''

  try {
    const respuesta = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      error.value = datos.message || 'Correo o contraseña incorrectos'
      return
    }

    localStorage.setItem('token', datos.access_token)

    router.push('/')
  } catch {
    error.value = 'Error al conectar con el servidor'
  }
}
</script>

<template>
  <main>
    <h1>Iniciar sesión</h1>

    <form @submit.prevent="iniciarSesion">
      <div>
        <label>Correo:</label>
        <input
          v-model="email"
          type="email"
          required
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          v-model="password"
          type="password"
          required
        />
      </div>

      <button type="submit">
        Iniciar sesión
      </button>
    </form>

    <p v-if="error">
      {{ error }}
    </p>

    <RouterLink to="/registro">
      Crear una cuenta
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  max-width: 500px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

form div {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 8px 16px;
  margin-bottom: 15px;
  cursor: pointer;
}
</style>