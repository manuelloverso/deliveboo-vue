<script>
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      url: "http://127.0.0.1:8000/api/restaurants",
      restaurants: [],
      types: [],
      loading: true,
      loadingTypes: true,
    };
  },

  methods: {
    getRestaurants() {
      axios.get(this.url).then((response) => {
        this.restaurants = response.data.results;
        this.loading = false;
      });
    },

    getTypes() {
      axios.get("http://127.0.0.1:8000/api/types").then((response) => {
        this.types = response.data.results;
        this.loadingTypes = false;
      });
    },
  },

  mounted() {
    this.getRestaurants();
    this.getTypes();
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

  <!-- Types Filter -->
  <h2>Types</h2>
  <div v-if="loadingTypes == false" class="row">
    <div v-for="singleType in types" class="col-3">
      <div class="card">
        <h1>{{ singleType.name }}</h1>
      </div>
    </div>
  </div>

  <!-- Restaurants -->
  <h2>Restaurants</h2>
  <div v-if="loading == false" class="row">
    <div v-for="restaurant in restaurants" class="col-3">
      <div class="card">
        <h1>{{ restaurant.restaurant_name }}</h1>
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
</style>
