<template>
  <div class="card">
    <pv-menubar :model="items" class="custom-menubar">
      <template #start>
        <div class="flex items-center gap-2">
          <img src="../../assets/logo.svg" alt="Logo" class="h-3 w-3" />
          <p class="font-bold text-lg vertical-align-middle" style="color: white;">Pantalla Justa</p>
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
::v-deep(.p-menubar) {
  background-color: #782A8C !important;
}

::v-deep(.p-menubar *){
  color: white !important;
}

::v-deep(.p-menubar .p-badge) {
  background-color: white;
  color: #782A8C;
}

::v-deep(.p-menubar-root-list *:hover) {
  background-color: #9658A5 !important;
  color: white !important;
}
</style>
