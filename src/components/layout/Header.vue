<!-- eslint-disable vue/multi-word-component-names -->
 <template>
  <header class="relative z-20 backdrop-blur-md bg-white/5 border-b border-white/10">
    <nav class="w-full mx-auto px-4 md:px-6 py-4 flex justify-around items-center">
      <!-- Logo -->
      <div
        class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
      >
        AIRemake<span class="text-pink-400">.tools</span>
      </div>
      <user-menu />
    </nav>
  </header>
</template>

<script setup lang="ts">
import UserMenu from '@/components/layout/header/UserMenu.vue'
defineProps<{
  mobileMenuOpen: boolean
}>()

defineEmits<{
  (e: 'toggle-menu'): void
}>()
</script>
