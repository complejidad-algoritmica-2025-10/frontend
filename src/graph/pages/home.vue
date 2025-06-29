<script lang="ts">

import {defineComponent} from "vue";
import NavbarHeader from "../components/navbar-header.vue";

export default defineComponent({
  components: {NavbarHeader}
})
</script>

<template>
  <navbar-header></navbar-header>
  <router-view></router-view>
</template>