<script setup lang="ts">
import { ref, computed } from 'vue'
import releases from '@/assets/json/releases.json'

interface HitBase {
  kind: 'modular' | 'hardcoded'
  title: string
  author?: string
  description?: string
  tags?: string[]
  platforms?: string[]
  route: string
}

// Hardcoded pages indexées (ajoutez les vôtres ici)
const hardcoded: HitBase[] = [
  {
    kind: 'hardcoded',
    title: 'Hardcoded Example',
    author: 'Ecxo Games',
    description: 'Une page hardcodée d’exemple avec mise en page libre.',
    tags: ['example', 'hardcoded'],
    platforms: ['Windows', 'macOS', 'Linux'],
    route: '/release/example'
  }
]

// Aplatissement des releases JSON
function flattenModular(): HitBase[] {
  const buckets = [releases?.featured ?? [], releases?.ecxogames_exclusive ?? [], releases?.all ?? []]
  const seen = new Set<string>()
  const out: HitBase[] = []
  for (const bucket of buckets) {
    for (const r of bucket as any[]) {
      const slug: string | undefined = r?.slug
      if (!slug || seen.has(slug)) continue
      seen.add(slug)
      out.push({
        kind: 'modular',
        title: r.title,
        author: r.author,
        description: r.description,
        tags: r.tags,
        platforms: r.platforms,
        route: `/r/${slug}`,
      })
    }
  }
  return out
}

const modular = computed(() => flattenModular())

const q = ref('')

const results = computed(() => {
  const terms = q.value.trim().toLowerCase()
  const data = [...modular.value, ...hardcoded]
  if (!terms) return data
  const hit = (h: HitBase) => {
    const hay = [h.title, h.author, h.description, ...(h.tags ?? []), ...(h.platforms ?? [])]
      .filter(Boolean)
      .join(' ') // string
      .toLowerCase()
    return hay.includes(terms)
  }
  return data.filter(hit)
})
</script>

<template>
  <section class="space-y-6">
    <div class="max-w-2xl">
      <label class="block text-sm font-medium text-gray-700 mb-1">Rechercher une release</label>
      <input
        v-model="q"
        type="search"
        placeholder="Nom, tag, plateforme, auteur…"
        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="text-sm text-gray-500">{{ results.length }} résultat(s)</div>

    <ul class="divide-y divide-gray-200 bg-white rounded-md border border-gray-200">
      <li v-for="r in results" :key="r.route" class="p-4 flex items-start gap-3">
        <span class="mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              :class="r.kind === 'modular' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-100 text-gray-700 border border-gray-200'">
          {{ r.kind === 'modular' ? 'Modular' : 'Hardcoded' }}
        </span>
        <div class="flex-1 min-w-0">
          <RouterLink :to="r.route" class="block font-medium text-gray-900 hover:text-blue-700">{{ r.title }}</RouterLink>
          <p v-if="r.description" class="text-sm text-gray-600 line-clamp-2">{{ r.description }}</p>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="t in (r.tags || [])" :key="t" class="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium border border-blue-100">{{ t }}</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>

</style>