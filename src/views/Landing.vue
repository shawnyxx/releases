<script setup lang="ts">
import releases from '@/assets/json/releases.json'
import { computed } from 'vue'

interface SectionText { type: 'text'; content: string }
interface SectionImage { type: 'image'; url: string; caption?: string }
interface SectionList { type: 'list'; items: string[] }
interface ReleaseContent {
  header?: { title?: string; subtitle?: string; image?: string }
  body?: { sections?: Array<SectionText | SectionImage | SectionList> }
  footer?: { text?: string; links?: Array<{ label: string; url: string }> }
}
interface ModularRelease {
  title: string
  slug: string
  author?: string
  description?: string
  image?: string
  content?: ReleaseContent
  releaseDate?: string
  version?: string
  downloadLink?: string
  tags?: string[]
  platforms?: string[]
}

const featured = computed<ModularRelease[]>(() => (releases?.featured ?? []) as ModularRelease[])
</script>

<template>
  <section class="space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">Téléchargements en vedette</h1>
      <p class="text-gray-600">Découvrez les releases sélectionnées par l’équipe Ecxo.</p>
    </div>

    <div v-if="!featured.length" class="text-center text-gray-500">Aucune release en vedette pour le moment.</div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="r in featured" :key="r.slug" class="group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div v-if="r.image" class="aspect-video bg-gray-100 overflow-hidden">
          <img :src="r.image" :alt="r.title" class="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
        </div>
        <div class="p-4 space-y-3">
          <div class="space-y-1">
            <h2 class="text-lg font-semibold">{{ r.title }}</h2>
            <p v-if="r.author" class="text-sm text-gray-500">par {{ r.author }}</p>
          </div>
          <p v-if="r.description" class="text-sm text-gray-700 line-clamp-3">{{ r.description }}</p>
          <div class="flex flex-wrap gap-2 pt-1">
            <span v-for="t in (r.tags || [])" :key="t" class="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium border border-blue-100">{{ t }}</span>
          </div>
          <div class="flex items-center justify-between pt-2">
            <RouterLink :to="`/r/${r.slug}`" class="text-blue-600 hover:text-blue-700 font-medium text-sm">Détails</RouterLink>
            <a v-if="r.downloadLink" :href="r.downloadLink" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700">
              Télécharger
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>

</style>