<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppFooter,
    AppHeader,
  },
  name: "App",
  data() {
    return {};
  },
};
</script>
<template>
  <!-- Site Header -->
  <AppHeader />

  <!-- Site Main -->
  <main>
    <RouterView />
  </main>

  <!-- Site Footer -->
  <AppFooter />
</template>

<style scoped></style>
