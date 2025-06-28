<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AboutComponent"
})
</script>

<template>
  <section class="bg-gradient-to-r from-pink-100 to-purple-200 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10 animate-fade-in space-y-12">
    <!-- Qué es la aplicación -->
    <div class="flex flex-col md:flex-row items-center gap-6">
      <img
          src="/img/justa_intro.jpg" alt="Visualización de Pantalla Justa"
          style="width: 50%"
      />
      <div class="flex-1">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">¿Qué es Pantalla Justa?</h2>
        <p class="text-gray-700 text-lg">
          <strong>Pantalla Justa</strong> es una aplicación desarrollada por estudiantes universitarios para
          analizar la desigualdad de género en la industria cinematográfica.
          Utilizamos <span class="font-semibold text-purple-700">estructuras de datos avanzadas</span>, como grafos,
          para visualizar las conexiones de poder, representación y oportunidades.
        </p>
      </div>
    </div>

    <!-- Objetivo llamativo con bullets e íconos -->
    <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 space-y-5">
      <h3 class="font-bold text-purple-800 text-2xl mb-2">Nuestro objetivo</h3>
      <ul class="space-y-3">
        <li class="flex items-start gap-3 animate-fade-in-up">
      <span class="text-purple-600 mt-1">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v4h2V7zm0 6H9v2h2v-2z"/>
        </svg>
      </span>
          <p class="text-gray-700 text-sm">Visibilizar desigualdades de género en la industria cinematográfica.</p>
        </li>
        <li class="flex items-start gap-3 animate-fade-in-up delay-100">
      <span class="text-purple-600 mt-1">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"/>
        </svg>
      </span>
          <p class="text-gray-700 text-sm">Educar mediante datos y visualizaciones accesibles.</p>
        </li>
        <li class="flex items-start gap-3 animate-fade-in-up delay-200">
      <span class="text-purple-600 mt-1">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 10.882l7.997-4.998A1 1 0 0017 4H3a1 1 0 00-.997 1.884zM18 8.118l-8 5-8-5V14a1 1 0 001 1h14a1 1 0 001-1V8.118z"/>
        </svg>
      </span>
          <p class="text-gray-700 text-sm">Aplicar estructuras de datos (como grafos) para revelar patrones ocultos.</p>
        </li>
      </ul>
    </div>

    <!-- Datos de IMDB -->
    <div class="flex flex-col-reverse md:flex-row items-center gap-6">
      <div class="flex-1">
        <h3 class="font-semibold text-purple-800 text-xl mb-3">Sobre nuestros datos</h3>
        <p class="text-gray-700 text-sm mb-2">
          Utilizamos datos públicos y no comerciales proporcionados por
          <a href="https://developer.imdb.com/non-commercial-datasets/" class="text-blue-600 underline" target="_blank">IMDB</a>.
          Estos datos incluyen información sobre títulos, personas involucradas en las producciones y sus roles.
        </p>
        <p class="text-gray-700 text-sm mb-2">
          A partir de estos datos construimos grafos que permiten visualizar relaciones como:
          quién trabaja con quién, qué géneros predominan y cómo varían las oportunidades según el género.
        </p>
        <p class="text-gray-600 text-xs italic">
          Respetamos los términos de uso de IMDB y utilizamos los datos exclusivamente con fines educativos y no comerciales.
        </p>
      </div>
      <img
          src="/img/imdb_data.png"
          alt="Datos de IMDB"
          style="width: 30%"
      />
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

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}
.animate-fade-in-up.delay-100 {
  animation-delay: 0.1s;
}
.animate-fade-in-up.delay-200 {
  animation-delay: 0.2s;
}

</style>
