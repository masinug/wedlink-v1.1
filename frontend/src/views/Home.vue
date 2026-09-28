<template>
    <div class="wedlink-page">

        <!-- =========================================
             HERO
        ========================================== -->
        <section class="hero-section">
            <div class="container">
                <div class="row align-items-center">

                    <div class="col-lg-8">

                        <span class="hero-badge">
                            E-Katalog Vendor Pernikahan
                        </span>

                        <h1 class="hero-title">
                            Temukan Vendor Pernikahan
                            <span>Impian Anda</span>
                        </h1>

                        <p class="hero-description mt-4">
                            WedLink membantu calon pengantin menemukan
                            informasi vendor pernikahan secara lebih mudah,
                            terstruktur, dan informatif dalam satu e-katalog.
                        </p>

                        <div class="hero-actions mt-4">

                            <router-link
                                to="/vendors"
                                class="btn btn-wedlink btn-lg"
                            >
                                Cari Vendor
                            </router-link>

                        </div>

                    </div>

                </div>
            </div>
        </section>


        <!-- =========================================
             CATEGORY
        ========================================== -->
        <section class="section-padding">

            <div class="container">

                <div class="text-center mb-5">

                    <span class="section-badge">
                        Pilihan Kategori
                    </span>

                    <h2 class="section-title mt-2">
                        Kategori Vendor
                    </h2>

                    <p class="section-description">
                        Jelajahi vendor berdasarkan jenis layanan
                        yang Anda butuhkan untuk mempersiapkan pernikahan.
                    </p>

                </div>


                <div class="row g-4 justify-content-center">

                    <!-- CATERING -->
                    <div class="col-6 col-md-4 col-lg-3">

                        <router-link
                            to="/vendors?category=Catering"
                            class="category-card-link"
                        >

                            <div class="category-card">

                                <div class="category-icon">
                                    🍽️
                                </div>

                                <h5>
                                    Catering
                                </h5>

                                <p>
                                    Layanan catering
                                </p>

                            </div>

                        </router-link>

                    </div>


                    <!-- DECORATION -->
                    <div class="col-6 col-md-4 col-lg-3">

                        <router-link
                            to="/vendors?category=Decoration"
                            class="category-card-link"
                        >

                            <div class="category-card">

                                <div class="category-icon">
                                    🌸
                                </div>

                                <h5>
                                    Decoration
                                </h5>

                                <p>
                                    Dekorasi pernikahan
                                </p>

                            </div>

                        </router-link>

                    </div>


                    <!-- PHOTOGRAPHY -->
                    <div class="col-6 col-md-4 col-lg-3">

                        <router-link
                            to="/vendors?category=Photography"
                            class="category-card-link"
                        >

                            <div class="category-card">

                                <div class="category-icon">
                                    📷
                                </div>

                                <h5>
                                    Photography
                                </h5>

                                <p>
                                    Foto dan video
                                </p>

                            </div>

                        </router-link>

                    </div>

                </div>

            </div>

        </section>


        <!-- =========================================
             HOW WEDLINK WORKS
        ========================================== -->
        <section class="section-padding wedlink-how-section">

            <div class="container">

                <div class="text-center mb-5">

                    <span class="section-badge">
                        Cara Kerja WedLink
                    </span>

                    <h2 class="section-title mt-2">
                        Temukan Vendor dengan Mudah
                    </h2>

                    <p class="section-description">
                        WedLink membantu mempertemukan calon pengantin
                        dengan informasi vendor yang sesuai kebutuhan.
                    </p>

                </div>


                <div class="row g-4">

                    <!-- STEP 1 -->
                    <div class="col-md-4">

                        <div class="how-card">

                            <div class="how-number">
                                1
                            </div>

                            <h4>
                                Cari Vendor
                            </h4>

                            <p>
                                Gunakan katalog, pencarian, dan kategori
                                untuk menemukan vendor pernikahan.
                            </p>

                        </div>

                    </div>


                    <!-- STEP 2 -->
                    <div class="col-md-4">

                        <div class="how-card">

                            <div class="how-number">
                                2
                            </div>

                            <h4>
                                Lihat Informasi
                            </h4>

                            <p>
                                Bandingkan informasi vendor seperti layanan,
                                paket, harga, lokasi, dan review.
                            </p>

                        </div>

                    </div>


                    <!-- STEP 3 -->
                    <div class="col-md-4">

                        <div class="how-card">

                            <div class="how-number">
                                3
                            </div>

                            <h4>
                                Hubungi Vendor
                            </h4>

                            <p>
                                Hubungi vendor secara langsung melalui
                                WhatsApp untuk informasi dan pemesanan.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>


        <!-- =========================================
             VENDOR CTA
        ========================================== -->
        <section class="section-padding">

            <div class="container">

                <div class="row justify-content-center">

                    <div class="col-lg-9">

                        <div class="vendor-home-cta">

                            <span class="section-badge">
                                Untuk Vendor
                            </span>

                            <h2 class="section-title mt-2">
                                Ingin Vendor Anda Tampil di WedLink?
                            </h2>

                            <p class="section-description mb-4">
                                WedLink menyediakan media promosi digital
                                melalui e-katalog vendor pernikahan.
                                Hubungi Admin untuk mendapatkan informasi
                                mengenai layanan promosi dan pemasangan
                                vendor.
                            </p>

                            <a
                                :href="adminWhatsAppLink"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-wedlink btn-lg"
                            >
                                💬 Hubungi Admin
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </section>


        <!-- =========================================
             FOOTER
        ========================================== -->
        <footer class="wedlink-footer">

            <div class="container">

                <div class="row g-4">

                    <div class="col-md-7">

                        <div class="footer-brand">
                            WedLink
                        </div>

                        <p class="mt-3 mb-0">
                            E-katalog vendor pernikahan yang membantu
                            calon pengantin menemukan informasi vendor
                            sesuai kebutuhan.
                        </p>

                    </div>


                    <div class="col-md-5 text-md-end">

                        <p class="mb-2">
                            © 2026 WedLink V1.1
                        </p>

                        <p class="mb-0">
                            E-Katalog Vendor Pernikahan
                        </p>

                    </div>

                </div>

            </div>

        </footer>

    </div>
</template>


<script setup>

import { computed } from "vue";
import { WEDLINK_CONFIG } from "../config";


/* =========================================
   ADMIN WHATSAPP
========================================= */

const adminWhatsAppLink = computed(() => {

    let number =
        WEDLINK_CONFIG.adminWhatsApp || "";

    number =
        number.replace(/\D/g, "");

    if (number.startsWith("0")) {

        number =
            "62" +
            number.substring(1);

    }


    const message =
        "Halo Admin WedLink, saya ingin mengetahui " +
        "informasi mengenai layanan promosi vendor " +
        "di e-katalog WedLink.";

    return (
        `https://wa.me/${number}` +
        `?text=${encodeURIComponent(message)}`
    );

});

</script>