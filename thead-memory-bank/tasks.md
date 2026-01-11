# Görevler (Tasks)

PRD Bölüm 7 (Yol Haritası) referans alınarak oluşturulmuştur.

## FAZ 1 (M0): Altyapı ve Temel Mimari (6-8 Hafta) <!-- id: 100 -->
**Durum:** [x] Tamamlandı

### 1.1 Veritabanı ve Ortam Kurulumu <!-- id: 101 -->
- [x] Docker Compose (Postgres 14, Redis 7, Tools) hazirla <!-- id: 101.1 -->
- [x] NestJS Backend projesini initialize et <!-- id: 101.2 -->
- [x] Next.js Frontend projesini initialize et <!-- id: 101.3 -->
- [x] Monorepo/Workspace ayarlarını yap (`pnpm`) <!-- id: 101.4 -->

### 1.2 Veritabanı Tasarımı <!-- id: 102 -->
- [x] Master Schema (`central_master`) tasarımı (Tenants, Domains) <!-- id: 102.1 -->
- [x] Tenant Schema Template tasarımı (Pages, Users, Settings) <!-- id: 102.2 -->
- [x] Prisma/TypeORM multi-schema konfigürasyonu <!-- id: 102.3 -->

### 1.3 Core Backend & Tenant Resolver <!-- id: 103 -->
- [x] `TenantContextMiddleware` yaz (Host header parsing) <!-- id: 103.1 -->
- [x] Redis Service entegrasyonu (Domain lookup cache) <!-- id: 103.2 -->
- [x] Connection Manager (Dinamik şema seçimi) implementasyonu <!-- id: 103.3 -->
- [x] Cross-tenant query güvenliği (Interceptor/Guard) <!-- id: 103.4 -->

### 1.4 DevOps (Basic) <!-- id: 104 -->
- [x] GitHub Actions CI pipeline kurulumu <!-- id: 104.1 -->

---

## FAZ 2 (M1): İçerik Yönetim API'leri (8-10 Hafta) <!-- id: 200 -->
**Durum:** [x] Tamamlandı

### 2.1 Auth & Kullanıcı Modülü <!-- id: 201 -->
- [x] JWT Auth (Access/Refresh Token) <!-- id: 201.1 -->
- [x] RBAC Guard (Permission tabanlı kontrol) <!-- id: 201.2 -->
- [x] Kullanıcı CRUD ve Davet sistemi <!-- id: 201.3 -->

### 2.2 İçerik API'leri <!-- id: 202 -->
- [x] Pages API (CRUD, Hiyerarşi, Slug) <!-- id: 202.1 -->
- [x] Block/Component API (JSON şema validasyonu) <!-- id: 202.2 -->
- [ ] Versioning & Scheduling altyapısı <!-- id: 202.3 -->

### 2.3 Medya & Dil <!-- id: 203 -->
- [ ] Storage Service (S3/Local switchable) <!-- id: 203.1 -->
- [ ] Media Upload & Processing (WebP) <!-- id: 203.2 -->
- [ ] Language API & Translation entegrasyonu <!-- id: 203.3 -->

---

## FAZ 3 (M2): Frontend ve SEO Katmanı (10-12 Hafta) <!-- id: 300 -->
**Durum:** [x] Kısmen Tamamlandı (SEO Hariç)

### 3.1 Tema Motoru <!-- id: 301 -->
- [ ] JSON Config Loader <!-- id: 301.1 -->
- [ ] Dynamic Style Injection (Tailwind/CSS Vars) <!-- id: 301.2 -->
- [ ] Örnek Tema (Starter Theme) <!-- id: 301.3 -->

### 3.2 SSR ve Render <!-- id: 302 -->
- [x] Tenant Context Provider (Frontend) <!-- id: 302.1 -->
- [x] Dynamic Route Handling (`[[...slug]]`) <!-- id: 302.2 -->
- [x] Block Renderer Component <!-- id: 302.3 -->

### 3.3 SEO <!-- id: 303 -->
- [ ] Metadata Generator (Next.js Metadata API) <!-- id: 303.1 -->
- [ ] Dynamic Sitemap XML <!-- id: 303.2 -->
- [ ] Schema.org JSON-LD Component <!-- id: 303.3 -->

---

## FAZ 4 (M3): Süper Admin ve SaaS (8-10 Hafta) <!-- id: 400 -->
**Durum:** [ ] Beklemede
- [ ] Süper Admin Dashboard <!-- id: 401 -->
- [ ] Tenant Onboarding Wizard <!-- id: 402 -->
- [ ] Billing & Subscription (Stripe) <!-- id: 403 -->
- [ ] Domain & SSL Automation <!-- id: 404 -->

---

## FAZ 5 (M4): Gelişmiş Modüller (12-16 Hafta) <!-- id: 500 -->
**Durum:** [ ] Beklemede
- [ ] E-ticaret Modülü <!-- id: 501 -->
- [ ] Blog Modülü <!-- id: 502 -->
- [ ] Form Builder <!-- id: 503 -->
