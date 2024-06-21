import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  baseApiUrl: "http://127.0.0.1:8000/api/",
  restaurants: [],
  types: [],
  loadingRestaurants: true,
  loadingTypes: true,

  getRestaurants() {
    axios
      .get(this.baseApiUrl + "restaurants")
      .then((response) => {
        this.restaurants = response.data.results;
        this.loadingRestaurants = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTypes() {
    axios
      .get(this.baseApiUrl + "types")
      .then((response) => {
        this.types = response.data.results;
        this.loadingTypes = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
