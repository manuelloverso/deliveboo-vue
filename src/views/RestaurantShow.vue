<script>
import { store } from "../store.js";
import AppHeader from "../components/AppHeader.vue";
import PlateCard from "../components/PlateCard.vue";
import Loading from "../components/Loading.vue";
import RestaurantCard from "../components/RestaurantCard.vue";

import axios from "axios";

export default {
  name: "RestaurantShow",
  components: {
    AppHeader,
    Loading,
    PlateCard,
    RestaurantCard,
  },
  data() {
    return {
      store,
      slug: null,
      id: null,
      restaurant: null,
      plates: [],
      loading: true,
      relatedLoading: true,
      related: [],
      restTypes: [],
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
            this.relatedRestaurants();
          } else {
            this.$router.push({ name: "NotFound" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    relatedRestaurants() {
      this.restaurant.types.forEach((type) => {
        this.restTypes.push(type.id);
      });

      axios
        .get(store.baseApiUrl + `types/${this.restTypes}`)
        .then((resp) => {
          console.log(resp);
          this.related = resp.data.results.filter(
            (el) => el.id != this.restaurant.id
          );
          this.relatedLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.relatedLoading = false;
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
    <!-- Image -->

    <template v-if="loading == false" loading="lazy">
      <div class="image_jumbo">
        <img
          v-if="restaurant.image.startsWith('http')"
          :src="restaurant.image"
          alt=""
        />
        <img
          v-else
          :src="'http://127.0.0.1:8000' + '/storage/' + restaurant.image"
          alt=""
        />
      </div>
    </template>

    <div class="container py-3">
      <template v-if="loading == false" loading="lazy">
        <div class="restaurant-info my-3">
          <div class="row col-10 justyfy-content-center">
            <div class="card card_restaurant py-4">
              <div class="d-flex justify-content-between">
                <div class="text-left px-4">
                  <h2 class="fw-bold fs-1 tracking-in-expand-fwd">
                    {{ restaurant.restaurant_name }}
                  </h2>
                  <div class="d-flex gap-1 felx-wrap">
                    <div
                      v-for="restaurantType in restaurant.types"
                      class="types_restaurant fw-semibold mb-4"
                    >
                      {{ restaurantType.name }}
                    </div>
                  </div>
                  <p class="fs-6 fw-light tracking-in-expand-fwd">
                    <strong>Indirizzo: </strong>{{ restaurant.address }}
                  </p>
                  <p
                    v-if="restaurant.phone_number != null"
                    class="fs-6 fw-light tracking-in-expand-fwd"
                  >
                    <strong>Numero di telefono: </strong
                    >{{ restaurant.phone_number }}
                  </p>
                </div>

                <div class="col-3 col-md-5 col-lg-6">
                  <img
                    v-if="restaurant.image.startsWith('http')"
                    class="restaurant-img img-fluid swing-in-top-fwd"
                    :src="restaurant.image"
                    alt=""
                  />
                  <img
                    v-else
                    class="restaurant-img img-fluid swing-in-top-fwd"
                    :src="
                      'http://127.0.0.1:8000' + '/storage/' + restaurant.image
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              class="d-flex flex-column justify-content-between position_btn_order"
            >
              <div v-if="store.getTotal() > 0" class="cart-button">
                <button
                  class="btn_order"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasScrolling"
                  aria-controls="offcanvasScrolling"
                >
                  Rivedi il tuo ordine
                </button>
              </div>
            </div>

            <!-- Carrello -->

            <div class="col-12 col-sm-12 col-lg-3 px-4">
              <div
                class="off_canvas offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabindex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
                    Controlla il tuo ordine e procedi al checkout del
                    ristorante: {{ store.cart[0]?.restaurant }}
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body">
                  <table class="bg_table w-100">
                    <thead class="">
                      <tr>
                        <th scope="col">Piatto</th>
                        <th scope="col">Prezzo</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="plate in store.cart">
                        <td class=" ">{{ plate.plateObj.name }}</td>
                        <td class=" ">{{ plate.plateObj.price }}€</td>
                        <td scope="row" class="d-flex gap-1 py-2">
                          <div
                            class="remBtn btn btn-outline-secondary"
                            @click="store.removePlate(plate.plateObj)"
                          >
                            -
                          </div>
                          <div class="btn btn-dark">
                            {{ plate.quantity }}
                          </div>
                          <div
                            class="addBtn btn btn-outline-secondary"
                            @click="store.addPlate(plate.plateObj)"
                          >
                            +
                          </div>
                        </td>
                      </tr>

                      <tr class="">
                        <td class="py-4" colspan="2">
                          <strong>Totale:</strong>
                        </td>
                        <td>{{ store.getTotal() }}€</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-around">
                    <RouterLink
                      :to="{ name: 'checkout' }"
                      class="btn btn-dark btn_checkout"
                      >Procedi al Checkout
                    </RouterLink>
                    <div
                      @click="store.emptyCart()"
                      class="btn bg-danger text-white"
                    >
                      <i class="fa-solid fa-trash-can"></i> Svuota Carrello
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Piatti -->
        <div class="restaurant-plates px-4 py-1 mb-4">
          <h2 class="text-center fs-1 mb-5">Menù</h2>
          <template v-if="plates.length > 0">
            <!-- <h2 class="mb-3">Piatti</h2> -->
            <div
              class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
            >
              <PlateCard
                :plate="plate"
                :restaurant_name="restaurant.restaurant_name"
                :key="plate.id"
                v-for="plate in plates"
              />
            </div>
          </template>
          <h1 class="my-5" v-else>
            Questo ristorante non ha alcun piatto da mostrare 😞
          </h1>
        </div>

        <!-- Ristoranti correlati -->
        <template v-if="relatedLoading == false && related.length > 0">
          <h2 class="mb-4 mt-2">Ristoranti simili</h2>
          <div
            class="related-restaurants mb-3 row row-cols-1 row-cols-md-2 row-cols-lg-3"
          >
            <div v-for="relRestaurant in related">
              <div class="col mb-5">
                <RestaurantCard :restaurant="relRestaurant" />
              </div>
            </div>
          </div>
        </template>

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
                  type="button"
                  class="btn btn-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Chiudi
                </button>
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
      <template v-else>
        <Loading />
      </template>
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

.image_jumbo {
  width: 100%;
  height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.position_btn_order {
  position: relative;

  .btn_order {
    padding: 6px 10px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: rgb(255, 153, 0);
    transition: all 0.2s ease;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
      background-color: rgb(255, 196, 0);
      color: white;
      transform: translate(-50%, 0);
    }
  }
}

.restaurant-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  position: relative;
  top: -80px;

  .card_restaurant {
    box-shadow: 0 2px 4px 0 rgba(212, 100, 2, 0.2),
      0 3px 10px 0 rgba(241, 146, 22, 0.19);
    border-radius: 20px;

    .restaurant-img {
      width: 370px;
      height: 230px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
        0 3px 10px 0 rgba(0, 0, 0, 0.19);
      border-radius: 20px;
      object-fit: cover;

      @media screen and (max-width: 600px) {
        display: none;
      }
    }
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

.addBtn {
  font-weight: 500;
  color: rgb(104, 173, 0);
  cursor: pointer;
}

.remBtn {
  font-weight: 500;
  color: rgb(255, 0, 0);
  cursor: pointer;
}

.cart-button {
  button {
    background-color: vcar(--accent);
    border: none;
    padding: 1rem 1rem;
    border-radius: 10px;
    font-weight: bold;
    color: white;
  }
}

.off_canvas {
  background-color: var(--bg-header);
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
