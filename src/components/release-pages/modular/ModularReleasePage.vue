<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import releases from '@/assets/json/releases.json'

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

const route = useRoute()

function findRelease(slug: string): ModularRelease | undefined {
  const buckets = [releases?.featured ?? [], releases?.ecxogames_exclusive ?? [], releases?.all ?? []]
  for (const bucket of buckets) {
    const found = (bucket as any[]).find(r => r?.slug === slug)
    if (found) return found as ModularRelease
  }
}

const current = computed(() => findRelease(route.params.slug as string))
</script>

<template>
  <div v-if="!current" class="text-center py-20">
    <h1 class="text-2xl font-bold mb-2">Release introuvable</h1>
    <p class="text-gray-600">Vérifiez le lien ou parcourez les releases depuis la recherche.</p>
  </div>
  <div v-else class="space-y-8">
    <header class="rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div v-if="current.content?.header?.image" class="aspect-[21/9] bg-gray-100 overflow-hidden">
        <img :src="current.content?.header?.image" :alt="current.title" class="w-full h-full object-cover" />
      </div>
      <div class="p-6 space-y-2">
        <h1 class="text-2xl sm:text-3xl font-bold">{{ current.content?.header?.title || current.title }}</h1>
        <p v-if="current.content?.header?.subtitle" class="text-gray-600">{{ current.content?.header?.subtitle }}</p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span v-for="t in (current.tags || [])" :key="t" class="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium border border-blue-100">{{ t }}</span>
        </div>
        <div class="pt-4 flex items-center gap-3">
          <a v-if="current.downloadLink" :href="current.downloadLink" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">Télécharger</a>
          <span v-if="current.version" class="text-sm text-gray-600">Version {{ current.version }}</span>
          <span v-if="current.releaseDate" class="text-sm text-gray-600">Publié le {{ current.releaseDate }}</span>
        </div>
      </div>
    </header>

    <section v-if="current.content?.body?.sections?.length" class="space-y-6">
      <div v-for="(s, idx) in current.content?.body?.sections" :key="idx" class="rounded-lg border border-gray-200 bg-white p-5">
        <p v-if="s.type === 'text'" class="text-gray-800 whitespace-pre-line">{{ (s as any).content }}</p>
        <figure v-else-if="s.type === 'image'" class="space-y-2">
          <img :src="(s as any).url" class="w-full rounded-md border border-gray-200" />
          <figcaption v-if="(s as any).caption" class="text-sm text-gray-500">{{ (s as any).caption }}</figcaption>
        </figure>
        <ul v-else-if="s.type === 'list'" class="list-disc list-inside text-gray-800">
          <li v-for="(it, i) in (s as any).items" :key="i">{{ it }}</li>
        </ul>
        <div v-else class="text-sm text-gray-500">Section non prise en charge.</div>
      </div>
    </section>

    <footer v-if="current.content?.footer" class="rounded-lg border border-gray-200 bg-white p-5 space-y-2">
      <p v-if="current.content?.footer?.text" class="text-gray-700">{{ current.content?.footer?.text }}</p>
      <div class="flex flex-wrap gap-3">
        <a v-for="l in (current.content?.footer?.links || [])" :key="l.url" :href="l.url" target="_blank" rel="noreferrer" class="text-blue-600 hover:text-blue-700 text-sm font-medium">{{ l.label }}</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>