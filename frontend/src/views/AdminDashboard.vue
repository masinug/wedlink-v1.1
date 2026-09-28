<template>
  <div class="admin-page">

    <!-- HEADER -->
    <section class="admin-header">

      <div class="container">

        
        <div
          class="d-flex flex-column flex-md-row
             justify-content-between
             align-items-md-center gap-3"
        >

        <div>

          <span class="section-badge">
            Admin WedLink
          </span>

          <h1>
            Dashboard Admin
          </h1>

          <p>
            Selamat datang, {{ adminName }}.
            Kelola katalog vendor WedLink dari halaman ini.
          </p>

        </div>

        <div class="d-flex flex-wrap gap-2">

          <!-- LIHAT WEBSITE PUBLIK -->
          <RouterLink
            to="/"
            class="btn btn-outline-secondary"
          >
            Lihat Website
          </RouterLink>

          <!-- LOGOUT -->
          <button
            class="btn btn-outline-danger"
            @click="logout"
          >
            Logout
          </button>

        </div>

      </div>

      </div>

    </section>


    <!-- CONTENT -->
    <section class="admin-content">

      <div class="container">

        <!-- STATISTICS -->
        <div class="row g-4 mb-5">

          <!-- TOTAL VENDOR -->
          <div class="col-md-6 col-lg-3">

            <div class="admin-stat-card">

              <div class="admin-stat-icon">
                V
              </div>

              <div>
                <span>
                  Total Vendor
                </span>

                <strong>
                  {{ stats.vendors }}
                </strong>
              </div>

            </div>

          </div>


          <!-- TOTAL PACKAGE -->
          <div class="col-md-6 col-lg-3">

            <div class="admin-stat-card">

              <div class="admin-stat-icon">
                P
              </div>

              <div>
                <span>
                  Total Paket
                </span>

                <strong>
                  {{ stats.packages }}
                </strong>
              </div>

            </div>

          </div>


          <!-- TOTAL REVIEW -->
          <div class="col-md-6 col-lg-3">

            <div class="admin-stat-card">

              <div class="admin-stat-icon">
                R
              </div>

              <div>
                <span>
                  Total Review
                </span>

                <strong>
                  {{ stats.reviews }}
                </strong>
              </div>

            </div>

          </div>


          <!-- PENDING REVIEW -->
          <div class="col-md-6 col-lg-3">

            <div class="admin-stat-card">

              <div class="admin-stat-icon">
                !
              </div>

              <div>
                <span>
                  Review Pending
                </span>

                <strong>
                  {{ stats.pendingReviews }}
                </strong>
              </div>

            </div>

          </div>

        </div>


        <!-- STATUS SUMMARY -->
        <div class="row g-4 mb-5">

          <div class="col-md-6">

            <div class="admin-summary-card">

              <div class="admin-summary-icon">
                ✓
              </div>

              <div>

                <span>
                  Vendor Aktif
                </span>

                <strong>
                  {{ stats.activeVendors }}
                </strong>

                <small>
                  Vendor yang tampil di katalog publik
                </small>

              </div>

            </div>

          </div>


          <div class="col-md-6">

            <div class="admin-summary-card">

              <div class="admin-summary-icon">
                -
              </div>

              <div>

                <span>
                  Vendor Nonaktif
                </span>

                <strong>
                  {{ stats.inactiveVendors }}
                </strong>

                <small>
                  Vendor yang tidak ditampilkan di katalog
                </small>

              </div>

            </div>

          </div>

        </div>


        <!-- MENU -->
        <h2 class="admin-section-title">
          Menu Pengelolaan
        </h2>

        <div class="row g-4">

          <!-- VENDOR -->
          <div class="col-md-4">

            <div class="admin-menu-card">

              <div class="admin-menu-icon">
                V
              </div>

              <h3>
                Kelola Vendor
              </h3>

              <p>
                Tambah, ubah, lihat, dan kelola informasi
                vendor yang ditampilkan di katalog WedLink.
              </p>

              <RouterLink
                to="/admin/vendors"
                class="btn btn-wedlink"
              >
                Kelola Vendor
              </RouterLink>

            </div>

          </div>


          <!-- PACKAGE -->
          <div class="col-md-4">

            <div class="admin-menu-card">

              <div class="admin-menu-icon">
                P
              </div>

              <h3>
                Kelola Paket
              </h3>

              <p>
                Kelola paket layanan dan harga yang ditawarkan
                oleh setiap vendor.
              </p>

              <RouterLink
                to="/admin/packages"
                class="btn btn-wedlink"
              >
                Kelola Paket
              </RouterLink>

            </div>

          </div>


          <!-- REVIEW -->
          <div class="col-md-4">

            <div class="admin-menu-card">

              <div class="admin-menu-icon">
                R
              </div>

              <h3>
                Kelola Review
              </h3>

              <p>
                Periksa dan setujui review pelanggan
                sebelum ditampilkan di halaman vendor.
              </p>

              <RouterLink
                to="/admin/reviews"
                class="btn btn-wedlink"
              >
                Kelola Review
              </RouterLink>

            </div>

          </div>

        </div>


        <!-- INFORMATION -->
        <div class="admin-info-box mt-5">

          <h3>
            Informasi WedLink
          </h3>

          <p>
            WedLink merupakan e-katalog vendor pernikahan.
            Sistem berfungsi sebagai media informasi dan
            promosi vendor serta penghubung calon pelanggan
            dengan vendor melalui WhatsApp.
          </p>

          <p class="mb-0">
            Pemesanan, negosiasi, pengecekan ketersediaan
            jadwal, pembayaran, dan transaksi dilakukan
            di luar sistem WedLink.
          </p>

        </div>

      </div>

    </section>

  </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";


const router = useRouter();

const API_URL = "http://localhost:3000";


const adminName = ref("Admin");


const stats = ref({

  admins: 0,

  vendors: 0,

  packages: 0,

  reviews: 0,

  activeVendors: 0,

  inactiveVendors: 0,

  pendingReviews: 0

});


/* =========================================
   LOAD DASHBOARD
========================================= */

const loadDashboard = async () => {

  try {

    /* -------------------------------------
       CHECK SESSION ADMIN
    ------------------------------------- */

    const sessionResponse = await axios.get(

      `${API_URL}/api/auth/me`,

      {
        withCredentials: true
      }

    );


    if (!sessionResponse.data.success) {

      router.push("/admin/login");

      return;

    }


    adminName.value =
      sessionResponse.data.data.name;


    /* -------------------------------------
       DATABASE STATISTICS
    ------------------------------------- */

    const statsResponse = await axios.get(

      `${API_URL}/api/test-db`

    );


    if (statsResponse.data.success) {

      stats.value.admins =
        statsResponse.data.data.admins;

      stats.value.vendors =
        statsResponse.data.data.vendors;

      stats.value.packages =
        statsResponse.data.data.packages;

      stats.value.reviews =
        statsResponse.data.data.reviews;

    }


    /* -------------------------------------
       LOAD ALL VENDOR DATA
    ------------------------------------- */

    const vendorResponse = await axios.get(

      `${API_URL}/api/vendors/admin/all`,

      {
        withCredentials: true
      }

    );


    if (vendorResponse.data.success) {

      const vendors =
        vendorResponse.data.data || [];


      stats.value.activeVendors =
        vendors.filter(
          vendor => vendor.isActive
        ).length;


      stats.value.inactiveVendors =
        vendors.filter(
          vendor => !vendor.isActive
        ).length;

    }


    /* -------------------------------------
       LOAD ALL REVIEW DATA
    ------------------------------------- */

    const reviewResponse = await axios.get(

      `${API_URL}/api/reviews/admin/all`,

      {
        withCredentials: true
      }

    );


    if (reviewResponse.data.success) {

      const reviews =
        reviewResponse.data.data || [];


      stats.value.pendingReviews =
        reviews.filter(
          review => !review.isApproved
        ).length;

    }

  } catch (error) {

    console.error(
      "Gagal memuat dashboard:",
      error
    );


    router.push("/admin/login");

  }

};


/* =========================================
   LOGOUT
========================================= */

const logout = async () => {

  try {

    await axios.post(

      `${API_URL}/api/auth/logout`,

      {},

      {
        withCredentials: true
      }

    );


    await Swal.fire({

      icon: "success",

      title: "Logout Berhasil",

      text:
        "Anda telah keluar dari halaman Admin.",

      timer: 1200,

      showConfirmButton: false

    });


    router.push("/admin/login");


  } catch (error) {

    console.error(
      "Logout error:",
      error
    );


    router.push("/admin/login");

  }

};


/* =========================================
   INITIAL LOAD
========================================= */

onMounted(() => {

  loadDashboard();

});

</script>