<script>
import { store } from "../store.js";
export default {
  name: "RestaurantCard",
  data() {
    return {
      store
    }
  },

  props: {
    restaurant: {
      type: Object,
    },
  },


};
</script>

<template>
  <RouterLink class="text-decoration-none" :to="`restaurants/${restaurant.restaurant_slug}-${restaurant.id}`">
    <div class="card rounded-3 h-100">
      <img v-if="restaurant.image.startsWith('https')" class="rounded-top" :src="restaurant.image" alt="" />
      <img v-else class="rounded-top" :src="'http://127.0.0.1:8000' + '/storage/' + restaurant.image" alt="" />

      <div class="d-flex flex-column justify-content-between p-3 "> 
        <div class="d-flex gap-1 felx-wrap">
          <div v-for="restaurantType in restaurant.types" class="types_restaurant fw-semibold">
            {{ restaurantType.name }}
          </div>
        </div>
        <h3 class="fw-bold mt-3 fs-2 ">{{ restaurant.restaurant_name }}</h3>
       
      </div>
    </div>
  </RouterLink>
</template>
<style scoped>
.card {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  transition: 0.4s;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }

  img {
    height: 300px;
    object-fit: cover;
  }

  .types_restaurant {

    color:white ;
    display: block;
    padding: 2px 4px;
    background-color: var(--accent);
    border-radius: 7px;
    font-size: 12px;
    
  }

}
</style>
