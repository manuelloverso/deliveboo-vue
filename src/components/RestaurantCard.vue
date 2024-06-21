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
  <RouterLink
    class="text-decoration-none"
    :to="'restaurants/' + restaurant.restaurant_slug"
  >
    <div class="card rounded-3">
      <img
        v-if="restaurant.image.startsWith('https')"
        class="rounded-top"
        :src="restaurant.image"
        alt=""
      />
      <img
        v-else
        class="rounded-top"
        :src="'http://127.0.0.1:8000' + '/storage/' + restaurant.image"
        alt=""
      />

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
}
</style>
