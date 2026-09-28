const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    console.log("========================================");
    console.log("Memulai seed WedLink V1.1...");
    console.log("========================================");

    // ========================================
    // 1. BERSIHKAN DATA LAMA
    // ========================================

    console.log("Membersihkan data lama...");

    // Urutan penting karena ada relasi foreign key
    await prisma.review.deleteMany();
    await prisma.package.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.admin.deleteMany();

    console.log("Data lama berhasil dibersihkan.");

    // ========================================
    // 2. ADMIN
    // ========================================

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.admin.create({
        data: {
            username: "admin",
            password: hashedPassword,
            name: "Administrator WedLink"
        }
    });

    console.log(`Admin berhasil dibuat: ${admin.username}`);

    // ========================================
    // 3. VENDOR
    // ========================================

    const vendor1 = await prisma.vendor.create({
        data: {
            adminId: admin.id,
            businessName: "Citra Catering",
            category: "Catering",
            description:
                "Citra Catering menyediakan layanan catering pernikahan dengan berbagai pilihan menu dan paket sesuai kebutuhan acara.",
            address: "Purwokerto, Jawa Tengah",
            phoneNumber: "081234567890",
            whatsappNumber: "6281234567890",
            logoUrl: null,
            priceRange: "Rp 15.000.000 - Rp 40.000.000",
            isActive: true
        }
    });

    const vendor2 = await prisma.vendor.create({
        data: {
            adminId: admin.id,
            businessName: "Elegant Decoration",
            category: "Decoration",
            description:
                "Elegant Decoration menyediakan dekorasi pelaminan dan venue dengan berbagai konsep modern, minimalis, dan elegan.",
            address: "Banyumas, Jawa Tengah",
            phoneNumber: "081298765432",
            whatsappNumber: "6281298765432",
            logoUrl: null,
            priceRange: "Rp 10.000.000 - Rp 35.000.000",
            isActive: true
        }
    });

    const vendor3 = await prisma.vendor.create({
        data: {
            adminId: admin.id,
            businessName: "Moment Photography",
            category: "Photography",
            description:
                "Moment Photography menyediakan jasa foto dan video pernikahan untuk mengabadikan berbagai momen penting dalam acara pernikahan.",
            address: "Purbalingga, Jawa Tengah",
            phoneNumber: "081311223344",
            whatsappNumber: "6281311223344",
            logoUrl: null,
            priceRange: "Rp 5.000.000 - Rp 15.000.000",
            isActive: true
        }
    });

    console.log("3 vendor berhasil dibuat.");

    // ========================================
    // 4. PACKAGE
    // ========================================

    await prisma.package.createMany({
        data: [
            {
                vendorId: vendor1.id,
                packageName: "Paket Catering Silver",
                price: 15000000,
                description:
                    "Paket catering untuk acara pernikahan dengan pilihan menu utama dan makanan pendamping."
            },
            {
                vendorId: vendor1.id,
                packageName: "Paket Catering Gold",
                price: 25000000,
                description:
                    "Paket catering lengkap dengan pilihan menu yang lebih beragam untuk acara pernikahan."
            },
            {
                vendorId: vendor2.id,
                packageName: "Dekorasi Minimalis",
                price: 10000000,
                description:
                    "Dekorasi pelaminan dengan konsep minimalis dan elegan."
            },
            {
                vendorId: vendor2.id,
                packageName: "Dekorasi Premium",
                price: 25000000,
                description:
                    "Dekorasi lengkap dengan konsep premium dan berbagai ornamen dekorasi."
            },
            {
                vendorId: vendor3.id,
                packageName: "Photography Basic",
                price: 5000000,
                description:
                    "Dokumentasi foto pernikahan untuk acara utama dan sesi foto pasangan."
            },
            {
                vendorId: vendor3.id,
                packageName: "Photography & Video Premium",
                price: 12000000,
                description:
                    "Paket dokumentasi foto dan video lengkap untuk mengabadikan seluruh rangkaian acara."
            }
        ]
    });

    console.log("6 package berhasil dibuat.");

    // ========================================
    // 5. REVIEW
    // ========================================

    await prisma.review.createMany({
        data: [
            {
                vendorId: vendor1.id,
                customerName: "Rina",
                rating: 5,
                comment:
                    "Pilihan menu cukup banyak dan pelayanan sangat baik.",
                isApproved: true
            },
            {
                vendorId: vendor2.id,
                customerName: "Dewi",
                rating: 5,
                comment:
                    "Dekorasinya bagus dan sesuai dengan konsep yang kami inginkan.",
                isApproved: true
            },
            {
                vendorId: vendor3.id,
                customerName: "Andi",
                rating: 4,
                comment:
                    "Hasil foto bagus dan fotografer cukup komunikatif.",
                isApproved: true
            },
            {
                vendorId: vendor3.id,
                customerName: "Anonim",
                rating: 5,
                comment:
                    "Hasil dokumentasi sangat bagus.",
                isApproved: false
            }
        ]
    });

    console.log("4 review berhasil dibuat.");

    // ========================================
    // 6. HASIL AKHIR
    // ========================================

    const adminCount = await prisma.admin.count();
    const vendorCount = await prisma.vendor.count();
    const packageCount = await prisma.package.count();
    const reviewCount = await prisma.review.count();

    console.log("");
    console.log("========================================");
    console.log("SEED WEDLINK V1.1 BERHASIL");
    console.log("========================================");
    console.log(`Admin   : ${adminCount}`);
    console.log(`Vendor  : ${vendorCount}`);
    console.log(`Package : ${packageCount}`);
    console.log(`Review  : ${reviewCount}`);
    console.log("========================================");
}

main()
    .catch((error) => {
        console.error("Seed gagal:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });