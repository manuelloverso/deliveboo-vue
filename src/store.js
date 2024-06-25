import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  baseApiUrl: "http://127.0.0.1:8000/api/",
  types: [],
  loadingRestaurants: true,
  loadingTypes: true,
  cart: [],
  temporaryPlate: null,
  isTemporaryAdded: false,

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

  emptyCart() {
    this.cart = [];
    localStorage.clear();

    if (this.temporaryPlate != null) {
      this.cart.push(this.temporaryPlate);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.temporaryPlate = null;
    }
  },

  getQuantity(name) {
    const plate = this.cart.find((el) => el.plateObj.name === name);
    if (plate) {
      return plate.quantity;
    } else {
      return 0;
    }
  },
  getTotal() {
    let total = 0;
    this.cart.forEach((el) => {
      total += el.plateObj.price * el.quantity;
    });

    return total.toFixed(2);
  },

  addPlate(plate, restaurant_name) {
    let plateObject = {
      plateObj: plate,
      quantity: 1,
      restaurant: restaurant_name,
    };
    //non permette di aggiungere piatti di diversi ristoranti
    if (this.cart.length > 0) {
      if (plate.restaurant_id != this.cart[0].plateObj.restaurant_id) {
        this.temporaryPlate = plateObject;
        this.isTemporaryAdded = true;
        const myModal = new bootstrap.Modal(document.getElementById("modalId"));
        myModal.show();
        return;
      }
    }

    // se trova il piatto nel carrello modifica la quantità
    const objFound = this.cart.some((el) => {
      if (el.plateObj.name == plate.name) {
        el.quantity++;
        return true;
      } else {
        return false;
      }
    });

    //se non lo trova lo pusha con quantità = 1
    if (!objFound) {
      this.cart.push(plateObject);
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },

  removePlate(plate) {
    for (let i = this.cart.length - 1; i >= 0; i--) {
      let el = this.cart[i];
      if (el.plateObj.name == plate.name && el.quantity > 1) {
        el.quantity--;
      } else if (el.plateObj.name == plate.name && el.quantity <= 1) {
        this.cart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },
});
