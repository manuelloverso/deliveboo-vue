<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurant: {
      type: Object,
    },
  },
};
</script>

<template>
  <RouterLink :to="'restaurants/' + restaurant.id">
    <div class="card rounded-3">
      <img class="rounded-top" :src="restaurant.image" alt="" />

      <div class="p-3">
        <h3>{{ restaurant.restaurant_name }}</h3>
        <div class="">
          <i class="fa-solid fa-location-dot"></i> {{ restaurant.address }}
        </div>
        <div class="">
          <i class="fa-solid fa-at"></i> {{ restaurant.restaurant_email }}
        </div>
        <div class="">
          <i class="fa-solid fa-phone"></i> {{ restaurant.phone_number }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>
<style scoped>
.card {
  transition: 1s;
  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
  img {
    height: 300px;
    object-fit: cover;
  }
}
</style>
