<template>
  <div class="vendor-detail-page">

    <!-- LOADING -->
    <section
      v-if="loading"
      class="vendor-detail-loading"
    >
      <div class="container text-center py-5">

        <div
          class="spinner-border text-secondary"
          role="status"
        >
          <span class="visually-hidden">
            Loading...
          </span>
        </div>

        <p class="mt-3 text-muted">
          Memuat informasi vendor...
        </p>

      </div>
    </section>


    <!-- ERROR -->
    <section
      v-else-if="error"
      class="vendor-detail-error"
    >
      <div class="container py-5">

        <div class="alert alert-danger">
          {{ error }}
        </div>

        <RouterLink
          to="/vendors"
          class="btn btn-wedlink"
        >
          Kembali ke Katalog
        </RouterLink>

      </div>
    </section>


    <!-- DETAIL -->
    <section
      v-else-if="vendor"
      class="vendor-detail-section"
    >

      <div class="container">

        <!-- BACK -->
        <div class="mb-4">

          <RouterLink
            to="/vendors"
            class="vendor-back-link"
          >
            ← Kembali ke Katalog
          </RouterLink>

        </div>


        <!-- VENDOR HEADER -->
        <div class="card vendor-detail-card">

          <div class="row g-0">

            <!-- IMAGE -->
            <div class="col-lg-5">

              <div class="vendor-detail-image">

                <img
                  v-if="vendor.logoUrl"
                  :src="vendor.logoUrl"
                  :alt="vendor.businessName"
                />

                <div
                  v-else
                  class="vendor-detail-placeholder"
                >

                  <div class="detail-placeholder-icon">
                    ♡
                  </div>

                  <div class="detail-placeholder-title">
                    WedLink
                  </div>

                  <small>
                    Vendor Pernikahan
                  </small>

                </div>

              </div>

            </div>


            <!-- INFORMATION -->
            <div class="col-lg-7">

              <div class="vendor-detail-content">

                <!-- CATEGORY -->
                <span class="vendor-category">
                  {{ vendor.category }}
                </span>


                <!-- NAME -->
                <h1 class="vendor-detail-title">
                  {{ vendor.businessName }}
                </h1>


                <!-- DESCRIPTION -->
                <p class="vendor-detail-description">
                  {{ vendor.description }}
                </p>


                <!-- INFO -->
                <div class="vendor-detail-info">

                  <div class="vendor-detail-info-item">

                    <span class="vendor-detail-info-label">
                      📍 Lokasi
                    </span>

                    <span>
                      {{ vendor.address }}
                    </span>

                  </div>


                  <div class="vendor-detail-info-item">

                    <span class="vendor-detail-info-label">
                      💰 Kisaran Harga
                    </span>

                    <span>
                      {{ vendor.priceRange }}
                    </span>

                  </div>


                  <div class="vendor-detail-info-item">

                    <span class="vendor-detail-info-label">
                      📞 Telepon
                    </span>

                    <span>
                      {{ vendor.phoneNumber }}
                    </span>

                  </div>

                </div>


                <!-- CTA -->
                <div class="vendor-detail-actions">

                  <a
                    :href="whatsappLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-wedlink btn-lg"
                  >
                    💬 Hubungi Vendor via WhatsApp
                  </a>

                </div>


                <!-- NOTE -->
                <div class="vendor-detail-note">

                  <strong>
                    Informasi:
                  </strong>

                  <span>
                    WedLink merupakan e-katalog dan media promosi
                    vendor pernikahan. Tombol hubungi/booking hanya
                    digunakan untuk menghubungi vendor melalui WhatsApp.
                    Pemesanan, negosiasi, pengecekan ketersediaan jadwal,
                    pembayaran, dan transaksi dilakukan langsung dengan
                    vendor di luar sistem WedLink.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        <!-- PACKAGES -->
        <section class="vendor-detail-block">

          <div class="vendor-detail-section-heading">

            <span class="section-badge">
              Layanan Vendor
            </span>

            <h2>
              Paket yang Ditawarkan
            </h2>

            <p>
              Pilihan paket dan layanan yang tersedia dari vendor.
            </p>

          </div>


          <!-- NO PACKAGE -->
          <div
            v-if="!vendor.packages || vendor.packages.length === 0"
            class="text-center py-4"
          >

            <p class="text-muted">
              Belum ada paket yang ditampilkan oleh vendor.
            </p>

          </div>


          <!-- PACKAGE LIST -->
          <div
            v-else
            class="row g-4"
          >

            <div
              v-for="pkg in vendor.packages"
              :key="pkg.id"
              class="col-md-6 col-lg-4"
            >

              <div class="card vendor-package-card h-100">

                <!-- PACKAGE IMAGE -->
                <div
                  v-if="pkg.imageUrl"
                  class="vendor-package-image"
                >

                  <img
                    :src="pkg.imageUrl"
                    :alt="pkg.packageName"
                  />

                </div>


                <!-- PACKAGE BODY -->
                <div class="card-body d-flex flex-column">

                  <h3 class="vendor-package-title">
                    {{ pkg.packageName }}
                  </h3>


                  <div class="vendor-package-price">
                    {{ formatPrice(pkg.price) }}
                  </div>


                  <p class="vendor-package-description">
                    {{ pkg.description }}
                  </p>


                  <div class="mt-auto pt-3">

                    <a
                      :href="packageWhatsAppLink(pkg)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-outline-wedlink w-100"
                    >
                      Tanya Paket
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        <!-- REVIEWS -->
        <section class="vendor-detail-block">

          <div class="vendor-detail-section-heading">

            <span class="section-badge">
              Ulasan
            </span>

            <h2>
              Review Customer
            </h2>

            <p>
              Ulasan yang telah ditampilkan oleh WedLink.
            </p>

          </div>


          <!-- NO REVIEW -->
          <div
            v-if="!vendor.reviews || vendor.reviews.length === 0"
            class="vendor-no-review"
          >

            <p class="mb-0 text-muted">
              Belum ada review yang ditampilkan.
            </p>

          </div>


          <!-- REVIEW LIST -->
          <div
            v-else
            class="row g-4"
          >

            <div
              v-for="review in vendor.reviews"
              :key="review.id"
              class="col-md-6"
            >

              <div class="card vendor-review-card h-100">

                <div class="card-body">

                  <div class="d-flex justify-content-between align-items-start mb-2">

                    <div>

                      <h5 class="vendor-review-name">
                        {{ review.customerName }}
                      </h5>

                      <div class="vendor-review-rating">
                        <span
                          v-for="star in review.rating"
                          :key="star"
                        >
                          ★
                        </span>
                      </div>

                    </div>

                    <small class="text-muted">
                      {{ formatDate(review.createdAt) }}
                    </small>

                  </div>


                  <p class="vendor-review-comment mb-0">
                    "{{ review.comment }}"
                  </p>

                </div>

              </div>

            </div>

          </div>

          <!-- REVIEW FORM -->
          <div class="review-form-card mt-5">

            <div class="text-center mb-4">
              <span class="section-badge">
                Berikan Review
              </span>

              <h3 class="mt-2">
                Bagikan Pengalaman Anda
              </h3>

              <p class="text-muted mb-0">
                Review Anda akan diperiksa oleh Admin sebelum ditampilkan
                pada halaman vendor.
              </p>
            </div>

            <form @submit.prevent="submitReview">

              <!-- NAMA -->
              <div class="mb-3">
                <label class="form-label">
                  Nama
                </label>

                <input
                  v-model="reviewForm.customerName"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama Anda (opsional)"
                />

                <small class="text-muted">
                  Jika dikosongkan, nama akan ditampilkan sebagai Anonim.
                </small>
              </div>


              <!-- RATING -->
              <div class="mb-3">

                <label class="form-label">
                  Rating
                </label>

                <select
                  v-model.number="reviewForm.rating"
                  class="form-select"
                  required
                >
                  <option :value="0" disabled>
                    Pilih rating
                  </option>

                  <option :value="5">
                    ⭐⭐⭐⭐⭐ — Sangat Baik
                  </option>

                  <option :value="4">
                    ⭐⭐⭐⭐ — Baik
                  </option>

                  <option :value="3">
                    ⭐⭐⭐ — Cukup
                  </option>

                  <option :value="2">
                    ⭐⭐ — Kurang
                  </option>

                  <option :value="1">
                    ⭐ — Sangat Kurang
                  </option>
                </select>

              </div>


              <!-- KOMENTAR -->
              <div class="mb-4">

                <label class="form-label">
                  Komentar
                </label>

                <textarea
                  v-model="reviewForm.comment"
                  class="form-control"
                  rows="5"
                  placeholder="Tuliskan pengalaman Anda..."
                  required
                ></textarea>

              </div>


              <!-- BUTTON -->
              <div class="text-center">

                <button
                  type="submit"
                  class="btn btn-wedlink btn-lg"
                  :disabled="reviewLoading"
                >

                  <span v-if="reviewLoading">
                    Mengirim...
                  </span>

                  <span v-else>
                    Kirim Review
                  </span>

                </button>

              </div>

            </form>

          </div>  

        </section>


        <!-- BOTTOM CTA -->
        <section class="vendor-bottom-cta">

          <div class="vendor-bottom-cta-content">

            <span class="section-badge">
              Tertarik dengan Vendor Ini?
            </span>

            <h2>
              Hubungi Vendor Secara Langsung
            </h2>

            <p>
              Klik tombol di bawah untuk menghubungi vendor
              melalui WhatsApp dan mendapatkan informasi lebih lanjut.
            </p>

            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-wedlink btn-lg"
            >
              💬 Hubungi Vendor
            </a>

          </div>

        </section>

      </div>

    </section>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();

const vendor = ref(null);

const reviewForm = ref({
    customerName: "",
    rating: 0,
    comment: ""
});

const reviewLoading = ref(false);

const submitReview = async () => {

    if (!vendor.value) {
        return;
    }

    if (!reviewForm.value.rating) {

        await Swal.fire({
            icon: "warning",
            title: "Rating belum dipilih",
            text: "Silakan pilih rating terlebih dahulu."
        });

        return;
    }

    if (!reviewForm.value.comment.trim()) {

        await Swal.fire({
            icon: "warning",
            title: "Komentar belum diisi",
            text: "Silakan tuliskan komentar Anda."
        });

        return;
    }

    reviewLoading.value = true;

    try {

        const response = await axios.post(
            `http://localhost:3000/api/reviews/vendor/${vendor.value.id}`,
            {
                customerName:
                    reviewForm.value.customerName.trim() || "Anonim",

                rating: reviewForm.value.rating,

                comment:
                    reviewForm.value.comment.trim()
            }
        );

        if (response.data.success) {

            await Swal.fire({
                icon: "success",
                title: "Review Berhasil Dikirim",
                text:
                    "Terima kasih. Review Anda akan diperiksa Admin sebelum ditampilkan.",
                confirmButtonText: "OK"
            });

            reviewForm.value = {
                customerName: "",
                rating: 0,
                comment: ""
            };
        }

    } catch (error) {

        console.error(
            "Gagal mengirim review:",
            error
        );

        await Swal.fire({
            icon: "error",
            title: "Review Gagal Dikirim",
            text:
                error.response?.data?.message ||
                "Terjadi kesalahan saat mengirim review."
        });

    } finally {

        reviewLoading.value = false;

    }
};

const loading = ref(false);
const error = ref("");

const API_URL = "http://localhost:3000";


/* =========================================
   LOAD VENDOR
========================================= */

const loadVendor = async () => {

  loading.value = true;
  error.value = "";

  try {

    const response = await axios.get(
      `${API_URL}/api/vendors/${route.params.id}`
    );

    if (response.data.success) {

      vendor.value = response.data.data;

    } else {

      error.value =
        "Data vendor tidak dapat ditemukan.";

    }

  } catch (err) {

    console.error(
      "Gagal mengambil detail vendor:",
      err
    );

    error.value =
      "Tidak dapat terhubung ke server WedLink. Pastikan backend berjalan di port 3000.";

  } finally {

    loading.value = false;

  }

};


/* =========================================
   WHATSAPP LINK
========================================= */

const whatsappLink = computed(() => {

  if (!vendor.value) {
    return "#";
  }

  let number =
    vendor.value.whatsappNumber || "";

  number = number.replace(/\D/g, "");

  if (number.startsWith("0")) {

    number =
      "62" +
      number.substring(1);

  }


  const message =
    `Halo, saya mendapatkan informasi tentang ${vendor.value.businessName} dari WedLink. ` +
    `Saya ingin mengetahui informasi lebih lanjut mengenai layanan pernikahan.`;

  return (
    `https://wa.me/${number}` +
    `?text=${encodeURIComponent(message)}`
  );

});

const packageWhatsAppLink = (pkg) => {

    if (!vendor.value) {
        return "#";
    }

    let number =
        vendor.value.whatsappNumber || "";

    number = number.replace(/\D/g, "");

    if (number.startsWith("0")) {
        number =
            "62" +
            number.substring(1);
    }

    const message =
        `Halo, saya mendapatkan informasi tentang ${vendor.value.businessName} dari WedLink. ` +
        `Saya tertarik dengan ${pkg.packageName} ` +
        `dengan harga ${formatPrice(pkg.price)}. ` +
        `Saya ingin mengetahui informasi lebih lanjut mengenai paket tersebut.`;

    return (
        `https://wa.me/${number}` +
        `?text=${encodeURIComponent(message)}`
    );
};

/* =========================================
   FORMAT PRICE
========================================= */

const formatPrice = (price) => {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }
  ).format(Number(price));

};


/* =========================================
   FORMAT DATE
========================================= */

const formatDate = (date) => {

  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

};


/* =========================================
   INITIAL LOAD
========================================= */

onMounted(() => {
  loadVendor();
});
</script>