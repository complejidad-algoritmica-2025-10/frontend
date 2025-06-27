<template>
  <div class="card">
    <pv-menubar :model="items">
      <template #start>
        <div class="flex items-center gap-2">
          <img src="../../assets/logo.svg" alt="Logo" class="h-3 w-3" />
          <p class="font-bold text-lg vertical-align-middle">Pantalla Justa</p>
        </div>
      </template>
    </pv-menubar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {InputText as PvInputText} from "primevue";

interface MenuItem {
  label: string;
  icon?: string;
  badge?: number;
  items?: MenuItem[];
}

export default defineComponent({
  name: 'NavbarHeader',
  components: {PvInputText},
  data() {
    return {
      items: [
        {
          label: 'About',
          icon: 'pi pi-venus'
        },
        {
          label: 'Colaborations',
          icon: 'pi pi-users'
        },
        {
          label: 'Movie Staff',
          icon: 'pi pi-ticket'
        },
        {
          label: 'Developers',
          icon: 'pi pi-code'
        }
      ] as MenuItem[]
    };
  }
});
</script>

<style scoped>
.card {
  padding: 1rem;
}
</style>
