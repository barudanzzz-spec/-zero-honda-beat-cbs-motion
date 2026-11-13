# Dialog voice-over — Honda Beat CBS (30 detik)

Gunakan gaya suara pria muda, ramah, enerjik, jelas, tempo sedang-cepat. Jangan terlalu berteriak.

**0–5 detik**
"Halo, guys! Lagi cari motor buat nemenin aktivitas sehari-hari?"

**5–11 detik**
"Nih, kenalan sama Honda Beat CBS. Praktis buat dipakai ke mana-mana!"

**11–18 detik**
"Dan ada penawaran DP mulai enam ratus ribu rupiah!"

**18–24 detik**
"Mau tahu simulasi kredit, pilihan tenor, atau cek promo yang tersedia? Tanya dulu aja!"

**24–30 detik**
"Langsung WhatsApp aku di nol delapan tiga delapan, sembilan sembilan lima sembilan, tujuh lima nol dua. Yuk, konsultasi!"

## Cara memasukkan suara
1. Rekam dialog di aplikasi perekam suara atau buat voice-over melalui layanan TTS yang kamu gunakan.
2. Simpan hasil akhir sebagai `public/voiceover.mp3`.
3. Di `src/Video.tsx`, tambahkan `Audio` ke import Remotion:
   `import {Audio} from 'remotion';`
4. Di dalam `AbsoluteFill` paling luar, tambahkan:
   `<Audio src={staticFile('voiceover.mp3')} />`
5. Jika audio lebih panjang dari 30 detik, potong agar sesuai durasi video.

Catatan: project menyertakan dialog dan timing voice-over, bukan file suara manusia/TTS yang sudah direkam. Pastikan suara final sudah disinkronkan sebelum render.
