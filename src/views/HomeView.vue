<script>
import { store } from "../store.js";
export default {
  name: "HomeView",
  data() {
    return {
      store,
      filtered: false,
      activeTypes: [],
      filteredRestaurants: [],
    };
  },

  methods: {
    filterByTypes(typeId) {
      this.filteredRestaurants = [];

      this.filtered = true;
      store.types.forEach((type) => {
        if (
          type.id - 1 == typeId &&
          this.activeTypes.includes(type.name) == false
        ) {
          this.activeTypes.push(type.name);
        }
      });

      store.restaurants.forEach((restaurant) => {
        restaurant.types.forEach((type) => {
          if (this.activeTypes.includes(type.name)) {
            this.filteredRestaurants.push(restaurant);
          }
        });
      });
      console.log(this.filteredRestaurants);
    },
  },
};
</script>
<template>
  <!-- Jumbotron -->
  <div class="jumbotron">
    <div class="overlay"></div>
    <img src="/public/img/jumbo.jpg" alt="" />
    <div class="left">
      <h2>Lorem ipsum dolor sit amet consectetur.</h2>
    </div>
    <div class="right">
      <h2>Sei un ristoratore?</h2>
      <a href="http://127.0.0.1:8000/register">Registrati</a>
    </div>
  </div>

  <div class="container">
    <!-- Types Filter -->
    <h2>Types</h2>
    <div class="types-container">
      <div
        class="type-btn"
        v-for="(singleType, index) in store.types"
        @click="filterByTypes(index)"
      >
        {{ singleType.name }}
      </div>
    </div>

    <!-- Restaurants -->
    <h2 v-if="filtered == false">
      Clicca su una o più categorie per vedere dei ristoranti
    </h2>
    <div v-if="filtered == true" class="restaurants-container">
      <h2>Restaurants</h2>
      <div class="row">
        <div v-for="restaurant in store.restaurants" class="col-3">
          <div class="card">
            <h1>{{ restaurant.restaurant_name }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.jumbotron {
  height: 800px;
  background-color: red;
  position: relative;
  & h2 {
    font-size: 3rem;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.466);
  }

  .left,
  .right {
    color: white;
    position: absolute;
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    right: 17%;

    & a {
      text-decoration: none;
      color: var(--accent);
      display: block;
      padding: 7px 13px;
      font-size: 1.2rem;
      background-color: white;
      border-radius: 10px;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: var(--accent);
        color: white;
      }
    }
  }

  .left {
    left: 17%;
    max-width: 500px;
  }
}

.types-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  .type-btn {
    cursor: pointer;
    padding: 8px 15px;
    font-size: 1.3rem;
    border-radius: 10px;
    background-color: var(--accent);
  }
}
</style>
