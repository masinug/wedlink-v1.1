const express = require("express");

const prisma = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// ADMIN - GET SEMUA REVIEW
// ==========================================
router.get("/admin/all", authMiddleware, async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                vendor: {
                    select: {
                        id: true,
                        businessName: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        });

        res.json({
            success: true,
            message: "Data semua review berhasil diambil",
            data: reviews
        });

    } catch (error) {
        console.error("Get all reviews error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil data review"
        });
    }
});

// ========================================
// GET REVIEW VENDOR
// GET /api/reviews/vendor/:vendorId
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

        const reviews = await prisma.review.findMany({
            where: {
                vendorId: vendorId,
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
        });

        res.json({
            success: true,
            message: "Review berhasil diambil",
            data: reviews
        });

    } catch (error) {
        console.error("Get reviews error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengambil review"
        });
    }
});

// ========================================
// TAMBAH REVIEW
// POST /api/reviews/vendor/:vendorId
// PUBLIC
// ========================================

router.post("/vendor/:vendorId", async (req, res) => {
    try {
        const vendorId = Number(req.params.vendorId);

        if (isNaN(vendorId)) {
            return res.status(400).json({
                success: false,
                message: "ID vendor tidak valid"
            });
        }

        const {
            customerName,
            rating,
            comment
        } = req.body;

        // Validasi
        if (!comment || rating === undefined) {
            return res.status(400).json({
                success: false,
                message: "Rating dan komentar wajib diisi"
            });
        }

        const numericRating = Number(rating);

        if (
            isNaN(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating harus antara 1 sampai 5"
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

        const review = await prisma.review.create({
            data: {
                vendorId: vendorId,
                customerName: customerName || "Anonim",
                rating: numericRating,
                comment,
                isApproved: false
            }
        });

        res.status(201).json({
            success: true,
            message: "Review berhasil dikirim dan menunggu persetujuan Admin",
            data: review
        });

    } catch (error) {
        console.error("Create review error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal mengirim review"
        });
    }
});

// ========================================
// APPROVE REVIEW
// PATCH /api/reviews/:id/approve
// ADMIN ONLY
// ========================================

router.patch("/:id/approve", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID review tidak valid"
            });
        }

        const existingReview = await prisma.review.findUnique({
            where: {
                id
            }
        });

        if (!existingReview) {
            return res.status(404).json({
                success: false,
                message: "Review tidak ditemukan"
            });
        }

        const review = await prisma.review.update({
            where: {
                id
            },
            data: {
                isApproved: true
            }
        });

        res.json({
            success: true,
            message: "Review berhasil disetujui",
            data: review
        });

    } catch (error) {
        console.error("Approve review error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal menyetujui review"
        });
    }
});

// ========================================
// DELETE REVIEW
// DELETE /api/reviews/:id
// ADMIN ONLY
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID review tidak valid"
            });
        }

        const existingReview = await prisma.review.findUnique({
            where: {
                id
            }
        });

        if (!existingReview) {
            return res.status(404).json({
                success: false,
                message: "Review tidak ditemukan"
            });
        }

        await prisma.review.delete({
            where: {
                id
            }
        });

        res.json({
            success: true,
            message: "Review berhasil dihapus"
        });

    } catch (error) {
        console.error("Delete review error:", error);

        res.status(500).json({
            success: false,
            message: "Gagal menghapus review"
        });
    }
});

module.exports = router;