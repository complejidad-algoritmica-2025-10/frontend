<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "developers.component"
})
</script>

<template>
  <section class="bg-white py-10 px-6 md:px-12 rounded-2xl shadow-xl max-w-5xl mx-auto mt-10 space-y-8 animate-fade-in">
    <h2 class="text-3xl font-bold text-purple-800 text-center">Desarrolladores</h2>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div class="bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition text-center">
        <img src="/img/imdb_data.png" alt="Foto Dev 1" style="width: 25%">
        <h3 class="text-lg font-semibold text-purple-700">Álvaro Orozco</h3>
        <p class="text-sm text-gray-600">Product Manager</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition text-center">
        <img src="/img/imdb_data.png" alt="Foto Dev 2" style="width: 25%">
        <h3 class="text-lg font-semibold text-purple-700">Henry Reaño</h3>
        <p class="text-sm text-gray-600">Data Analyst</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition text-center">
        <img src="/img/imdb_data.png" alt="Foto Dev 3" style="width: 25%">
        <h3 class="text-lg font-semibold text-purple-700">Jesús Uribe</h3>
        <p class="text-sm text-gray-600">Developer Full-Stack</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
</style>
