<script>
import { store } from "../store.js";
import RestaurantCard from "../components/RestaurantCard.vue";
export default {
  name: "HomeView",

  components: {
    RestaurantCard,
  },

  data() {
    return {
      store,
      filtered: false,
      activeTypes: [],
      filteredRestaurants: [],
      test: [],
    };
  },

  methods: {
    filterByTypes(typeId) {
      let checker = (arr, target) => target.every((v) => arr.includes(v));

      this.filteredRestaurants = [];

      this.filtered = true;
      store.types.forEach((type) => {
        if (type.id - 1 == typeId) {
          if (!this.activeTypes.includes(type.name)) {
            const btn = document.getElementById(`${type.name}`);
            btn.classList.add("active-type");
            this.activeTypes.push(type.name);
          } else {
            const btn = document.getElementById(`${type.name}`);
            btn.classList.remove("active-type");
            let index = this.activeTypes.indexOf(type.name);
            this.activeTypes.splice(index, 1);
            console.log(index);
          }
          console.log(this.activeTypes);
        }
      });

      // console.log(this.activeTypes);
      // console.log(store.restaurants[9].types);
      store.restaurants.forEach((restaurant) => {
        {
          this.test = [];
          restaurant.types.forEach((type) => {
            this.test.push(type.name);
          });

          if (checker(this.test, this.activeTypes)) {
            // console.log(true);
            this.filteredRestaurants.push(restaurant);
            console.log(restaurant);
          }
        }
      });
    },
  },
};
</script>
<template>
  <!-- Jumbotron -->
  <div class="jumbotron">
    <div class="overlay">
      <header class="py-3 px-5">
        <nav class="d-flex justify-content-between align-items-center">
          <div class="logo">
            <a href="http://localhost:5173/">
              <img src="/public/img/deliverome-circledark-logo.svg" alt="" />
            </a>
          </div>
          <ul class="user-links list-unstyled d-flex gap-4 m-0">
            <li><a href="http://127.0.0.1:8000/login">Login</a></li>
            <li><a href="http://127.0.0.1:8000/register">Registrati</a></li>
          </ul>
        </nav>
      </header>

      <div
        class="container text-white d-flex flex-column align-items-center justify-content-center h-50"
      >
        <h2>Benvenuto su Deliverome</h2>
        <br />
        <h3>Il miglior cibo della capitale direttamente a casa tua</h3>

        <h2>Sei un ristoratore?</h2>
        <a class="btn-jum" href="http://127.0.0.1:8000/register">Registrati</a>
      </div>
    </div>
  </div>

  <div class="container">
    <!-- Types Filter -->
    <h2 class="text-center mt-4">Cosa vuoi mangiare oggi?</h2>
    <p class="text-center">Scegli una o più tipologie di ristorante</p>
    <div class="types-container">
      <div
        :id="singleType.name"
        class="badge fs-6 type"
        role="button"
        data-bs-toggle="button"
        v-for="(singleType, index) in store.types"
        @click="filterByTypes(index)"
      >
        {{ singleType.name }}
      </div>
    </div>

    <!-- Restaurants -->

    <div v-if="filtered == true" class="restaurants-container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        <template v-if="activeTypes.length > 0">
          <div v-for="restaurant in filteredRestaurants" class="col mb-4">
            <RestaurantCard :restaurant="restaurant" />
          </div>
        </template>
      </div>
    </div>

    <template v-if="activeTypes.length == 0">
      <div class="container d-flex align-items-center gap-4 my-4">
        <div class="w-50 d-flex justify-content-center">
          <img src="/public/img/deliverome-circledark-logo.svg" alt="" />
        </div>
        <div class="w-50">
          <h4>Chi siamo</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            enim atque reprehenderit explicabo rerum delectus vero a excepturi
            sapiente fuga natus sint tempore obcaecati dolore ea omnis culpa,
            eveniet quod!
          </p>
        </div>
      </div>
    </template>

    <template v-if="activeTypes.length == 0">
      <h1>test</h1>
    </template>
  </div>
</template>
<style scoped>
header {
  /* background-color: var(--bg-header); */

  .logo img {
    display: block;
    width: 100px;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

  .user-links {
    & li {
      & a {
        text-decoration: none;
        color: var(--accent);
        display: block;
        padding: 7px 13px;
        background-color: white;
        border-radius: 10px;
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
          background-color: var(--accent);
          color: white;
        }
      }
    }
  }
}

.jumbotron {
  height: 80vh;
  background-color: red;
  position: relative;
  background-image: url("/public/img/jumbo.jpg");
  background-size: cover;
  background-position: center;

  & h2 {
    font-size: 3rem;
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
  margin: 3rem 0;

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
</style>
