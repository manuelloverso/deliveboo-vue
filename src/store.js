import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  baseApiUrl: "http://127.0.0.1:8000/api/",
  types: [],
  loadingRestaurants: true,
  loadingTypes: true,
  cart: [],
 

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
  },

  getQuantity(name) {
    const plate = this.cart.find((el) => el.plateObj.name === name);
    if (plate) {
      return plate.quantity;
    } else {
      return 0;
    }
  },

  addPlate(name, plates) {
    let plate;
    //recupera il piatto
    plates.forEach((el) => {
      if (el.name == name) {
        plate = el;
      }
    });

    //non permette di aggiungere piatti di diversi ristoranti
    if (store.cart.length > 0) {
      if (plate.restaurant_id != this.cart[0].plateObj.restaurant_id) {
        const myModal = new bootstrap.Modal(document.getElementById("modalId"));
        myModal.show();
        return;
      }
    }

    //lo trasforma in un oggetto che ne contiene la quantità
    let plateObject = {
      plateObj: plate,
      quantity: 1,
    };

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

  removePlate(name, plates) {
    let plate;
    //recupera il piatto
    plates.forEach((el) => {
      if (el.name == name) {
        plate = el;
      }
    });

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
