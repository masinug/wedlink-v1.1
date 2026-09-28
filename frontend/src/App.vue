<template>
  <div>

    <!-- NAVBAR WEBSITE PUBLIK -->
    <nav
      v-if="!isAdminPage"
      class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top"
    >
      <div class="container">

        <RouterLink class="navbar-brand fw-bold wedlink-brand" to="/">
          WedLink
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarWedLink"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarWedLink">
          <ul class="navbar-nav ms-auto align-items-lg-center">

            <li class="nav-item">
              <RouterLink class="nav-link" to="/">
                Beranda
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink class="nav-link" to="/vendors">
                Katalog Vendor
              </RouterLink>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#tentang">
                Tentang
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>

    <!-- CONTENT -->
    <main>
      <RouterView />
    </main>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isAdminPage = computed(() => {
  return route.path.startsWith("/admin");
});
</script>