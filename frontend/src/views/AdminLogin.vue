<template>
  <div class="admin-login-page">

    <div class="container">
      <div class="row justify-content-center">

        <div class="col-md-6 col-lg-5">

          <div class="admin-login-card">

            <!-- HEADER -->
            <div class="text-center mb-4">

              <div class="admin-login-logo">
                WedLink
              </div>

              <h1>
                Login Admin
              </h1>

              <p>
                Masuk untuk mengelola katalog WedLink.
              </p>

            </div>

            <!-- FORM -->
            <form @submit.prevent="login">

              <!-- USERNAME -->
              <div class="mb-3">

                <label class="form-label fw-semibold">
                  Username
                </label>

                <input
                  v-model="username"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Masukkan username"
                  autocomplete="username"
                  required
                />

              </div>

              <!-- PASSWORD -->
              <div class="mb-4">

                <label class="form-label fw-semibold">
                  Password
                </label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Masukkan password"
                  autocomplete="current-password"
                  required
                />

              </div>

              <!-- BUTTON -->
              <button
                type="submit"
                class="btn btn-wedlink btn-lg w-100"
                :disabled="loading"
              >

                <span v-if="loading">
                  Memproses...
                </span>

                <span v-else>
                  Login
                </span>

              </button>

            </form>

            <!-- BACK -->
            <div class="text-center mt-4">

              <RouterLink
                to="/"
                class="back-link"
              >
                ← Kembali ke Beranda
              </RouterLink>

            </div>

          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false);

const API_URL = "http://localhost:3000";

const login = async () => {

  loading.value = true;

  try {

    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      {
        username: username.value,
        password: password.value
      },
      {
        withCredentials: true
      }
    );

    if (response.data.success) {

      await Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang, ${response.data.data.name}`,
        timer: 1500,
        showConfirmButton: false
      });

      router.push("/admin/dashboard");

    }

  } catch (error) {

    console.error("Login error:", error);

    let message =
      "Username atau password salah.";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: message
    });

  } finally {

    loading.value = false;

  }
};
</script>