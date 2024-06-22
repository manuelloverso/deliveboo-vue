<script>
import { store } from "../store";

export default {
  name: "AppHeader",
  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <header
    class="py-3 px-5"
    :class="
      $route.name == 'home' || $route.name == 'checkout' ? 'bg-transparent' : ''
    "
  >
    <nav class="d-flex justify-content-between align-items-center">
      <div class="logo">
        <a href="http://localhost:5173/">
          <img src="/public/img/deliverome-circledark-logo.svg" alt="" />
        </a>
      </div>
      <div class="links d-flex gap-5 align-items-center">
        <div class="cart-link">
          <div v-if="store.cart.length > 0" class="items-number">
            {{ store.cart.length }}
          </div>
          <RouterLink :to="{ name: 'checkout' }"
            ><i class="fa-solid fa-cart-shopping fa-lg"></i
          ></RouterLink>
        </div>
        <ul class="user-links list-unstyled d-flex gap-4 m-0">
          <li><a href="http://127.0.0.1:8000/login">Login</a></li>
          <li><a href="http://127.0.0.1:8000/register">Registrati</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<style scoped>
header {
  background-color: var(--bg-header);

  .logo img {
    display: block;
    width: 100px;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

  .cart-link {
    position: relative;
    transition: transform 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    .items-number {
      position: absolute;
      color: var(--accent);
      top: -15px;
      left: -3px;
      font-weight: 800;
      font-size: 1.2rem;
    }
    a {
      color: white;
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

.bg-transparent {
  background-color: transparent;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 4;
}
</style>
