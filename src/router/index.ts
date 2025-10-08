import {createRouter, createWebHistory} from 'vue-router'
import Landing from "@/views/Landing.vue";
import Release from "@/views/Release.vue";
import Search from "@/views/Search.vue";
import Creator from "@/views/Creator.vue";
import HardcodedReleasePageExample from '@/components/release-pages/hardcoded/HardcodedReleasePageExample.vue'
import ModularReleasePage from '@/components/release-pages/modular/ModularReleasePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Landing",
            component: Landing
        },
        {
            path: "/search",
            name: "Search",
            component: Search
        },
        // Pages hardcodées (ajoutez autant que nécessaire)
        {
            path: "/release/example",
            name: "HardcodedExample",
            component: HardcodedReleasePageExample
        },
        // Pages modulaires depuis JSON (slug)
        {
            path: "/r/:slug",
            name: "ModularRelease",
            component: ModularReleasePage
        },
        {
            path: "/release",
            name: "Release",
            component: Release
        },
        {
            path: "/creator",
            name: "Creator",
            component: Creator
        }
    ],
})

export default router
