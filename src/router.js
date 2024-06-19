import { createWebHistory, createRouter } from "vue-router";

/* Views */
import HomeView from "./views/HomeView.vue";
import RestaurantShow from "./views/RestaurantShow.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/restaurants/:id", component: RestaurantShow },
  ],
});

export default router;
