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
    class="py-2"
    :class="
      $route.name == 'home' || $route.name == 'checkout' ? 'bg-transparent' : ''
    "
  >
    <nav class="header-container navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <div class="logo">
          <RouterLink :to="{ name: 'home' }">
            <img src="/public/img/deliverome-circledark-logo.svg" alt="" />
          </RouterLink>
        </div>
        <div class="d-flex hstack">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <!--collapse-->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="links">
              <ul class="user-links list-unstyled d-flex gap-2 m-2">
                <li class="mx-2">
                  <a href="http://127.0.0.1:8000/login">Login</a>
                </li>
                <li><a href="http://127.0.0.1:8000/register">Registrati</a></li>
              </ul>
            </div>
          </div>
          <div class="cart-link mx-4 align-items-center">
            <div v-if="store.cart.length > 0" class="items-number">
              {{ store.cart.length }}
            </div>
            <RouterLink :to="{ name: 'checkout' }"
              ><i class="fa-solid fa-cart-shopping fa-lg"></i
            ></RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.header-container {
  width: 95%;
  margin: auto;
  max-width: 1800px;
}
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
