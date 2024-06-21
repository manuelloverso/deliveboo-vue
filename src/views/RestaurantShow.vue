<script>
import { store } from "../store.js";
import AppHeader from "../components/AppHeader.vue";

import axios from "axios";

export default {
  name: "RestaurantShow",
  components: {
    AppHeader,
  },
  data() {
    return {
      store,
      slug: null,
      id: null,
      restaurant: null,
      plates: [],
      loading: true,
    };
  },

  methods: {
    singleRestaurant() {
      console.log(this.id);
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
    const fullParams = this.$route.params.id;
    const split = fullParams.split("-");
    this.id = split[split.length - 1];

    this.singleRestaurant();
  },
};
</script>

<template>
  <!-- Site Header -->
  <AppHeader />


  <div class="container py-3">
    <template v-if="loading == false">

      <div class="back_link"><a href="http://localhost:5173/"><i class="fa-solid fa-arrow-left-long" ></i> Torna indietro</a></div>

      <div class="restaurant-info">
        <!-- Image -->
        <img v-if="restaurant.image.startsWith('http')" class="restaurant-img" :src="restaurant.image" alt="" />
        <img v-else class="restaurant-img" :src="'http://127.0.0.1:8000' + '/storage/' + restaurant.image" alt="" />

        <div class="text-left ">
          <h2 class="fw-bold">{{ restaurant.restaurant_name }}</h2>
          <p><strong>Indirizzo: </strong>{{ restaurant.address }}</p>
          <p v-if="restaurant.phone_number != null">
            <strong>Numero di telefono: </strong>{{ restaurant.phone_number }}
          </p>
        </div>

      </div>

      <!-- Piatti -->
      <div class="restaurant-plates px-4  py-1  my-5 ">
        <template v-if="plates.length > 0" >
          <h2>Piatti</h2>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <template v-for="plate in plates">
              <div v-if="plate.is_visible == true" class="col pb-4">
                <div class="plate-card">
                  <!-- Image -->
                  <template v-if="plate.image != null">
                    <img loading="lazy" v-if="plate.image.startsWith('http')" class="plate-img" :src="plate.image"
                      alt="" />
                    <img loading="lazy" v-else class="plate-img"
                      :src="'http://127.0.0.1:8000' + '/storage/' + plate.image" alt="" />
                  </template>
                  <img loading="lazy" v-else class="plate-img" src="/public/img/plate-default.jpg" alt="" />

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
        </template>
        <h1 class="my-5" v-else>
          Questo ristorante non ha alcun piatto da mostrare 😞
        </h1>
      </div>
    </template>
    <h3 v-else>Loading..</h3>
  </div>
</template>
<style scoped>
.back_link {
  margin-bottom: 20px;

  & a {

    text-decoration: none;
    color: var(--accent);
    transition: color 0.3s ease, color 0.3s ease;
    font-size: small;

    &:hover {
      color: #e55f00;
    }
  }
}

.restaurant-info {
  display: flex;
  align-items: flex-end;
  gap: 2rem;

  .restaurant-img {
    width: 350px;
    height: 200px;
  }
}

.restaurant-plates {
  
    
   
  .plate-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.5rem;
    color: black;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  

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
