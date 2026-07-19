# Todo App

React + TypeScript + Vite + Tailwind CSS ile geliştirilmiş, verileri tarayıcının **localStorage**'ında saklayan bir Todo (yapılacaklar listesi) uygulaması.

![Todo App ekran görüntüsü](docs/screenshot.png)

## Özellikler

- **Ekle** — yeni görev ekleme
- **Listeleme** — görevleri listeleme, "Tümü / Aktif / Tamamlanan" filtreleri
- **Güncelleme** — çift tıklayarak veya "Düzenle" butonuyla görev metnini düzenleme, tamamlandı işaretleme
- **Silme** — görev silme
- Veriler `localStorage`'da tutulur, sayfa yenilense de kaybolmaz

## Kullanılan Teknolojiler

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Proje Yapısı

```
src/
├── components/    # TodoForm, TodoItem, TodoList
├── pages/         # HomePage
├── interfaces/    # Todo tip tanımları
├── hooks/         # useTodos (localStorage CRUD mantığı)
├── App.tsx
└── main.tsx
```

## Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

### Production build

```bash
npm run build
npm run preview
```

## GitHub'a Yükleme

Proje klasörü zaten yerel bir git deposu olarak hazırlandı ve ilk commit atıldı. Sadece GitHub'a bağlayıp push etmeniz yeterli:

1. GitHub'da yeni bir **public** repository oluşturun (README/`.gitignore` eklemeden — boş repo).
2. Bu klasörde:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<kullanici-adiniz>/<repo-adi>.git
   git push -u origin main
   ```
3. Repo public olduğundan emin olun (Settings → General → Danger Zone → Change visibility).

## Netlify ile Yayınlama

1. [Netlify](https://app.netlify.com) hesabınıza giriş yapın → **Add new site → Import an existing project**.
2. GitHub reponuzu seçin.
3. Build ayarları:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Deploy site** butonuna basın. Netlify size `https://<site-adi>.netlify.app` şeklinde bir link verecektir.

> Alternatif: Netlify CLI ile de yayınlayabilirsiniz: `npx netlify-cli deploy --prod`.

## Teslim

Proje teslim formuna şunları paylaşın:
- GitHub repo linki (public)
- Netlify (veya muadili) canlı yayın linki
