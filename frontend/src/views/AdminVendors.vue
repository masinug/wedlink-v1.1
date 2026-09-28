<template>
    <div class="container py-5">

        <!-- HEADER -->
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

            <div>

                <RouterLink
                    to="/admin/dashboard"
                    class="admin-back-link"
                >
                    ← Kembali ke Dashboard
                </RouterLink>

                <h2 class="fw-bold mb-1 mt-3">
                    Kelola Vendor
                </h2>

                <p class="text-muted mb-0">
                    Kelola data vendor yang tampil di katalog WedLink.
                </p>

            </div>

            <button
                class="btn btn-wedlink"
                @click="openAddModal"
            >
                + Tambah Vendor
            </button>

        </div>


        <!-- LOADING -->
        <div
            v-if="loading"
            class="text-center py-5"
        >
            <div
                class="spinner-border text-secondary"
                role="status"
            ></div>

            <p class="mt-3 text-muted">
                Memuat data vendor...
            </p>
        </div>


        <!-- ERROR -->
        <div
            v-else-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>


        <!-- DATA VENDOR -->
        <div
            v-else
            class="card border-0 shadow-sm"
        >

            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-hover align-middle">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Vendor</th>
                                <th>Kategori</th>
                                <th>Telepon</th>
                                <th>Harga</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr
                                v-for="(vendor, index) in vendors"
                                :key="vendor.id"
                            >

                                <td>
                                    {{ index + 1 }}
                                </td>

                                <td>
                                    <div class="fw-semibold">
                                        {{ vendor.businessName }}
                                    </div>

                                    <small class="text-muted">
                                        {{ vendor.address }}
                                    </small>
                                </td>

                                <td>
                                    {{ vendor.category }}
                                </td>

                                <td>
                                    {{ vendor.phoneNumber }}
                                </td>

                                <td>
                                    {{ vendor.priceRange }}
                                </td>

                                <!-- STATUS -->
                                <td>

                                    <span
                                        v-if="vendor.isActive"
                                        class="badge bg-success"
                                    >
                                        Aktif
                                    </span>

                                    <span
                                        v-else
                                        class="badge bg-secondary"
                                    >
                                        Nonaktif
                                    </span>

                                </td>


                                <!-- AKSI -->
                                <td>

                                    <div class="d-flex flex-wrap gap-2">

                                        <!-- EDIT -->
                                        <button
                                            class="btn btn-sm btn-outline-primary"
                                            @click="openEditModal(vendor)"
                                        >
                                            Edit
                                        </button>


                                        <!-- NONAKTIFKAN -->
                                        <button
                                            v-if="vendor.isActive"
                                            class="btn btn-sm btn-outline-warning"
                                            @click="toggleStatus(vendor)"
                                        >
                                            Nonaktifkan
                                        </button>


                                        <!-- AKTIFKAN -->
                                        <button
                                            v-else
                                            class="btn btn-sm btn-outline-success"
                                            @click="toggleStatus(vendor)"
                                        >
                                            Aktifkan
                                        </button>


                                        <!-- HAPUS -->
                                        <button
                                            class="btn btn-sm btn-outline-danger"
                                            @click="deleteVendor(vendor)"
                                        >
                                            Hapus
                                        </button>

                                    </div>

                                </td>

                            </tr>


                            <!-- KOSONG -->
                            <tr v-if="vendors.length === 0">

                                <td
                                    colspan="7"
                                    class="text-center py-5 text-muted"
                                >
                                    Belum ada data vendor.
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>


        <!-- MODAL FORM -->
        <div
            v-if="showModal"
            class="modal-backdrop-custom"
        >

            <div class="modal-card">

                <div class="d-flex justify-content-between align-items-center mb-4">

                    <h4 class="fw-bold mb-0">
                        {{ editingVendor ? "Edit Vendor" : "Tambah Vendor" }}
                    </h4>

                    <button
                        type="button"
                        class="btn-close"
                        @click="closeModal"
                    ></button>

                </div>


                <form @submit.prevent="saveVendor">

                    <!-- NAMA -->
                    <div class="mb-3">

                        <label class="form-label">
                            Nama Vendor
                        </label>

                        <input
                            v-model="form.businessName"
                            type="text"
                            class="form-control"
                            placeholder="Contoh: Citra Catering"
                            required
                        />

                    </div>


                    <!-- KATEGORI -->
                    <div class="mb-3">

                        <label class="form-label">
                            Kategori
                        </label>

                        <select
                            v-model="form.category"
                            class="form-select"
                            required
                        >

                            <option value="">
                                Pilih kategori
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


                    <!-- DESKRIPSI -->
                    <div class="mb-3">

                        <label class="form-label">
                            Deskripsi
                        </label>

                        <textarea
                            v-model="form.description"
                            class="form-control"
                            rows="4"
                            placeholder="Deskripsi vendor"
                            required
                        ></textarea>

                    </div>


                    <!-- ALAMAT -->
                    <div class="mb-3">

                        <label class="form-label">
                            Alamat
                        </label>

                        <input
                            v-model="form.address"
                            type="text"
                            class="form-control"
                            placeholder="Alamat vendor"
                            required
                        />

                    </div>


                    <!-- TELEPON -->
                    <div class="mb-3">

                        <label class="form-label">
                            Nomor Telepon
                        </label>

                        <input
                            v-model="form.phoneNumber"
                            type="text"
                            class="form-control"
                            placeholder="08xxxxxxxxxx"
                            required
                        />

                    </div>


                    <!-- WHATSAPP -->
                    <div class="mb-3">

                        <label class="form-label">
                            Nomor WhatsApp
                        </label>

                        <input
                            v-model="form.whatsappNumber"
                            type="text"
                            class="form-control"
                            placeholder="628xxxxxxxxxx"
                            required
                        />

                        <small class="text-muted">
                            Gunakan format internasional, contoh:
                            6281234567890
                        </small>

                    </div>


                    <!-- HARGA -->
                    <div class="mb-3">

                        <label class="form-label">
                            Range Harga
                        </label>

                        <input
                            v-model="form.priceRange"
                            type="text"
                            class="form-control"
                            placeholder="Rp 5.000.000 - Rp 10.000.000"
                            required
                        />

                    </div>


                    <!-- LOGO -->
                    <div class="mb-4">

                        <label class="form-label">
                            URL Logo / Foto
                        </label>

                        <input
                            v-model="form.logoUrl"
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
                            {{ saving ? "Menyimpan..." : "Simpan Vendor" }}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";


/* =========================================
   CONFIG
========================================= */

const API_URL = "http://localhost:3000/api";


/* =========================================
   STATE
========================================= */

const vendors = ref([]);

const loading = ref(true);

const saving = ref(false);

const errorMessage = ref("");

const showModal = ref(false);

const editingVendor = ref(null);


/* =========================================
   FORM
========================================= */

const form = ref({
    businessName: "",
    category: "",
    description: "",
    address: "",
    phoneNumber: "",
    whatsappNumber: "",
    priceRange: "",
    logoUrl: ""
});


/* =========================================
   RESET FORM
========================================= */

const resetForm = () => {

    form.value = {
        businessName: "",
        category: "",
        description: "",
        address: "",
        phoneNumber: "",
        whatsappNumber: "",
        priceRange: "",
        logoUrl: ""
    };

};


/* =========================================
   LOAD VENDORS
========================================= */

const loadVendors = async () => {

    loading.value = true;

    errorMessage.value = "";

    try {

        const response = await axios.get(
            `${API_URL}/vendors/admin/all`,
            {
                withCredentials: true
            }
        );

        vendors.value = response.data.data || [];

    } catch (error) {

        console.error(
            "Gagal mengambil data vendor:",
            error
        );

        errorMessage.value =
            error.response?.data?.message ||
            "Gagal mengambil data vendor.";

    } finally {

        loading.value = false;

    }

};


/* =========================================
   TAMBAH VENDOR
========================================= */

const openAddModal = () => {

    editingVendor.value = null;

    resetForm();

    showModal.value = true;

};


/* =========================================
   EDIT VENDOR
========================================= */

const openEditModal = (vendor) => {

    editingVendor.value = vendor;

    form.value = {

        businessName: vendor.businessName || "",

        category: vendor.category || "",

        description: vendor.description || "",

        address: vendor.address || "",

        phoneNumber: vendor.phoneNumber || "",

        whatsappNumber: vendor.whatsappNumber || "",

        priceRange: vendor.priceRange || "",

        logoUrl: vendor.logoUrl || ""

    };

    showModal.value = true;

};


/* =========================================
   CLOSE MODAL
========================================= */

const closeModal = () => {

    showModal.value = false;

    editingVendor.value = null;

    resetForm();

};


/* =========================================
   SAVE VENDOR
========================================= */

const saveVendor = async () => {

    saving.value = true;

    try {

        /* =====================================
           EDIT VENDOR
        ===================================== */

        if (editingVendor.value) {

            await axios.put(
                `${API_URL}/vendors/${editingVendor.value.id}`,

                {
                    ...form.value,

                    /*
                     * Pertahankan status vendor
                     * saat melakukan edit.
                     */
                    isActive:
                        editingVendor.value.isActive
                },

                {
                    withCredentials: true
                }
            );

            await Swal.fire({

                icon: "success",

                title: "Berhasil",

                text:
                    "Data vendor berhasil diperbarui.",

                timer: 1800,

                showConfirmButton: false

            });

        }

        /* =====================================
           TAMBAH VENDOR
        ===================================== */

        else {

            await axios.post(
                `${API_URL}/vendors`,

                {
                    ...form.value,

                    /*
                     * Vendor baru langsung aktif
                     * agar tampil di katalog.
                     */
                    isActive: true
                },

                {
                    withCredentials: true
                }
            );

            await Swal.fire({

                icon: "success",

                title: "Berhasil",

                text:
                    "Vendor berhasil ditambahkan.",

                timer: 1800,

                showConfirmButton: false

            });

        }


        closeModal();

        await loadVendors();

    } catch (error) {

        console.error(
            "Gagal menyimpan vendor:",
            error
        );

        await Swal.fire({

            icon: "error",

            title: "Gagal",

            text:
                error.response?.data?.message ||
                "Gagal menyimpan data vendor."

        });

    } finally {

        saving.value = false;

    }

};


/* =========================================
   TOGGLE STATUS VENDOR
========================================= */

const toggleStatus = async (vendor) => {

    const newStatus = !vendor.isActive;


    /* =====================================
       KONFIRMASI
    ===================================== */

    const result = await Swal.fire({

        icon: "question",

        title: newStatus
            ? "Aktifkan vendor?"
            : "Nonaktifkan vendor?",

        text: newStatus

            ? `Vendor "${vendor.businessName}" akan kembali tampil di katalog.`

            : `Vendor "${vendor.businessName}" tidak akan tampil di katalog.`,

        showCancelButton: true,

        confirmButtonText:
            newStatus
                ? "Ya, Aktifkan"
                : "Ya, Nonaktifkan",

        cancelButtonText: "Batal"

    });


    if (!result.isConfirmed) {

        return;

    }


    try {

        /*
         * Kirim seluruh data vendor.
         * Ini membuat perubahan status
         * lebih aman terhadap struktur
         * endpoint PUT vendor.
         */

        await axios.put(

            `${API_URL}/vendors/${vendor.id}`,

            {
                adminId: vendor.adminId,

                businessName: vendor.businessName,

                category: vendor.category,

                description: vendor.description,

                address: vendor.address,

                phoneNumber: vendor.phoneNumber,

                whatsappNumber: vendor.whatsappNumber,

                logoUrl: vendor.logoUrl || null,

                priceRange: vendor.priceRange,

                isActive: newStatus

            },

            {
                withCredentials: true

            }

        );


        await Swal.fire({

            icon: "success",

            title: "Berhasil",

            text: newStatus

                ? `Vendor "${vendor.businessName}" berhasil diaktifkan.`

                : `Vendor "${vendor.businessName}" berhasil dinonaktifkan.`,

            timer: 1600,

            showConfirmButton: false

        });


        /*
         * Ambil ulang data dari database
         * agar status yang ditampilkan
         * benar-benar sesuai database.
         */

        await loadVendors();

    } catch (error) {

        console.error(
            "Gagal mengubah status vendor:",
            error
        );

        await Swal.fire({

            icon: "error",

            title: "Gagal",

            text:
                error.response?.data?.message ||
                "Gagal mengubah status vendor."

        });

    }

};


/* =========================================
   DELETE VENDOR
========================================= */

const deleteVendor = async (vendor) => {

    const result = await Swal.fire({

        icon: "warning",

        title: "Hapus vendor?",

        text:
            `Data "${vendor.businessName}" akan dihapus.`,

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

            `${API_URL}/vendors/${vendor.id}`,

            {
                withCredentials: true
            }

        );


        await Swal.fire({

            icon: "success",

            title: "Berhasil",

            text:
                "Vendor berhasil dihapus.",

            timer: 1600,

            showConfirmButton: false

        });


        await loadVendors();

    } catch (error) {

        console.error(
            "Gagal menghapus vendor:",
            error
        );

        await Swal.fire({

            icon: "error",

            title: "Gagal",

            text:
                error.response?.data?.message ||
                "Gagal menghapus vendor."

        });

    }

};


/* =========================================
   ON MOUNTED
========================================= */

onMounted(() => {

    loadVendors();

});

</script>


<style scoped>

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
    max-width: 700px;

    max-height: 90vh;
    overflow-y: auto;

    background: white;

    border-radius: 12px;

    padding: 30px;

    box-shadow:
        0 15px 40px rgba(0, 0, 0, 0.2);
}


/* =========================================
   RESPONSIVE TABLE ACTION
========================================= */

.table td:last-child {
    min-width: 260px;
}


@media (max-width: 768px) {

    .table td:last-child {
        min-width: 220px;
    }

}

</style>