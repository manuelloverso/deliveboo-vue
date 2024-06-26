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
            })

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
        <div class="jumbo-text container text-white d-flex flex-column align-items-center justify-content-center h-50 text-center">
          <h1 class="fw-bold ">Benvenuto su Deliverome</h1>
          <br />
          <h2>Il miglior cibo della capitale direttamente a casa tua</h2>

          <h4 class="fw-light mt-5">Sei un ristoratore?</h4>
          <a class="btn-jum" href="http://127.0.0.1:8000/register">Registrati</a>
        </div>
      </div>
    </div>

    <TypesSlider />

    <div class="container">
      <!-- Types Filter -->
      <h2 class="text-center mt-5 text-body-secondary">Cosa vuoi mangiare oggi?</h2>
      <p class="text-center text-body-secondary">Scegli una o più tipologie di ristorante</p>
      <div class="types-container">
        <div :id="singleType.name" class="badge fs-5 type" v-for="(singleType, index) in store.types"
          @click="filterByTypes(index)">
          {{ singleType.name }}
        </div>
      </div>
      <button v-if="activeTypes.length != 0" @click="resetFilter()" class="reset-btn">
        Azzera filtri
      </button>

      <!-- Restaurants -->
      <div v-if="filtered == true" class="restaurants-container">
        <!--restaurants-count-->
        <template v-if="activeTypes.length > 0">
          <div v-if="filteredRestaurants.length == 1" class="count_restaurant">
            <p>Ristorante disponibile: {{ filteredRestaurants.length }}</p>
          </div>
          <div v-if="filteredRestaurants.length > 1" class="count_restaurant">
            <p>Ristoranti disponibili: {{ filteredRestaurants.length }}</p>
          </div>
        </template>
        <!--restaurant-cards-->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">
          <template v-if="activeTypes.length > 0">
            <div v-for="restaurant in filteredRestaurants" class="col mb-5 mx-auto">
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
        <div class="container my-5 about_us py-5">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-4 justify-content-center">
              <img  class="img-fluid" src="/public/img/deliverome-circledark-logo.svg" alt="" />
            </div>
            <div class="col-12 col-sm-6 col-md-8">
              
              <p class="text-center fs-1 fst-italic text-body-secondary ">
                "Non si può pensare bene, <br> 
                amare bene, <br>
                dormire bene <br>
                se non si ha mangiato bene." <br>
                (Virginia Woolf)
              </p>
            </div>
          </div>


        </div>
      </template>
      <!--noresult-->
      <template v-if="filteredRestaurants.length == 0 && activeTypes.length != 0">
        <NoResult />
      </template>
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
     @media (max-width: 576px){
      font-size: 2.8rem ;
    }

    & h2{
      @media (max-width: 576){
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
    cursor: pointer;
    background-color: var(--accent);
    transition: 0.5s;

    &:hover {
      transform: scale(1.07);
      background-color: red;
    }
  }

  .active-type {
    background-color: red;
    transform: scale(1.07);
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

.about_us{
  & img{
  min-width: 220px;
  }

}
.restaurants-container {
  & .count_restaurant {
    font-size: small;
    color: rgba(0, 0, 0, 0.519);
  }
}
</style>
