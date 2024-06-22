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

    isInCart(name) {
      const found = store.cart.some((el) => {
        if (el.plateObj.name == name) {
          return true;
        }
      });
      return found;
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
  <main>
    <div class="container py-3">
      <template v-if="loading == false">
        <div class="back_link">
          <a href="http://localhost:5173/"
            ><i class="fa-solid fa-arrow-left-long"></i> Torna indietro</a
          >
        </div>

        <div class="restaurant-info">
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

          <div class="text-left px-4">
            <h2 class="fw-bold fs-1">{{ restaurant.restaurant_name }}</h2>
            <div class="d-flex gap-1 felx-wrap">
              <div
                v-for="restaurantType in restaurant.types"
                class="types_restaurant fw-semibold mb-4"
              >
                {{ restaurantType.name }}
              </div>
            </div>
            <p class="fs-6 fw-light">
              <strong>Indirizzo: </strong>{{ restaurant.address }}
            </p>
            <p v-if="restaurant.phone_number != null" class="fs-6 fw-light">
              <strong>Numero di telefono: </strong>{{ restaurant.phone_number }}
            </p>
          </div>
        </div>

        <div class="cart">
          <h2>Carrello</h2>
          <div v-for="plate in store.cart" class="cart-item d-flex gap-3">
            <span>Name: {{ plate.plateObj.name }}</span>
            <span>Price: {{ plate.plateObj.price }}</span>
            <span>Quantity: {{ plate.quantity }}</span>
          </div>
          <RouterLink :to="{ name: 'checkout' }" class="btn btn-primary"
            >Checkout</RouterLink
          >

          <button @click="store.emptyCart()" class="btn btn-dark">
            Svuota
          </button>
        </div>

        <!-- Piatti -->
        <div class="restaurant-plates px-4 py-1 my-5">
          <template v-if="plates.length > 0">
            <h2>Piatti</h2>
            <div
              class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
            >
              <template v-for="plate in plates">
                <div v-if="plate.is_visible == true" class="col pb-4">
                  <div class="plate-card">
                    <!-- Image -->
                    <template v-if="plate.image != null">
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
                        :src="
                          'http://127.0.0.1:8000' + '/storage/' + plate.image
                        "
                        alt=""
                      />
                    </template>
                    <img
                      loading="lazy"
                      v-else
                      class="plate-img"
                      src="/public/img/plate-default.jpg"
                      alt=""
                    />

                    <div class="plate-info">
                      <div>
                        <h3 class="plate-name">{{ plate.name }}</h3>
                        <p>{{ plate.description }}</p>
                        <p><strong>Prezzo: </strong>{{ plate.price }}€</p>
                      </div>

                      <div class="buttons d-flex gap-3">
                        <button
                          @click="store.addPlate(plate.name, plates)"
                          class="add-plate"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </button>
                        <button
                          v-if="isInCart(plate.name)"
                          class="btn btn-dark"
                        >
                          {{ store.getQuantity(plate.name) }}
                        </button>
                        <button
                          v-if="isInCart(plate.name)"
                          @click="store.removePlate(plate.name, plates)"
                          class="add-plate"
                        >
                          <i class="fa-solid fa-minus"></i>
                        </button>
                      </div>
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

        <!-- modale che appare se si tenta di aggiungere piatti da ristoranti diversi -->
        <!-- Modal Body -->
        <div
          class="modal fade"
          id="modalId"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">Altro ristorante</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Puoi ordinare solamente da un ristorante alla volta , desideri
                svuotare il carrello e ordinare da
                <strong>{{ restaurant.restaurant_name }}</strong
                >?
              </div>
              <div class="modal-footer">
                <button
                  @click="store.emptyCart()"
                  data-bs-dismiss="modal"
                  type="button"
                  class="btn btn-danger"
                >
                  Svuota il carrello
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <h3 v-else>Loading..</h3>
    </div>
  </main>
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
    width: 370px;
    height: 230px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    border-radius: 100px;
  }

  .types_restaurant {
    color: white;
    display: block;
    padding: 2px 4px;
    background-color: var(--accent);
    border-radius: 7px;
    font-size: 12px;
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
      border-radius: 15px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
        0 3px 10px 0 rgba(0, 0, 0, 0.19);
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
