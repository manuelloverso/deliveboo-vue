<script>
import { store } from "../store.js";
import RestaurantCard from "../components/RestaurantCard.vue";
import NoResult from "../components/NoResult.vue";
import Loading from "../components/Loading.vue";
import axios from "axios";
import TypesSlider from "../components/TypesSlider.vue";
export default {
  name: "HomeView",

  components: {
    RestaurantCard,
    NoResult,
    Loading,
    TypesSlider,
  },

  data() {
    return {
      store,
      filtered: false,
      activeTypes: [],
      filteredRestaurants: [],
      test: [],
      loading: false,
    };
  },

  methods: {
    filterByTypes(typeId) {
      this.loading = true;
      this.filtered = true;
      store.types.forEach((type) => {
        if (type.id - 1 == typeId) {
          if (!this.activeTypes.includes(type.id)) {
            const btn = document.getElementById(`${type.name}`);
            btn.classList.add("active-type");
            this.activeTypes.push(type.id);
          } else {
            const btn = document.getElementById(`${type.name}`);
            btn.classList.remove("active-type");
            let index = this.activeTypes.indexOf(type.id);
            this.activeTypes.splice(index, 1);
          }

          axios
            .get(store.baseApiUrl + `types/${this.activeTypes}`)
            .then((resp) => {
              this.filteredRestaurants = resp.data.results;
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        }
      });
    },

    resetFilter() {
      this.activeTypes = [];
      let buttons = document.querySelectorAll(".type");
      buttons.forEach((btn) => {
        if (btn.classList.contains("active-type")) {
          btn.classList.remove("active-type");
        }
      });
      this.filteredRestaurants = [];
    },
  },
};
</script>
<template>
  <main>
    <!-- Jumbotron -->
    <div class="jumbotron">
      <div class="overlay">
        <div
          class="jumbo-text container-fluid text-white d-flex flex-column align-items-center justify-content-center h-50 text-center"
        >
          <h1 class="fw-bold tracking-in-contract">Benvenuto su Deliverome</h1>

          <br />
          <h2 class="tracking-in-contract">
            Il miglior cibo della capitale direttamente a casa tua
          </h2>

          <h4 class="fw-light mt-5 tracking-in-contract">
            Sei un ristoratore?
          </h4>
          <a class="btn-jum" href="http://127.0.0.1:8000/register"
            >Registrati</a
          >
        </div>
      </div>
    </div>

    <TypesSlider />

    <div class="container">
      <!-- Types Filter -->
      <h2 class="text-center mt-5 text-body-secondary">
        Cosa vuoi mangiare oggi?
      </h2>
      <p class="text-center text-body-secondary">
        Scegli una o più tipologie di ristorante
      </p>
      <div class="types-container">
        <div
          :id="singleType.name"
          class="fs-5 type"
          v-for="(singleType, index) in store.types"
          @click="filterByTypes(index)"
        >
          <img class="type-img" :src="singleType.image" alt="" />
          <span>{{ singleType.name }}</span>
        </div>
      </div>
      <button
        v-if="activeTypes.length != 0"
        @click="resetFilter()"
        class="reset-btn"
      >
        Azzera filtri
      </button>
      <!--restaurants-count-->
      <template v-if="activeTypes.length > 0">
        <div v-if="filteredRestaurants.length == 1" class="count_restaurant">
          <p class="ps-3 fs-5">
            Ristorante disponibile: {{ filteredRestaurants.length }}
          </p>
        </div>
        <div v-if="filteredRestaurants.length > 1" class="count_restaurant">
          <p class="ps-3 fs-5">
            Ristoranti disponibili: {{ filteredRestaurants.length }}
          </p>
        </div>
      </template>

      <!-- Restaurants -->
      <div class="restaurants-container">
        <div v-if="filtered == true" class="container my-4">
          <!--restaurant-cards-->
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <template v-if="activeTypes.length > 0">
              <div v-for="restaurant in filteredRestaurants" class="col mb-5">
                <RestaurantCard :restaurant="restaurant" />
              </div>
            </template>
          </div>
        </div>
        <!--loading-->
        <template v-if="loading">
          <Loading />
        </template>
        <!--about-us-->
        <template v-if="activeTypes.length == 0">
          <div class="container my-5 about_us py-5 gap-4">
            <div class="row g-1">
              <div class="col-12 col-md-12 col-lg-4 p-2">
                <div class="card h-100">
                  <img
                    src="/public/img/icon-plates.png"
                    class="img-fluid"
                    alt=""
                  />
                  <div class="card-body">
                    <div
                      class="cardi-title text-white text-center text-uppercase"
                    >
                      <h3>solo i migliori piatti di roma</h3>
                    </div>
                    <p class="card-text text-center text-white p-3">
                      Abbiamo cercato per voi i ristoranti piú buoni della
                      capitale per portavi a casa solo i piatti migliori
                    </p>
                  </div>
                </div>
              </div>

              <div class="col col-md-6 col-lg-4 p-2">
                <div class="card h-100">
                  <img
                    src="/public/img/icon-rider.png"
                    class="img-fluid"
                    alt=""
                  />
                  <div class="card-body">
                    <div
                      class="cardi-title text-white text-center text-uppercase"
                    >
                      <h3>consegne veloci</h3>
                    </div>
                    <p class="card-text text-center text-white p-3">
                      I nostri rider si impegnano ogni giorno per consegnare i
                      vostri ordini nel minore tempo possibile
                    </p>
                  </div>
                </div>
              </div>

              <div class="col col-md-6 col-lg-4 p-2">
                <div class="card h-100">
                  <img
                    src="/public/img/icon-securitypay.png"
                    class="img-fluid"
                    alt=""
                  />
                  <div class="card-body">
                    <div
                      class="cardi-title text-white text-center text-uppercase"
                    >
                      <h3>pagamento online sicuro</h3>
                    </div>
                    <p class="card-text text-center text-white p-3">
                      Paga comodamente dal tuo divano, al resto ci pensiamo noi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!--noresult-->
        <template
          v-if="filteredRestaurants.length == 0 && activeTypes.length != 0"
        >
          <NoResult />
        </template>
      </div>
    </div>
  </main>
</template>
<style scoped>
.jumbotron {
  height: 90vh;
  background-color: red;
  position: relative;
  background-image: url("/public/img/jumbo.jpg");
  background-size: cover;
  background-position: center;

  .jumbo-text {
    padding-top: 20rem;
    text-shadow: 3px 3px 4px #333;
  }

  & h1 {
    font-size: 4.5rem;
    margin: 0;

    @media (max-width: 576px) {
      font-size: 2.8rem;
    }

    & h2 {
      @media (max-width: 576) {
        font-size: 1.5rem;
      }
    }
  }

  .overlay {
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.466);
  }

  .btn-jum {
    background-color: white;
    border-radius: 10px;
    transition: background-color 0.3s ease, color 0.3s ease;
    padding: 7px 13px;
    color: black;
    text-decoration: none;
    text-shadow: none;

    &:hover {
      background-color: var(--accent);
      color: white;
    }
  }
}

.types-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem 0 2rem 0;

  .type {
    position: relative;
    cursor: pointer;
    width: 160px;
    transition: transform 0.3s ease;

    &:hover img {
      filter: grayscale(0);
    }

    .type-img {
      width: 100%;
      aspect-ratio: 16/10;
      border-radius: 30px;
      filter: grayscale(1);
      transition: filter 0.3s ease;
    }

    & span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: 800;
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
        1px 1px 0 black;
    }

    &:hover {
      transform: scale(1.07);
    }
  }

  .active-type .type-img {
    filter: grayscale(0) !important;
  }
}

.reset-btn {
  margin: auto;
  display: block;
  margin-bottom: 2rem;
  background-color: var(--bg-header);
  border: none;
  color: white;
  border-radius: 10px;
  font-weight: 700;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.07);
    background-color: red;
  }
}

.about_us {
  & .card {
    background-color: var(--accent);
  }
  & img {
    max-width: 200px;
    margin: auto;
    margin-top: 30px;

    @media (max-width: 768px) {
      width: 100px;
    }
  }

  & h3 {
    @media (max-width: 768px) {
      font-size: 25px;
    }
  }
}

.restaurants-container {
  overflow: auto;

  margin-bottom: 40px;
}

.count_restaurant {
  font-size: small;
  color: rgba(0, 0, 0, 0.519);
}
</style>
