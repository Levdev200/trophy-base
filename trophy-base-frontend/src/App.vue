<template>
  <header>
    <nav>
      <RouterLink to="/">
        Trofeos
      </RouterLink>

      <RouterLink to="/login">
        Iniciar sesión
      </RouterLink>

      <RouterLink to="/registro">
        Registrarse
      </RouterLink>
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
</style>