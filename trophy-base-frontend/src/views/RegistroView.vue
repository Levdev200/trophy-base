<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const mensaje = ref('')
const error = ref('')

async function registrar() {
  mensaje.value = ''
  error.value = ''

  try {
    const respuesta = await fetch('http://localhost:3000/auth/register', {
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
      error.value = datos.message || 'No se pudo registrar el usuario'
      return
    }

    mensaje.value = 'Usuario registrado correctamente'

    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch {
    error.value = 'Error al conectar con el servidor'
  }
}
</script>

<template>
  <main>
    <h1>Registrarse</h1>

    <form @submit.prevent="registrar">
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
        Registrarse
      </button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="exito" style="color: green">{{ exito }}</p>

    <RouterLink to="/login">
      Ya tengo una cuenta
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