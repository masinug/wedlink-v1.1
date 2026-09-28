<template>
  <div class="container py-5">

    <!-- HEADER -->
    <div class="mb-4">
      
      <RouterLink
        to="/admin/dashboard"
        class="admin-back-link"
      >
        ← Kembali ke Dashboard
      </RouterLink>

      <h2 class="fw-bold mb-1 mt-3">
        Kelola Review
      </h2>

      <p class="text-muted mb-0">
        Kelola dan moderasi review yang diberikan customer.
      </p>
    </div>


    <!-- FILTER STATUS -->
    <div class="card border-0 shadow-sm mb-4">

      <div class="card-body">

        <label class="form-label fw-semibold">
          Filter Status
        </label>

        <select
          v-model="statusFilter"
          class="form-select"
        >
          <option value="all">
            Semua Review
          </option>

          <option value="pending">
            Menunggu Persetujuan
          </option>

          <option value="approved">
            Sudah Disetujui
          </option>
        </select>

      </div>

    </div>


    <!-- REVIEW -->
    <div class="card border-0 shadow-sm">

      <div class="card-body">

        <div
          v-if="loading"
          class="text-center py-5"
        >

          <div
            class="spinner-border text-secondary"
            role="status"
          ></div>

          <p class="text-muted mt-3">
            Memuat review...
          </p>

        </div>


        <div
          v-else-if="filteredReviews.length === 0"
          class="text-center py-5 text-muted"
        >

          Belum ada review.

        </div>


        <div
          v-else
          class="table-responsive"
        >

          <table class="table table-hover align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Vendor</th>
                <th>Rating</th>
                <th>Komentar</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>

            </thead>


            <tbody>

              <tr
                v-for="(review, index) in filteredReviews"
                :key="review.id"
              >

                <td>
                  {{ index + 1 }}
                </td>


                <td>
                  <strong>
                    {{ review.customerName }}
                  </strong>
                </td>


                <td>
                  {{ review.vendor?.businessName || "-" }}
                </td>


                <td>
                  <span class="rating">
                    {{ "★".repeat(review.rating) }}
                  </span>
                </td>


                <td>
                  <span class="review-comment">
                    {{ review.comment }}
                  </span>
                </td>


                <td>

                  <span
                    v-if="review.isApproved"
                    class="badge bg-success"
                  >
                    Disetujui
                  </span>

                  <span
                    v-else
                    class="badge bg-warning text-dark"
                  >
                    Pending
                  </span>

                </td>


                <td>

                  <div class="d-flex gap-2">

                    <button
                      v-if="!review.isApproved"
                      class="btn btn-sm btn-outline-success"
                      @click="approveReview(review)"
                    >
                      Approve
                    </button>


                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteReview(review)"
                    >
                      Hapus
                    </button>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>

import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";


const API_URL = "http://localhost:3000/api";


const reviews = ref([]);

const loading = ref(true);

const statusFilter = ref("all");


const filteredReviews = computed(() => {

  if (statusFilter.value === "pending") {

    return reviews.value.filter(
      review => !review.isApproved
    );

  }


  if (statusFilter.value === "approved") {

    return reviews.value.filter(
      review => review.isApproved
    );

  }


  return reviews.value;

});


const loadReviews = async () => {

  loading.value = true;

  try {

    const response = await axios.get(
      `${API_URL}/reviews/admin/all`,
      {
        withCredentials: true
      }
    );

    reviews.value = response.data.data || [];

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal mengambil data review."
    });

  } finally {

    loading.value = false;

  }

};


const approveReview = async (review) => {

  const result = await Swal.fire({

    icon: "question",

    title: "Setujui review?",

    text: "Review akan ditampilkan pada halaman vendor.",

    showCancelButton: true,

    confirmButtonText: "Ya, setujui",

    cancelButtonText: "Batal"

  });


  if (!result.isConfirmed) {
    return;
  }


  try {

    await axios.patch(
      `${API_URL}/reviews/${review.id}/approve`,
      {},
      {
        withCredentials: true
      }
    );


    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Review berhasil disetujui.",
      timer: 1600,
      showConfirmButton: false
    });


    await loadReviews();

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal menyetujui review."
    });

  }

};


const deleteReview = async (review) => {

  const result = await Swal.fire({

    icon: "warning",

    title: "Hapus review?",

    text: `Review dari "${review.customerName}" akan dihapus.`,

    showCancelButton: true,

    confirmButtonText: "Ya, hapus",

    cancelButtonText: "Batal",

    confirmButtonColor: "#d33"

  });


  if (!result.isConfirmed) {
    return;
  }


  try {

    await axios.delete(
      `${API_URL}/reviews/${review.id}`,
      {
        withCredentials: true
      }
    );


    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Review berhasil dihapus.",
      timer: 1600,
      showConfirmButton: false
    });


    await loadReviews();

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal menghapus review."
    });

  }

};


onMounted(() => {

  loadReviews();

});

</script>


<style scoped>

.rating {
  color: #c9a86a;
  letter-spacing: 2px;
  white-space: nowrap;
}

.review-comment {
  display: block;
  max-width: 280px;
  white-space: normal;
}

</style>