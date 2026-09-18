# Mitsi Ppl — Üye Paneli (Member Panel) Planı

## Hedef
Mitsi Ppl kitap kulübü sitesine giriş/kayıt olan üyeler için kişisel bir üye paneli eklemek. Üyeler aboneliklerini, profillerini, okuma geçmişlerini ve üyeye özel içeriği tek bir yerden yönetebilecek.

Bu plan kapsamında:
- **Kimlik doğrulama:** Gerçek (e-posta & şifre) — Lovable Cloud üzerinden.
- **Ödemeler:** Mock kalır (gerçek Stripe ileride).
- **Profil verisi:** Saklanır (isim, avatar, okuma geçmişi vb.) — ayrı `profiles` tablosu.

---

## 1. Altyapı: Lovable Cloud (Auth + Veritabanı)

Şu an projede backend yok (sadece istemci tarafı). Üye paneli için Lovable Cloud etkinleştirilecek:
- E-posta & şifre ile kayıt/giriş (Cloud varsayılanında kapalı, `enable_email_auth` ile açılacak).
- Şifre sıfırlama akışı + `/reset-password` sayfası.
- `@supabase/supabase-js` entegrasyonu, ortak `src/lib/supabaseClient.ts`.

## 2. Veritabanı Şeması

Aşağıdaki tablolar oluşturulacak (her biri için GRANT + RLS politikaları dahil):

### `profiles`
Her kullanıcıya karşılık profil. `auth.users(id)`'a FK, `ON DELETE CASCADE`.
- `id` (uuid, PK, = auth.users.id)
- `first_name`, `last_name` (text)
- `avatar_url` (text, opsiyonel)
- `subscription_plan` (enum: reader, member, collector) — mock, ödeme olmadığı için panel üzerinden seçilebilir/saklanır
- `subscription_type` (enum: individual, group, gift)
- `subscription_status` (enum: active, canceled, none)
- `created_at`, `updated_at`
- **Trigger:** Signup sırasında otomatik profil satırı oluşturma (security definer).

RLS: Kullanıcı yalnızca kendi profilini okur/günceller.

### `book_progress` (okuma geçmişi & işaretlenenler)
- `id` (uuid, PK)
- `user_id` (uuid → auth.users, FK)
- `book_club_slug` (text — `bookClubs.ts`'teki slug ile eşleşir)
- `status` (enum: want_to_read, reading, finished)
- `saved` (boolean — işaretle/sakla)
- `updated_at`
- unique(user_id, book_club_slug)

RLS: Kullanıcı yalnızca kendi satırlarını okur/yazar/siler.

### `member_content` (üyeye özel içerik — opsiyonel kaynak)
Tartışma rehberleri, canlı oturum linkleri vb. için basit içerik tablosu. Yalnızca oturum açan üyeler okur.

> Not: `user_roles` ayrı tabloda tutulur (güvenlik gereği profilden ayrı). Admin rolü ileride içerik yönetimi için kullanılabilir.

## 3. Sayfalar & Rotalar

| Rota | Sayfa | Açıklama |
|------|-------|----------|
| `/login` | Login | E-posta/şifre giriş + şifre sıfırlama linki + kayıt sayfasına yönlendirme |
| `/signup` | Signup | Kayıt formu (checkout'taki adım 2 buraya bağlanabilir) |
| `/reset-password` | ResetPassword | Şifre yenileme (recovery linkinden) |
| `/account` | MemberPanel (Dashboard) | Giriş yapmış üyeye özel ana panel |
| `/account/profile` | Profile | İsim, e-posta, şifre, avatar yönetimi |
| `/account/subscription` | Subscription | Mevcut plan, mock plan değiştirme, iptal |
| `/account/reading` | Reading history | Okuma geçmişi, işaretlenen kitaplar, durum güncelleme |
| `/account/content` | Member content | Üyeye özel rehberler, canlı oturum linkleri, etkinlikler |

Korunmuş rotalar: Giriş yapmamış kullanıcı `/account*`'a erişince `/login`'e yönlendirilir. Giriş yapmış kullanıcı `/login`'e erişince `/account`'a.

## 4. Üye Paneli Özellikleri

### A. Abonelik & Üyelik Yönetimi (`/account/subscription`)
- Mevcut plan kartı (Reader/Member/Collector, tür: Individual/Group/Gift, durum: Active/Canceled).
- Plan değiştir (mock — dropdown ile plan seç, `profiles` tablosuna yaz).
- "Cancel subscription" butonu (mock — durumu canceled yapar; gerçek ödeme yok).
- Sonraki yenileme tarihi (mock gösterim).

### B. Profil & Hesap Ayarları (`/account/profile`)
- İsim/soyisim düzenleme.
- E-posta gösterimi (değiştirilebilir; değişiklik Supabase auth üzerinden).
- Şifre değiştirme (giriş yapmış kullanıcı, mevcut şifre gerekli).
- Avatar yükleme (Supabase Storage) — opsiyonel.

### C. Okuma Geçmişi & İşaretlenenler (`/account/reading`)
- Book club kartları, `allClubs` verisi ile.
- Her kitap için durum: Want to read / Reading / Finished.
- "Kaydet" (bookmark) toggle.
- Filtreleme (tümü, okunan, okunan, işaretlenenler).
- Veriler `book_progress` tablosuna yazılır.

### D. Üyeye Özel İçerik (`/account/content`)
- Aylık tartışma rehberleri (mock metin).
- Canlı oturum linki + tarih (mock).
- Etkkinlik takvimi/RSVP (mock).

## 5. Navbar & Checkout Güncellemeleri

- **Navbar:** Giriş yapmamışken "Sign in" linki; giriş yapmışken üye adı/initial avatar + açılır menü → Üye Paneli, Çıkış. Mobil menüde aynı mantık.
- **Checkout:** Adım 2 (Account) gerçek `supabase.auth.signUp` çağrısına bağlanır; ödeme yine mock. Kayıttan sonra panelin `/account` rotasına yönlendirme.

## 6. Auth Bağlamı (Session Yönetimi)
- `AuthProvider` (React context) — uygulama genelinde `onAuthStateChange` dinleyicisi.
- `useAuth()` hook: `user`, `profile`, `loading`, `signOut()`.
- Anasayfadaki "Join the club" / CTA'lar oturum durumuna göre yönlendirir.

## 7. Tasarım Tutarlılığı
Mevcut editorial/minimalist stil korunur:
- Playfair Display başlıklar, DM Sans gövde, kırmızı (`#E8231A`) primary, beyaz/krem arka plan, köşesiz (`--radius: 0`), bol beyaz alan, ince çizgiler.
- Panel kenar çubuğu mevcut border/stil ile uyumlu; shadcn bileşenleri var olan token'ları kullanır.

## 8. Uygulama Sırası
1. Lovable Cloud'u etkinleştir + `enable_email_auth`.
2. Şema migrasyonları (profiles trigger, book_progress, member_content, RLS, GRANT'lar).
3. `supabaseClient.ts` + `AuthProvider` + `useAuth`.
4. Login / Signup / Reset password sayfaları + korunan rotalar.
5. Member panel sayfaları (dashboard, profile, subscription, reading, content).
6. Navbar & checkout entegrasyonu.
7. Test: Playwright ile kayıt → giriş → panel akışı doğrulanır.

## Teknik Notlar
- Auth doğrulaması için `getUser()` (sunucu tarafı yeniden doğrulama); `getSession()` yalnızca token iliştirme.
- Email doğrulama varsayılan açık: kayıt sonrası "e-postanı onayla" durumu gösterilir; `onAuthStateChange` oturumu teslim eder.
- `profiles` için FK + `ON DELETE CASCADE` + otomatik oluşturma trigger'ı (security definer).
- Roller `user_roles` tablosunda (profile'da değil).
- Ödeme mock kaldığı için abonelik durumu yalnızca `profiles` tablosundaki mock alanda tutulur; gerçek ödeme entegrasyonu ileride Stripe ile yapılabilir.
