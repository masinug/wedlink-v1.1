<template>
  <div class="vendors-page">

    <!-- HEADER -->
    <section class="vendors-header">
      <div class="container">
        <div class="text-center">
          <span class="section-badge">
            E-Katalog WedLink
          </span>

          <h1 class="vendors-title">
            Katalog Vendor Pernikahan
          </h1>

          <p class="vendors-subtitle">
            Temukan berbagai vendor pernikahan berdasarkan kategori
            dan kebutuhan Anda.
          </p>
        </div>
      </div>
    </section>

    <!-- SEARCH & FILTER -->
    <section class="vendors-filter-section">
      <div class="container">

        <div class="row g-3">

          <!-- SEARCH -->
          <div class="col-md-7">
            <label class="form-label fw-semibold">
              Cari Vendor
            </label>

            <input
              v-model="search"
              type="text"
              class="form-control form-control-lg"
              placeholder="Contoh: catering, decoration, photography..."
              @keyup.enter="loadVendors"
            />
          </div>

          <!-- CATEGORY -->
          <div class="col-md-3">
            <label class="form-label fw-semibold">
              Kategori
            </label>

            <select
              v-model="category"
              class="form-select form-select-lg"
              @change="loadVendors"
            >
              <option value="">
                Semua Kategori
              </option>

              <option value="Catering">
                Catering
              </option>

              <option value="Decoration">
                Decoration
              </option>

              <option value="Photography">
                Photography
              </option>

              <option value="Makeup">
                Makeup
              </option>

              <option value="Venue">
                Venue
              </option>

              <option value="Entertainment">
                Entertainment
              </option>
            </select>
          </div>

          <!-- BUTTON -->
          <div class="col-md-2 d-flex align-items-end gap-2">

            <button
              class="btn btn-wedlink btn-lg vendor-filter-button"
              @click="loadVendors"
            >
              Cari
            </button>

            <button
              class="btn btn-outline-secondary btn-lg vendor-filter-button"
              @click="resetFilter"
              title="Reset filter"
            >
              Reset
            </button>

          </div>

        </div>

      </div>
    </section>

    <!-- VENDOR LIST -->
    <section class="vendors-list-section">
      <div class="container">

        <!-- LOADING -->
        <div
          v-if="loading"
          class="text-center py-5"
        >
          <div
            class="spinner-border text-secondary"
            role="status"
          >
            <span class="visually-hidden">
              Loading...
            </span>
          </div>

          <p class="mt-3 text-muted">
            Memuat data vendor...
          </p>
        </div>

        <!-- ERROR -->
        <div
          v-else-if="error"
          class="alert alert-danger"
        >
          {{ error }}
        </div>

        <!-- EMPTY -->
        <div
          v-else-if="vendors.length === 0"
          class="text-center py-5"
        >
          <h4>
            Vendor tidak ditemukan
          </h4>

          <p class="text-muted">
            Coba gunakan kata kunci atau kategori lainnya.
          </p>
        </div>

        <!-- DATA -->
        <div
          v-else
          class="row g-4"
        >

          <div
            v-for="vendor in vendors"
            :key="vendor.id"
            class="col-md-6 col-lg-4"
          >

            <div class="card vendor-card h-100">

              <!-- IMAGE / PLACEHOLDER -->
              <div class="vendor-image">

                <img
                  v-if="vendor.logoUrl"
                  :src="vendor.logoUrl"
                  :alt="vendor.businessName"
                />

                <div
                  v-else
                  class="vendor-image-placeholder"
                >
                  <div class="placeholder-icon">
                    ♡
                  </div>

                  <div class="placeholder-text">
                    WedLink
                  </div>

                  <small>
                    Vendor Pernikahan
                  </small>
                </div>

              </div>

              <!-- CARD BODY -->
              <div class="card-body d-flex flex-column">

                <span class="vendor-category">
                  {{ vendor.category }}
                </span>

                <h3 class="vendor-name">
                  {{ vendor.businessName }}
                </h3>

                <p class="vendor-description">
                  {{ vendor.description }}
                </p>

                <div class="vendor-info">

                  <div class="vendor-info-item">
                    <span class="vendor-info-label">
                      📍 Lokasi
                    </span>

                    <span>
                      {{ vendor.address }}
                    </span>
                  </div>

                  <div class="vendor-info-item">
                    <span class="vendor-info-label">
                      💰 Kisaran Harga
                    </span>

                    <span>
                      {{ vendor.priceRange }}
                    </span>
                  </div>

                </div>

                <div class="mt-auto pt-3">

                  <RouterLink
                    :to="`/vendors/${vendor.id}`"
                    class="btn btn-wedlink w-100"
                  >
                    Lihat Detail
                  </RouterLink>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const vendors = ref([]);
const search = ref("");
const category = ref("");

const loading = ref(false);
const error = ref("");

const API_URL = "http://localhost:3000";


const loadVendors = async () => {

  loading.value = true;
  error.value = "";

  try {

    const response = await axios.get(
      `${API_URL}/api/vendors`,
      {
        params: {
          search: search.value,
          category: category.value
        }
      }
    );

    if (response.data.success) {

      vendors.value =
        response.data.data;

    } else {

      vendors.value = [];

      error.value =
        "Data vendor tidak dapat dimuat.";

    }

  } catch (err) {

    console.error(
      "Gagal mengambil data vendor:",
      err
    );

    error.value =
      "Tidak dapat terhubung ke server WedLink. Pastikan backend berjalan di port 3000.";

  } finally {

    loading.value = false;

  }

};


const resetFilter = async () => {

  search.value = "";
  category.value = "";

  await loadVendors();

  window.history.replaceState(
    {},
    "",
    "/vendors"
  );

};


onMounted(() => {

  if (route.query.category) {
    category.value =
      route.query.category;
  }

  if (route.query.search) {
    search.value =
      route.query.search;
  }

  loadVendors();

});
</script>