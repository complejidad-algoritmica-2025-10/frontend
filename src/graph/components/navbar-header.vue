<template>
  <div>
    <pv-menubar :model="items" class="custom-menubar">
      <!-- Logo del menú -->
      <template #start>
        <div class="flex items-center gap-2">
          <img src="../../assets/logo.svg" alt="Logo" class="h-3 w-3" />
          <p class="font-bold text-lg vertical-align-middle" style="color: white;">Pantalla Justa</p>
        </div>
      </template>

      <!-- Slot personalizado para manejar routing con router-link -->
      <template #item="{ item, props }">
        <router-link v-if="item.to" v-slot="{ href, navigate, isActive }" :to="item.to" custom>
          <a v-bind="props.action" :href="href" @click="navigate" :class="{ 'active-link': isActive }">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
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
  to?: string;
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
          icon: 'pi pi-venus',
          to: '/about'
        },
        {
          label: 'Collaborations',
          icon: 'pi pi-users',
          to: '/collaborations'
        },
        {
          label: 'Movie Staff',
          icon: 'pi pi-ticket',
          to: '/movie-staff'
        },
        {
          label: 'Developers',
          icon: 'pi pi-code',
          to: '/developers'
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
