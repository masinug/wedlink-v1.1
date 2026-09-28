const express = require("express");

const prisma = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// GET SEMUA PACKAGE BERDASARKAN VENDOR
// GET /api/vendors/:vendorId/packages
// PUBLIC
// ========================================

router.get("/vendor/:vendorId", async (req, res) => {
    try {
        const vendorId = Number(req.params.vendorId);

        if (isNaN(vendorId)) {
            return res.status(400).json({
                success: false,
                message: "ID vendor tidak valid"
            });
        }

        const vendor = await prisma.vendor.findFirst({
            where: {
                id: vendorId,
                isActive: true
            }
        });

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor tidak ditemukan"
            });
        }

        const packages = await prisma.package.findMany({
            where: {
                vendorId: vendorId
            },
            orderBy: {
                price: "asc"
            }
        });

        res.json({
            success: true,
            message: "Data package berhasil diambil",
            data: packages
        });

    } catch (error) {
        console.error("Get packages error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil data package"
        });
    }
});

// ========================================
// TAMBAH PACKAGE
// POST /api/vendors/:vendorId/packages
// ADMIN ONLY
// ========================================

router.post(
    "/vendor/:vendorId",
    authMiddleware,
    async (req, res) => {
        try {
            const vendorId = Number(req.params.vendorId);

            if (isNaN(vendorId)) {
                return res.status(400).json({
                    success: false,
                    message: "ID vendor tidak valid"
                });
            }

            const {
                packageName,
                price,
                description,
                imageUrl
            } = req.body;

            if (
                !packageName ||
                price === undefined ||
                !description
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Nama package, harga, dan deskripsi wajib diisi"
                });
            }

            const vendor = await prisma.vendor.findUnique({
                where: {
                    id: vendorId
                }
            });

            if (!vendor) {
                return res.status(404).json({
                    success: false,
                    message: "Vendor tidak ditemukan"
                });
            }

            const packageData = await prisma.package.create({
                data: {
                    vendorId: vendorId,
                    packageName,
                    price: Number(price),
                    description,
                    imageUrl: imageUrl || null
                }
            });

            res.status(201).json({
                success: true,
                message: "Package berhasil ditambahkan",
                data: packageData
            });

        } catch (error) {
            console.error("Create package error:", error);

            res.status(500).json({
                success: false,
                message: "Gagal menambahkan package"
            });
        }
    }
);

// ========================================
// UPDATE PACKAGE
// PUT /api/packages/:id
// ADMIN ONLY
// ========================================

router.put(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "ID package tidak valid"
                });
            }

            const {
                packageName,
                price,
                description,
                imageUrl
            } = req.body;

            const existingPackage = await prisma.package.findUnique({
                where: {
                    id
                }
            });

            if (!existingPackage) {
                return res.status(404).json({
                    success: false,
                    message: "Package tidak ditemukan"
                });
            }

            const updatedPackage = await prisma.package.update({
                where: {
                    id
                },
                data: {
                    packageName,
                    price: Number(price),
                    description,
                    imageUrl: imageUrl || null
                }
            });

            res.json({
                success: true,
                message: "Package berhasil diperbarui",
                data: updatedPackage
            });

        } catch (error) {
            console.error("Update package error:", error);

            res.status(500).json({
                success: false,
                message: "Gagal memperbarui package"
            });
        }
    }
);

// ========================================
// DELETE PACKAGE
// DELETE /api/packages/:id
// ADMIN ONLY
// ========================================

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "ID package tidak valid"
                });
            }

            const existingPackage = await prisma.package.findUnique({
                where: {
                    id
                }
            });

            if (!existingPackage) {
                return res.status(404).json({
                    success: false,
                    message: "Package tidak ditemukan"
                });
            }

            await prisma.package.delete({
                where: {
                    id
                }
            });

            res.json({
                success: true,
                message: "Package berhasil dihapus"
            });

        } catch (error) {
            console.error("Delete package error:", error);

            res.status(500).json({
                success: false,
                message: "Gagal menghapus package"
            });
        }
    }
);

module.exports = router;