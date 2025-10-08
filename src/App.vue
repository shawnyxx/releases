<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="border-b border-gray-200 bg-white/70 backdrop-blur">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold text-gray-900">
          <span class="h-8 w-8 rounded-md bg-blue-600 text-white grid place-items-center">ER</span>
          <span>Ecxo Releases</span>
        </RouterLink>
        <nav class="flex items-center gap-1">
          <RouterLink to="/" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Accueil</RouterLink>
          <RouterLink to="/search" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Recherche</RouterLink>
          <RouterLink to="/creator" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Créateur</RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>

    <footer class="mt-8 border-t border-gray-200 bg-white/70">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex items-center justify-between">
        <span>© {{ new Date().getFullYear() }} Ecxo Games</span>
        <a href="https://ecxogames.ca/" target="_blank" rel="noreferrer" class="text-blue-600 hover:text-blue-700">ecxogames.ca</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>
