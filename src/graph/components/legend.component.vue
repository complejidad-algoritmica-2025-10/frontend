<!-- Legend.vue -->
<template>
  <div class="legend">
    <h3 class="legend-title">Leyenda de roles</h3>
    <ul class="legend-list">
      <li v-for="(color, category) in categoryColors" :key="category" class="legend-item">
        <span class="legend-color" :style="{ backgroundColor: color }"></span>
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Legend',
  data() {
    return {
      categoryColors: {
        director: 'green',
        producer: 'orange',
        actor: 'royalblue',
        actress: 'hotpink',
        writer: 'purple',
        cinematographer: 'brown',
      }
    }
  }
})
</script>

<style scoped>
.legend {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  max-width: 250px;
  background-color: #f9f9f9;
}
.legend-title {
  margin-bottom: 8px;
  font-weight: bold;
}
.legend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.legend-color {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  margin-right: 10px;
  border: 1px solid #555;
}
</style>
