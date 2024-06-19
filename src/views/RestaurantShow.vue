<script>
import { store } from "../store.js";
import axios from "axios";

export default {
  name: "RestaurantShow",
  data() {
    return {
      store,
      id: null,
      restaurant: null,
      plates: [],
      loading: true,
    };
  },

  methods: {
    singleRestaurant() {
      axios
        .get(store.baseApiUrl + `restaurants/${this.id}`)
        .then((resp) => {
          if (resp.data.success) {
            this.restaurant = resp.data.response;
            this.plates = resp.data.response.plates;
            this.loading = false;
          } else {
            this.$router.push({ name: "NotFound" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.singleRestaurant();
  },
};
</script>
<template>
  <div class="container py-4">
    <template v-if="loading == false">
      <div class="restaurant-info">
        <div class="text-left">
          <h2>{{ restaurant.restaurant_name }}</h2>
          <p><strong>Indirizzo: </strong>{{ restaurant.address }}</p>
          <p><strong>Email: </strong>{{ restaurant.restaurant_email }}</p>
          <p v-if="restaurant.phone_number != null">
            <strong>Numero di telefono: </strong>{{ restaurant.phone_number }}
          </p>
        </div>
        <!-- Image -->
        <img
          v-if="restaurant.image.startsWith('http')"
          class="restaurant-img"
          :src="restaurant.image"
          alt=""
        />
        <img
          v-else
          class="restaurant-img"
          :src="'http://127.0.0.1:8000' + '/storage/' + restaurant.image"
          alt=""
        />
      </div>

      <!-- Piatti -->
      <div class="restaurant-plates">
        <h2>Piatti</h2>
        <div class="row">
          <template v-for="plate in plates">
            <div v-if="plate.is_visible == true" class="col-3 p-4">
              <div class="plate-card">
                <!-- Image -->
                <img
                  loading="lazy"
                  v-if="plate.image.startsWith('http')"
                  class="plate-img"
                  :src="plate.image"
                  alt=""
                />
                <img
                  loading="lazy"
                  v-else
                  class="plate-img"
                  :src="'http://127.0.0.1:8000' + '/storage/' + plate.image"
                  alt=""
                />
                <div class="plate-info">
                  <div>
                    <h3 class="plate-name">{{ plate.name }}</h3>
                    <p>{{ plate.description }}</p>
                    <p><strong>Prezzo: </strong>{{ plate.price }}€</p>
                  </div>
                  <button class="add-plate">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <h3 v-else>Loading..</h3>
  </div>
</template>
<style scoped>
.restaurant-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  .restaurant-img {
    width: 400px;
  }
}

.restaurant-plates {
  .plate-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.5rem;
    color: white;
    background-color: black;
    border-radius: 15px;
    .plate-img {
      width: 100%;
      aspect-ratio: 16/12;
      object-fit: cover;
      margin-bottom: 20px;
    }

    .plate-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      flex-grow: 1;
    }

    .plate-name {
      font-size: 1.2rem;
    }

    .add-plate {
      padding: 6px 10px;
      border: none;
      border-radius: 10px;
      color: white;
      background-color: var(--accent);
      transition: all 0.2s ease;

      &:hover {
        background-color: white;
        color: var(--text-dark);
      }
    }
  }
}
</style>
