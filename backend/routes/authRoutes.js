const express = require("express");
const bcrypt = require("bcrypt");

const prisma = require("../config/database");

const router = express.Router();

// ========================================
// LOGIN ADMIN
// POST /api/auth/login
// ========================================

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username dan password wajib diisi"
            });
        }

        // Cari admin berdasarkan username
        const admin = await prisma.admin.findUnique({
            where: {
                username: username
            }
        });

        // Jika username tidak ditemukan
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Username atau password salah"
            });
        }

        // Cek password
        const passwordValid = await bcrypt.compare(
            password,
            admin.password
        );

        // Jika password salah
        if (!passwordValid) {
            return res.status(401).json({
                success: false,
                message: "Username atau password salah"
            });
        }

        // ========================================
        // SIMPAN SESSION ADMIN
        // ========================================

        req.session.adminId = admin.id;
        req.session.username = admin.username;
        req.session.name = admin.name;

        // Response berhasil
        res.json({
            success: true,
            message: "Login berhasil",
            data: {
                id: admin.id,
                username: admin.username,
                name: admin.name
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
});

// ========================================
// CEK SESSION ADMIN
// GET /api/auth/me
// ========================================

router.get("/me", async (req, res) => {
    try {
        if (!req.session.adminId) {
            return res.status(401).json({
                success: false,
                message: "Admin belum login"
            });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                id: req.session.adminId
            },
            select: {
                id: true,
                username: true,
                name: true
            }
        });

        if (!admin) {
            req.session.destroy(() => {});

            return res.status(401).json({
                success: false,
                message: "Session admin tidak valid"
            });
        }

        res.json({
            success: true,
            message: "Session admin valid",
            data: admin
        });

    } catch (error) {
        console.error("Check session error:", error);

        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
});

// ========================================
// LOGOUT ADMIN
// POST /api/auth/logout
// ========================================

router.post("/logout", (req, res) => {
    req.session.destroy((error) => {

        if (error) {
            console.error("Logout error:", error);

            return res.status(500).json({
                success: false,
                message: "Logout gagal"
            });
        }

        res.json({
            success: true,
            message: "Logout berhasil"
        });
    });
});

module.exports = router;