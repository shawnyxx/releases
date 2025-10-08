<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Modèle de release modulaire
const form = reactive({
  title: '',
  slug: '',
  author: '',
  description: '',
  image: '',
  headerTitle: '',
  headerSubtitle: '',
  headerImage: '',
  sections: [] as Array<{ type: 'text' | 'image' | 'list'; content?: string; url?: string; caption?: string; items?: string; }>,
  footerText: '',
  footerLinks: '' as string, // format: Label|https://url\nLabel2|https://...
  releaseDate: '',
  version: '',
  downloadLink: '',
  tags: '' as string, // virgules
  platforms: '' as string, // virgules
})

function addSection(kind: 'text' | 'image' | 'list') {
  if (kind === 'text') form.sections.push({ type: 'text', content: '' })
  if (kind === 'image') form.sections.push({ type: 'image', url: '', caption: '' })
  if (kind === 'list') form.sections.push({ type: 'list', items: '' })
}
function removeSection(i: number) { form.sections.splice(i, 1) }

const jsonObject = computed(() => {
  const tags = form.tags.split(',').map(s => s.trim()).filter(Boolean)
  const platforms = form.platforms.split(',').map(s => s.trim()).filter(Boolean)
  const links = form.footerLinks.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
    const [label, url] = line.split('|').map(s => s.trim())
    return label && url ? { label, url } : null
  }).filter(Boolean) as Array<{ label: string; url: string }>

  const sections = form.sections.map(s => {
    if (s.type === 'text') return { type: 'text', content: s.content || '' }
    if (s.type === 'image') return { type: 'image', url: s.url || '', caption: s.caption || '' }
    if (s.type === 'list') return { type: 'list', items: (s.items || '').split('\n').map(i => i.trim()).filter(Boolean) }
    return null
  }).filter(Boolean)

  const slug = form.slug || slugify(form.title)

  return {
    title: form.title,
    slug,
    author: form.author || undefined,
    description: form.description || undefined,
    image: form.image || undefined,
    content: {
      header: {
        title: form.headerTitle || undefined,
        subtitle: form.headerSubtitle || undefined,
        image: form.headerImage || undefined,
      },
      body: {
        sections: sections as any[],
      },
      footer: {
        text: form.footerText || undefined,
        links: links.length ? links : undefined,
      }
    },
    releaseDate: form.releaseDate || undefined,
    version: form.version || undefined,
    downloadLink: form.downloadLink || undefined,
    tags: tags.length ? tags : undefined,
    platforms: platforms.length ? platforms : undefined,
  }
})

const jsonString = computed(() => JSON.stringify(jsonObject.value, null, 2))
const copied = ref(false)
async function copyJson() {
  await navigator.clipboard.writeText(jsonString.value)
  copied.value = true
  setTimeout(() => copied.value = false, 1200)
}
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-2xl font-bold">Créateur de release (Modular)</h1>
      <p class="text-gray-600 text-sm">Renseignez les champs puis copiez l’objet JSON pour l’ajouter à <code>releases.json</code>.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <form class="space-y-6 lg:col-span-2">
        <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
          <h2 class="text-lg font-semibold">Informations générales</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">Titre</label>
              <input v-model="form.title" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Slug (optionnel)</label>
              <input v-model="form.slug" placeholder="auto depuis le titre si vide" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Auteur</label>
              <input v-model="form.author" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Version</label>
              <input v-model="form.version" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date de release</label>
              <input v-model="form.releaseDate" type="date" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Lien de téléchargement</label>
              <input v-model="form.downloadLink" type="url" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea v-model="form.description" rows="3" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Image de carte (liste)</label>
              <input v-model="form.image" type="url" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
              <input v-model="form.tags" type="text" placeholder="rpg, xbox, coop" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Plateformes (séparées par des virgules)</label>
              <input v-model="form.platforms" type="text" placeholder="Windows, macOS" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
          <h2 class="text-lg font-semibold">Header</h2>
          <div class="grid gap-4 sm:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Titre</label>
              <input v-model="form.headerTitle" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Sous-titre</label>
              <input v-model="form.headerSubtitle" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Image</label>
              <input v-model="form.headerImage" type="url" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Sections du corps</h2>
            <div class="flex gap-2">
              <button type="button" @click="addSection('text')" class="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">+ Texte</button>
              <button type="button" @click="addSection('image')" class="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">+ Image</button>
              <button type="button" @click="addSection('list')" class="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">+ Liste</button>
            </div>
          </div>
          <div v-if="!form.sections.length" class="text-sm text-gray-500">Aucune section. Ajoutez du contenu avec les boutons ci-dessus.</div>
          <div v-for="(s, i) in form.sections" :key="i" class="rounded-md border border-gray-200 p-4 space-y-3">
            <div class="text-xs uppercase tracking-wide text-gray-500">Section {{ i + 1 }} — {{ s.type }}</div>
            <div v-if="s.type === 'text'">
              <label class="block text-sm font-medium text-gray-700">Contenu</label>
              <textarea v-model="s.content" rows="4" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div v-else-if="s.type === 'image'" class="grid gap-3 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">URL de l’image</label>
                <input v-model="s.url" type="url" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Légende (optionnelle)</label>
                <input v-model="s.caption" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div v-else-if="s.type === 'list'">
              <label class="block text-sm font-medium text-gray-700">Éléments (1 par ligne)</label>
              <textarea v-model="s.items" rows="4" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Élément 1\nÉlément 2"></textarea>
            </div>
            <div class="pt-2">
              <button type="button" @click="removeSection(i)" class="text-red-600 hover:text-red-700 text-sm">Supprimer</button>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
          <h2 class="text-lg font-semibold">Footer</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Texte</label>
              <input v-model="form.footerText" type="text" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Liens (Label|URL par ligne)</label>
              <textarea v-model="form.footerLinks" rows="3" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Learn More|https://example.com\nContact|https://example.com"></textarea>
            </div>
          </div>
        </div>
      </form>

      <div class="space-y-4">
        <div class="rounded-lg border border-gray-200 bg-white p-5 space-y-3">
          <h2 class="text-lg font-semibold">Objet JSON généré</h2>
          <textarea :value="jsonString" readonly rows="24" class="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-mono"></textarea>
          <div class="flex items-center gap-2">
            <button type="button" @click="copyJson" class="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700">Copier</button>
            <span v-if="copied" class="text-sm text-green-600">Copié !</span>
          </div>
          <p class="text-xs text-gray-500">Ajoutez cet objet dans <code>featured</code>, <code>ecxogames_exclusive</code> ou <code>all</code> selon votre besoin.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>