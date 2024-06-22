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
    if (JSON.parse(localStorage.getItem("cart") != null)) {
      store.cart = JSON.parse(localStorage.getItem("cart"));
    }
    store.getTypes();
  },
};
</script>
<template>
  <!-- Site Header -->
  <AppHeader />
  <!-- Site Main -->
  <RouterView />

  <!-- Site Footer -->
  <AppFooter />
</template>

<style scoped></style>
