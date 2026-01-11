# Sistem Desenleri ve Mimari (System Patterns)

## 1. Mimari Genel Bakış
**Model:** Single Codebase, Multiple Database/Schema
Tüm tenantlar aynı uygulama kodunu (Docker container) kullanır ancak verileri veritabanı seviyesinde izole edilmiştir.

### Temel Prensipler
* **Veri İzolasyonu:** PostgreSQL "Schema-per-tenant" stratejisi.
* **Merkezi Dağıtım:** Zero-downtime deployment, rolling updates.
* **Tenant Tespiti:** Host header tabanlı otomatik yönlendirme.

## 2. Tenant Tanımlama ve Yönlendirme
1. **Request:** `firma-a.com` isteği gelir.
2. **Middleware:** `Host` başlığını parse eder.
3. **Redis Lookup:** Domain'in hangi `tenant_id` ve `schema`'ya ait olduğunu cache'ten sorgular.
4. **Context Injection:** `req.tenant` ve `req.dbSchema` nesnelerini enjekte eder.
5. **DB Connection:** ORM, ilgili şema üzerinde sorguyu çalıştırır.

## 3. Veritabanı Tasarımı (PostgreSQL 14+)

### Veri İzolasyon Seviyeleri
1. **Master Veritabanı (`central_master`):**
   * Tenant listesi, abonelikler, domain mapping, feature flags.
   * `public` şemada tutulur.
2. **Tenant Şemaları (`tenant_{slug}`):**
   * `pages`, `posts`, `media`, `users`, `orders` vb.
   * Her tenant için ayrı bir şema oluşturulur (`CREATE SCHEMA "tenant_xyz"`).

## 4. Güvenlik Desenleri
* **İzolasyon:** `TenantContextMiddleware` ve `QueryInterceptor` ile şema sızıntılarını (cross-tenant data leak) engelleme.
* **Kimlik Doğrulama:** JWT (Access 15dk, Refresh 7 gün). MFA desteği.
* **RBAC:** Hiyerarşik roller (Süper Admin > Tenant Admin > Site Editor > Content Writer).
* **Rate Limiting:**
  * Global (IP bazlı).
  * Tenant bazlı (Paket limitleri).
  * Endpoint bazlı (Login/Register koruması).

## 5. Merkezi Güncelleme ve DevOps
* **CI/CD:** GitHub Actions ile otomatik build ve test.
* **Feature Flags:** Özellikleri tenant bazında açıp kapatabilme.
* **Monitoring:** ELK Stack (Loglar), Sentry (Hatalar), New Relic (APM).

## 3.1 Veritabanı Erişim Deseni (Critical Adaptation)
Prisma ORM'in `multiSchema` özelliği ile dinamik `search_path` kullanımı çakışmaktadır. Bu nedenle Hibrit bir yaklaşım benimsenmiştir:
1.  **Central Tables (Tenant, Domain):** Standart Prisma Client metotları (`findUnique`, `create` vb.) kullanılır. Şema sabittir (`central_master`).
2.  **Tenant Tables (User, Page, etc.):** Dinamik şema geçişi gerektirdiği için **Raw SQL** kullanılır.
    *   Servis: `PrismaTenancyService`
    *   Metot: `$queryRawUnsafe`
    *   Neden: Prisma, model tabanlı sorgularda tablo adını `public.users` gibi tam adla (fully qualified) çözmekte ve `search_path` ayarını ezmektedir. Raw SQL ile bu davranış bypass edilir.
    *   **Önemli:** Tarih alanları (`created_at`) için string yerine JS `Date` objesi, JSON alanları için `$x::jsonb` cast işlemi zorunludur.

## 6. Frontend Mimarisi
* **SSR:** Next.js App Router ile dinamik rendering.
* **Tema Motoru:** `theme.json` config dosyasına göre runtime'da renk, font ve layout enjeksiyonu.
* **Caching:**
  * **Edge:** Statik varlıklar (CDN).
  * **SSR Cache:** Incremental Static Regeneration (ISR).
