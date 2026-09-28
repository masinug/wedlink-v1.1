\# WedLink V1.1



\*\*Sistem Informasi E-Katalog Vendor Pernikahan Berbasis Web\*\*



WedLink V1.1 merupakan aplikasi web e-katalog vendor pernikahan yang membantu calon pengantin menemukan informasi vendor, melihat paket layanan, membaca ulasan, serta menghubungi vendor secara langsung.



WedLink \*\*bukan sistem booking atau pembayaran online\*\*. Proses pemesanan dilakukan langsung antara calon pelanggan dan vendor melalui kontak yang tersedia.



\---



\## 1. Fitur Utama



\### Pengunjung / Customer



\* Melihat katalog vendor.

\* Mencari dan melihat detail vendor.

\* Melihat paket layanan vendor.

\* Melihat portfolio/gambar vendor.

\* Melihat review yang telah disetujui Admin.

\* Mengirim review tanpa login.

\* Memilih menggunakan nama atau anonim.

\* Menghubungi vendor secara langsung melalui WhatsApp/kontak vendor.



\### Admin



\* Login ke halaman Admin.

\* Mengelola data vendor.

\* Menambah, mengubah, menghapus, dan mengaktifkan/nonaktifkan vendor.

\* Mengelola paket vendor.

\* Mengelola review customer.

\* Menyetujui atau menolak review sebelum ditampilkan kepada publik.

\* Logout dan perlindungan halaman Admin.



\### Vendor



Vendor \*\*tidak memiliki akun/login\*\* pada WedLink V1.1.



Vendor yang ingin ditampilkan atau mempromosikan jasanya di WedLink dapat menghubungi Admin.



\---



\## 2. Teknologi



\### Frontend



\* Vue 3

\* Vite

\* Vue Router

\* Axios

\* Bootstrap 5

\* SweetAlert2



\### Backend



\* Node.js

\* Express.js

\* Prisma ORM

\* MySQL

\* bcrypt

\* express-session

\* CORS

\* dotenv



\---



\## 3. Struktur Project



```text

wedlink-v1.1/

│

├── backend/

│   ├── config/

│   ├── middleware/

│   ├── prisma/

│   │   ├── migrations/

│   │   ├── schema.prisma

│   │   └── seed.js

│   ├── routes/

│   ├── .env

│   ├── .env.example

│   ├── package.json

│   └── server.js

│

├── frontend/

│   ├── public/

│   │   └── images/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── router/

│   │   └── views/

│   ├── package.json

│   └── vite.config.js

│

└── README.md

```



\---



\## 4. Persyaratan



Pastikan komputer sudah memiliki:



\* Node.js

\* npm

\* MySQL

\* Git



Versi yang digunakan dalam pengembangan:



```text

Node.js : v24.16.0

npm     : 11.6.2

Prisma  : 6.19.0

```



\---



\## 5. Clone Project



Clone repository:



```bash

git clone https://github.com/masinug/wedlink-v1.1.git

```



Masuk ke folder:



```bash

cd wedlink-v1.1

```



\---



\## 6. Instalasi Backend



Masuk ke folder backend:



```bash

cd backend

```



Install dependency:



```bash

npm install

```



\---



\## 7. Konfigurasi Database



Buat database MySQL untuk WedLink.



Kemudian buat file:



```text

backend/.env

```



Gunakan `.env.example` sebagai template.



Contoh format:



```env

DATABASE\_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE\_NAME"

```



Sesuaikan:



\* `USERNAME` dengan username MySQL.

\* `PASSWORD` dengan password MySQL.

\* `DATABASE\_NAME` dengan nama database WedLink.



\*\*Jangan meng-upload file `.env` ke GitHub.\*\*



File `.env` berisi konfigurasi lokal dan dapat mengandung informasi sensitif.



\---



\## 8. Setup Prisma



Setelah database dan `.env` dikonfigurasi, jalankan:



```bash

npx prisma migrate deploy

```



Kemudian jika diperlukan data awal:



```bash

node prisma/seed.js

```



Untuk melihat database melalui Prisma Studio:



```bash

npx prisma studio

```



\---



\## 9. Menjalankan Backend



Dari folder:



```text

wedlink-v1.1/backend

```



jalankan:



```bash

npm run dev

```



Backend berjalan pada:



```text

http://localhost:3000

```



\---



\## 10. Instalasi Frontend



Buka \*\*CMD/terminal baru\*\*.



Masuk ke:



```bash

cd D:\\wedlink-v1.1\\frontend

```



Jika melakukan clone di lokasi berbeda, gunakan lokasi folder project masing-masing.



Install dependency:



```bash

npm install

```



\---



\## 11. Menjalankan Frontend



Dari folder frontend:



```bash

npm run dev

```



Frontend berjalan pada:



```text

http://localhost:5173

```



Buka alamat tersebut melalui browser.



\---



\## 12. Akun Admin



WedLink V1.1 menggunakan login khusus Admin.



Akun Admin dibuat melalui proses seed database.



Untuk keamanan, jangan menyimpan password produksi atau password pribadi di repository GitHub.



\---



\## 13. Media / Gambar



Gambar vendor dapat ditempatkan pada:



```text

frontend/public/images/vendors/

```



Contoh:



```text

frontend/public/images/vendors/citra-catering.png

```



Kemudian URL yang disimpan pada database:



```text

/images/vendors/citra-catering.png

```



Untuk gambar paket dapat menggunakan:



```text

frontend/public/images/packages/

```



\---



\## 14. Alur Penggunaan



```text

Customer

&#x20;  │

&#x20;  ▼

Halaman Beranda

&#x20;  │

&#x20;  ▼

Katalog Vendor

&#x20;  │

&#x20;  ▼

Detail Vendor

&#x20;  │

&#x20;  ├── Lihat Paket

&#x20;  ├── Lihat Review

&#x20;  ├── Kirim Review

&#x20;  │

&#x20;  └── Hubungi Vendor

```



Review customer:



```text

Customer

&#x20;  │

&#x20;  ▼

Kirim Review

&#x20;  │

&#x20;  ▼

Status Pending

&#x20;  │

&#x20;  ▼

Admin Memeriksa

&#x20;  │

&#x20;  ├── Tolak ──► Tidak ditampilkan

&#x20;  │

&#x20;  └── Setujui

&#x20;         │

&#x20;         ▼

&#x20;  Ditampilkan di Katalog

```



\---



\## 15. Git Workflow untuk Tim



Sebelum mulai bekerja:



```bash

git pull origin main

```



Setelah melakukan perubahan:



```bash

git status

```



Tambahkan perubahan:



```bash

git add .

```



Commit:



```bash

git commit -m "Deskripsi perubahan"

```



Push:



```bash

git push origin main

```



\### Sebelum bekerja



Selalu lakukan:



```bash

git pull origin main

```



\### Sebelum push



Pastikan:



```bash

git status

```



dan periksa perubahan agar tidak meng-upload file yang tidak seharusnya.



\---



\## 16. Catatan Kerja Tim



Untuk menghindari konflik Git:



\* Jangan mengedit file yang sama secara bersamaan tanpa koordinasi.

\* Selalu `git pull` sebelum mulai bekerja.

\* Gunakan commit yang menjelaskan perubahan.

\* Jangan menghapus perubahan anggota tim tanpa koordinasi.

\* Jangan meng-upload `.env`.

\* Jangan mengubah struktur database secara sembarangan.

\* Jika melakukan perubahan Prisma schema, komunikasikan kepada anggota tim.



\---



\## 17. Status Project



WedLink V1.1 telah memiliki fitur utama:



\* Public landing page

\* Katalog vendor

\* Detail vendor

\* Paket vendor

\* Review customer tanpa login

\* Moderasi review oleh Admin

\* Kontak vendor

\* CRUD vendor

\* CRUD paket

\* Login Admin

\* Proteksi halaman Admin

\* Upload/penyimpanan gambar melalui folder public

\* Database MySQL dengan Prisma ORM



\*\*Status:\*\* Development / Capstone Project



\---



\## Repository



GitHub:



https://github.com/masinug/wedlink-v1.1.git



