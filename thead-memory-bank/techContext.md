# Teknoloji Bağlamı (Tech Context)

## 1. Teknoloji Yığını (Stack)

| Katman | Teknoloji | Versiyon | Kullanım Amacı |
|--------|-----------|----------|----------------|
| **Backend** | Node.js (NestJS) | v20+ / v10+ | Ana API servisi, modüler mimari. |
| **Dil** | TypeScript | v5+ | Tip güvenliği. |
| **Veritabanı** | PostgreSQL | v14+ | JSONB ve Schema-based multi-tenancy için. |
| **ORM** | Prisma / TypeORM | Latest | Veritabanı erişimi ve migrasyonlar. |
| **Cache** | Redis | v7+ | Tenant mapping, session, API cache. |
| **Frontend** | Next.js | v14+ | React framework, SSR, App Router. |
| **Styling** | Tailwind CSS | v3.4+ | Utility-first CSS, hızlı arayüz geliştirme. |
| **Storage** | AWS S3 / GCS | - | Medya dosyaları (resim, video, doküman). |
| **Queue** | Bull (Redis) | - | Arkaplan işleri (Mail, Resim işleme). |

## 2. Geliştirme Araçları ve Standartlar
* **Konteynerizasyon:** Docker ve Docker Compose (Dev ortamı için).
* **Paket Yöneticisi:** `pnpm` (Workspace ve hız için önerilen).
* **Test:** Jest (Unit), Supertest (E2E Integration).
* **Dokümantasyon:** Swagger / OpenAPI (NestJS otomatik üretim).
* **Kod Kalitesi:** ESLint, Prettier, Husky (Git hooks).

## 3. Altyapı ve DevOps (Hedef)
* **Orchestration:** Kubernetes (K8s) - Production ortamı için.
* **Proxy:** Nginx veya AWS ALB.
* **CDN:** Cloudflare veya CloudFront.
* **CI/CD:** GitHub Actions.
* **Monitoring:** Application Performance Monitoring (APM) - New Relic/DataDog.

## 4. Kütüphane Gereksinimleri
* **Auth:** `passport`, `@nestjs/jwt`, `bcrypt`.
* **Validation:** `class-validator`, `class-transformer`.
* **Upload:** `multer`, `aws-sdk`.
* **Mail:** `nodemailer`.
* **Frontend UI:** `radix-ui` veya `shadcn/ui` (Headless bileşenler), `framer-motion` (Animasyon).
