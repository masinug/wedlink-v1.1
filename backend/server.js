const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const prisma = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const vendorRoutes = require("./routes/vendorRoutes");
const packageRoutes = require("./routes/packageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}));

app.use(express.json());

// ========================================
// SESSION
// ========================================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "wedlink_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 8
        }
    })
);

// ========================================
// AUTH ROUTES
// ========================================

app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reviews", reviewRoutes);

// ========================================
// TEST API
// ========================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "WedLink V1.1 API berhasil berjalan"
    });
});

// ========================================
// TEST DATABASE
// ========================================

app.get("/api/test-db", async (req, res) => {
    try {
        const adminCount = await prisma.admin.count();
        const vendorCount = await prisma.vendor.count();
        const packageCount = await prisma.package.count();
        const reviewCount = await prisma.review.count();

        res.json({
            success: true,
            message: "Database berhasil terhubung",
            data: {
                admins: adminCount,
                vendors: vendorCount,
                packages: packageCount,
                reviews: reviewCount
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database gagal terhubung",
            error: error.message
        });
    }
});

// ========================================
// TEST PROTECTED ADMIN API
// ========================================

app.get("/api/admin/test", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Akses Admin berhasil",
        data: {
            adminId: req.session.adminId,
            username: req.session.username,
            name: req.session.name
        }
    });
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `WedLink V1.1 API berjalan di http://localhost:${PORT}`
    );
});