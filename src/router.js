import { createWebHistory, createRouter } from "vue-router";
import NotFound from "./views/NotFound.vue";
import CheckoutView from "./views/CheckoutView.vue";
/* Views */
import HomeView from "./views/HomeView.vue";
import RestaurantShow from "./views/RestaurantShow.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/checkout", name: "checkout", component: CheckoutView },
    { path: "/restaurants/:slug-:id", component: RestaurantShow },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
