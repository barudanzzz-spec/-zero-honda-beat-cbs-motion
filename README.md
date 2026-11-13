# ZERO HONDA MOTION — Beat CBS

Project Remotion vertikal 1080x1920, 30 fps, 30 detik. Sudah menyertakan karakter presenter anime dari gambar yang diberikan.

## Jalankan di Termux
Simpan/ekstrak project di home Termux, bukan di `/storage/emulated/0/Download`, karena Android shared storage sering menolak symlink npm.

```bash
cd ~
unzip ~/storage/downloads/zero-honda-beat-cbs-motion.zip
cd zero-honda-beat-cbs-motion
npm install
npm run dev
```

Buka Chrome: `http://localhost:3000`

## Ubah detail promo
Edit `src/Root.tsx`:
- `whatsapp`: nomor kontak
- `dp`: nominal DP
- `presenter`: label nama sales

Dialog ada di `VOICEOVER-DIALOG.md`.

## Catatan gambar dan motor
Karakter presenter sudah disertakan. Visual motor Beat saat ini berupa teks/layout motion graphic; tambahkan foto Honda Beat CBS resmi/dealer yang memang boleh digunakan agar produk terlihat. Jangan memakai foto varian lain.

## Render
`npm run render`

Rendering MP4 melalui Remotion CLI di Android/Termux belum tentu didukung karena membutuhkan Chromium headless dan FFmpeg yang kompatibel. Preview browser bisa dicoba, tetapi ekspor MP4 mungkin perlu komputer atau lingkungan render yang didukung.
