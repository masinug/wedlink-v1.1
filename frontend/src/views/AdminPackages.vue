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
        Kelola Paket
      </h2>

      <p class="text-muted mb-0">
        Kelola paket layanan yang dimiliki setiap vendor.
      </p>
    </div>


    <!-- PILIH VENDOR -->
    <div class="card border-0 shadow-sm mb-4">

      <div class="card-body">

        <label class="form-label fw-semibold">
          Pilih Vendor
        </label>

        <select
          v-model="selectedVendorId"
          class="form-select"
          @change="loadPackages"
        >

          <option value="">
            -- Pilih Vendor --
          </option>

          <option
            v-for="vendor in vendors"
            :key="vendor.id"
            :value="vendor.id"
          >
            {{ vendor.businessName }}
          </option>

        </select>

      </div>

    </div>


    <!-- BELUM PILIH VENDOR -->
    <div
      v-if="!selectedVendorId"
      class="alert alert-info"
    >
      Silakan pilih vendor terlebih dahulu untuk melihat
      dan mengelola paket.
    </div>


    <!-- AREA PAKET -->
    <div
      v-else
      class="card border-0 shadow-sm"
    >

      <div class="card-body">

        <div class="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h5 class="fw-bold mb-1">
              Daftar Paket
            </h5>

            <small class="text-muted">
              {{ selectedVendorName }}
            </small>
          </div>

          <button
            class="btn btn-wedlink"
            @click="openAddModal"
          >
            + Tambah Paket
          </button>

        </div>


        <!-- LOADING -->
        <div
          v-if="loading"
          class="text-center py-4"
        >

          <div
            class="spinner-border text-secondary"
            role="status"
          ></div>

          <p class="text-muted mt-2">
            Memuat paket...
          </p>

        </div>


        <!-- TABLE -->
        <div
          v-else
          class="table-responsive"
        >

          <table class="table table-hover align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Nama Paket</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>

            </thead>


            <tbody>

              <tr
                v-for="(item, index) in packages"
                :key="item.id"
              >

                <td>
                  {{ index + 1 }}
                </td>

                <td class="fw-semibold">
                  {{ item.packageName }}
                </td>

                <td>
                  Rp {{ formatPrice(item.price) }}
                </td>

                <td>
                  <span class="package-description">
                    {{ item.description }}
                  </span>
                </td>

                <td>

                  <div class="d-flex gap-2">

                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="openEditModal(item)"
                    >
                      Edit
                    </button>

                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deletePackage(item)"
                    >
                      Hapus
                    </button>

                  </div>

                </td>

              </tr>


              <tr v-if="packages.length === 0">

                <td
                  colspan="5"
                  class="text-center py-5 text-muted"
                >
                  Belum ada paket untuk vendor ini.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>


    <!-- MODAL TAMBAH / EDIT -->
    <div
      v-if="showModal"
      class="modal-backdrop-custom"
    >

      <div class="modal-card">

        <div
          class="d-flex justify-content-between align-items-center mb-4"
        >

          <h4 class="fw-bold mb-0">
            {{ editingPackage ? "Edit Paket" : "Tambah Paket" }}
          </h4>

          <button
            type="button"
            class="btn-close"
            @click="closeModal"
          ></button>

        </div>


        <form @submit.prevent="savePackage">

          <!-- NAMA PAKET -->
          <div class="mb-3">

            <label class="form-label">
              Nama Paket
            </label>

            <input
              v-model="form.packageName"
              type="text"
              class="form-control"
              placeholder="Contoh: Paket Dekorasi Silver"
              required
            />

          </div>


          <!-- HARGA -->
          <div class="mb-3">

            <label class="form-label">
              Harga
            </label>

            <input
              v-model="form.price"
              type="number"
              min="0"
              class="form-control"
              placeholder="5000000"
              required
            />

          </div>


          <!-- DESKRIPSI -->
          <div class="mb-3">

            <label class="form-label">
              Deskripsi
            </label>

            <textarea
              v-model="form.description"
              class="form-control"
              rows="4"
              placeholder="Deskripsi paket..."
              required
            ></textarea>

          </div>


          <!-- GAMBAR -->
          <div class="mb-4">

            <label class="form-label">
              URL Gambar Paket
            </label>

            <input
              v-model="form.imageUrl"
              type="text"
              class="form-control"
              placeholder="https://..."
            />

          </div>


          <!-- BUTTON -->
          <div class="d-flex justify-content-end gap-2">

            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal"
            >
              Batal
            </button>

            <button
              type="submit"
              class="btn btn-wedlink"
              :disabled="saving"
            >

              {{ saving ? "Menyimpan..." : "Simpan Paket" }}

            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</template>


<script setup>

import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";


const API_URL = "http://localhost:3000/api";


const vendors = ref([]);

const selectedVendorId = ref("");

const packages = ref([]);

const loading = ref(false);

const saving = ref(false);

const showModal = ref(false);

const editingPackage = ref(null);


const form = ref({
  packageName: "",
  price: "",
  description: "",
  imageUrl: ""
});


const selectedVendorName = computed(() => {

  const vendor = vendors.value.find(
    item => item.id === Number(selectedVendorId.value)
  );

  return vendor
    ? vendor.businessName
    : "";

});


const loadVendors = async () => {

  try {

    const response = await axios.get(
      `${API_URL}/vendors/admin/all`,
      {
        withCredentials: true
      }
    );

    vendors.value = response.data.data || [];

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal mengambil data vendor."
    });

  }

};


const loadPackages = async () => {

  if (!selectedVendorId.value) {

    packages.value = [];

    return;

  }


  loading.value = true;

  try {

    const response = await axios.get(
      `${API_URL}/packages/vendor/${selectedVendorId.value}`,
      {
        withCredentials: true
      }
    );

    packages.value = response.data.data || [];

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal mengambil data paket."
    });

  } finally {

    loading.value = false;

  }

};


const resetForm = () => {

  form.value = {
    packageName: "",
    price: "",
    description: "",
    imageUrl: ""
  };

};


const openAddModal = () => {

  editingPackage.value = null;

  resetForm();

  showModal.value = true;

};


const openEditModal = (item) => {

  editingPackage.value = item;

  form.value = {
    packageName: item.packageName,
    price: item.price,
    description: item.description,
    imageUrl: item.imageUrl || ""
  };

  showModal.value = true;

};


const closeModal = () => {

  showModal.value = false;

  editingPackage.value = null;

  resetForm();

};


const savePackage = async () => {

  saving.value = true;

  try {

    if (editingPackage.value) {

      await axios.put(
        `${API_URL}/packages/${editingPackage.value.id}`,
        form.value,
        {
          withCredentials: true
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Paket berhasil diperbarui.",
        timer: 1600,
        showConfirmButton: false
      });

    } else {

      await axios.post(
        `${API_URL}/packages/vendor/${selectedVendorId.value}`,
        form.value,
        {
          withCredentials: true
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Paket berhasil ditambahkan.",
        timer: 1600,
        showConfirmButton: false
      });

    }


    closeModal();

    await loadPackages();

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal menyimpan paket."
    });

  } finally {

    saving.value = false;

  }

};


const deletePackage = async (item) => {

  const result = await Swal.fire({

    icon: "warning",

    title: "Hapus paket?",

    text: `Paket "${item.packageName}" akan dihapus.`,

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
      `${API_URL}/packages/${item.id}`,
      {
        withCredentials: true
      }
    );


    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Paket berhasil dihapus.",
      timer: 1600,
      showConfirmButton: false
    });


    await loadPackages();

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error.response?.data?.message ||
        "Gagal menghapus paket."
    });

  }

};


const formatPrice = (price) => {

  return Number(price).toLocaleString("id-ID");

};


onMounted(() => {

  loadVendors();

});

</script>


<style scoped>

.package-description {
  display: block;
  max-width: 300px;
  white-space: normal;
}

.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 1050;
}

.modal-card {
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

</style>