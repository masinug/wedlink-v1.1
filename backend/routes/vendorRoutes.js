const express = require("express");

const prisma = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// ADMIN - GET SEMUA VENDOR
// ==========================================
router.get("/admin/all", authMiddleware, async (req, res) => {
    try {
        const vendors = await prisma.vendor.findMany({
            orderBy: {
                id: "desc"
            },
            include: {
                packages: true,
                reviews: true
            }
        });

        res.json({
            success: true,
            message: "Data semua vendor berhasil diambil",
            data: vendors
        });

    } catch (error) {
        console.error("Get all vendors error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil data vendor"
        });
    }
});

// ========================================
// GET SEMUA VENDOR
// GET /api/vendors
// ========================================

router.get("/", async (req, res) => {
    try {
        const { search, category } = req.query;

        const where = {
            isActive: true
        };

        // Search berdasarkan nama vendor
        if (search) {
            where.businessName = {
                contains: search
            };
        }

        // Filter berdasarkan kategori
        if (category) {
            where.category = category;
        }

        const vendors = await prisma.vendor.findMany({
            where,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                businessName: true,
                category: true,
                description: true,
                address: true,
                phoneNumber: true,
                whatsappNumber: true,
                logoUrl: true,
                priceRange: true,
                isActive: true,
                createdAt: true
            }
        });

        res.json({
            success: true,
            message: "Data vendor berhasil diambil",
            data: vendors
        });

    } catch (error) {
        console.error("Get vendors error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil data vendor"
        });
    }
});

// ========================================
// GET DETAIL VENDOR
// GET /api/vendors/:id
// ========================================

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID vendor tidak valid"
            });
        }

        const vendor = await prisma.vendor.findFirst({
            where: {
                id: id,
                isActive: true
            },
            select: {
                id: true,
                businessName: true,
                category: true,
                description: true,
                address: true,
                phoneNumber: true,
                whatsappNumber: true,
                logoUrl: true,
                priceRange: true,
                isActive: true,
                createdAt: true,

                packages: {
                    orderBy: {
                        price: "asc"
                    }
                },

                reviews: {
                    where: {
                        isApproved: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    },
                    select: {
                        id: true,
                        customerName: true,
                        rating: true,
                        comment: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Detail vendor berhasil diambil",
            data: vendor
        });

    } catch (error) {
        console.error("Get vendor detail error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil detail vendor"
        });
    }
});

// ========================================
// TAMBAH VENDOR
// POST /api/vendors
// ADMIN ONLY
// ========================================

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            businessName,
            category,
            description,
            address,
            phoneNumber,
            whatsappNumber,
            logoUrl,
            priceRange
        } = req.body;

        // Validasi field wajib
        if (
            !businessName ||
            !category ||
            !description ||
            !address ||
            !phoneNumber ||
            !whatsappNumber ||
            !priceRange
        ) {
            return res.status(400).json({
                success: false,
                message: "Field vendor wajib diisi lengkap"
            });
        }

        const vendor = await prisma.vendor.create({
            data: {
                adminId: req.session.adminId,
                businessName,
                category,
                description,
                address,
                phoneNumber,
                whatsappNumber,
                logoUrl: logoUrl || null,
                priceRange,
                isActive: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Vendor berhasil ditambahkan",
            data: vendor
        });

    } catch (error) {
        console.error("Create vendor error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal menambahkan vendor"
        });
    }
});

// ========================================
// UPDATE VENDOR
// PUT /api/vendors/:id
// ADMIN ONLY
// ========================================

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID vendor tidak valid"
            });
        }

        const {
            businessName,
            category,
            description,
            address,
            phoneNumber,
            whatsappNumber,
            logoUrl,
            priceRange,
            isActive
        } = req.body;

        const existingVendor = await prisma.vendor.findUnique({
            where: {
                id
            }
        });

        if (!existingVendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor tidak ditemukan"
            });
        }

        const vendor = await prisma.vendor.update({
            where: {
                id
            },
            data: {
                businessName,
                category,
                description,
                address,
                phoneNumber,
                whatsappNumber,
                logoUrl: logoUrl || null,
                priceRange,
                isActive
            }
        });

        res.json({
            success: true,
            message: "Vendor berhasil diperbarui",
            data: vendor
        });

    } catch (error) {
        console.error("Update vendor error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal memperbarui vendor"
        });
    }
});

// ========================================
// HAPUS VENDOR
// DELETE /api/vendors/:id
// ADMIN ONLY
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID vendor tidak valid"
            });
        }

        const existingVendor = await prisma.vendor.findUnique({
            where: {
                id
            }
        });

        if (!existingVendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor tidak ditemukan"
            });
        }

        await prisma.vendor.delete({
            where: {
                id
            }
        });

        res.json({
            success: true,
            message: "Vendor berhasil dihapus"
        });

    } catch (error) {
        console.error("Delete vendor error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal menghapus vendor"
        });
    }
});

module.exports = router;