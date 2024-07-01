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

  <RouterView v-slot="{ Component, route }">
    <template v-if="!route.meta.noTransition">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="route.fullPath"></component>
      </transition>
    </template>
    <template v-else>
      <component :is="Component" :key="route.fullPath"></component>
    </template>
  </RouterView>

  <!-- Site Footer -->
  <AppFooter />
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
