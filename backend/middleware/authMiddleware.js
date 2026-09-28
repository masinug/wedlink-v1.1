// ========================================
// MIDDLEWARE AUTH ADMIN
// ========================================

const authMiddleware = (req, res, next) => {

    // Cek apakah Admin sudah login
    if (!req.session || !req.session.adminId) {
        return res.status(401).json({
            success: false,
            message: "Akses ditolak. Admin harus login terlebih dahulu."
        });
    }

    // Session valid
    next();
};

module.exports = authMiddleware;