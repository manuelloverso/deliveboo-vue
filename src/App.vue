<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import { store } from "./store.js";

export default {
  components: {
    AppFooter,
    AppHeader,
  },
  name: "App",
  data() {
    return {
      store,
    };
  },
  mounted() {
    store.getTypes();
  },
};
</script>
<template>
  <!-- Site Main -->
  <main>
    <RouterView />
  </main>

  <!-- Site Footer -->
  <AppFooter />
</template>

<style scoped></style>
