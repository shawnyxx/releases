<script setup lang="ts">
const downloadUrl = 'https://example.com/download'
</script>

<template>
  <article class="space-y-8">
    <header class="rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div class="aspect-[21/9] bg-gradient-to-r from-blue-600 to-blue-400"></div>
      <div class="p-6">
        <h1 class="text-3xl font-bold">Hardcoded Release Example</h1>
        <p class="text-gray-600">Une page conçue à la main, idéale pour les releases nécessitant une présentation sur mesure.</p>
        <div class="mt-4 flex items-center gap-3">
          <a :href="downloadUrl" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">Télécharger</a>
          <span class="text-sm text-gray-600">Compatible: Windows, macOS, Linux</span>
        </div>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-3">
        <h2 class="text-lg font-semibold">À propos</h2>
        <p class="text-gray-700">Cette page démontre comment une release peut être entièrement personnalisée avec un contenu riche, des visuels et une structure propre à vos besoins marketing.</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-3">
        <h2 class="text-lg font-semibold">Fonctionnalités clés</h2>
        <ul class="list-disc list-inside text-gray-800">
          <li>Disposition libre</li>
          <li>Styles dédiés</li>
          <li>Storytelling orienté produit</li>
        </ul>
      </div>
    </section>
  </article>
</template>

<style scoped>

</style>