<script>
export default {
  name: "AppHeader",
  data() {
    return {};
  },
};
</script>
<template>
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
</style>
