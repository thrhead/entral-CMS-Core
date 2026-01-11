# Ürün Gereksinim Dokümanı (PRD)

## Central CMS Core (C3)

### 1. Giriş ve Genel Bakış

**1.1. Ürün Adı**
Central CMS Core (C3) - Kurumsal Çoklu Kiracı İçerik Yönetim Sistemi

**1.2. Vizyon**
Kurumsal firmaların dijital varlıklarını tek bir merkezden, yüksek SEO performansı ve tam güvenlik ile yönetebilecekleri, Multi-Tenant mimarili tescilli bir CMS altyapısı oluşturmak.

**1.3. Hedef Kitle**

* Çoklu marka veya bölgesel siteleri olan kurumsal şirketler
* Dijital ajanslar (müşteri siteleri için)
* Franchise işletmeler
* Holding şirketleri

**1.4. Başarı Kriterleri**

* Core Web Vitals tüm değerlerde "İyi" (Yeşil) kategorisinde
* %99.9 uptime garantisi
* Ortalama sayfa yükleme süresi <2 saniye
* Tenant ekleme süresi <5 dakika

---

### 2. Mimari Gereksinimler

**2.1. Sistem Mimarisi**

* **Mimari Model:** Single Codebase, Multiple Database/Schema
* **Temel Prensipler:**
* Her tenant için ayrı PostgreSQL şeması
* Ortak kod tabanı üzerinden tüm tenantların çalışması
* Merkezi güncelleme ve dağıtım



**2.2. Tenant Identification (Kiracı Tanımlama)**

* **Çalışma Prensibi:**
1. HTTP isteği gelir (örn: firma-a.com)
2. Middleware Host header'ını okur
3. Domain-Tenant mapping tablosundan ilgili tenant bilgisi çekilir (Redis cache)
4. İlgili veritabanı şemasına bağlantı kurulur
5. İstek işlenir ve yanıt döndürülür


* **Gereksinimler:**
* Host-based routing desteği
* Subdomain ve custom domain desteği
* Wildcard SSL sertifika yönetimi
* DNS yönetimi ve doğrulama mekanizması



**2.3. Merkezi Güncelleme Sistemi**

* **Özellikler:**
* Zero-downtime deployment
* Rolling update desteği
* Feature flag sistemi (tenant bazlı özellik açma/kapama)
* Otomatik rollback mekanizması
* Version control ve changelog


* **Güncelleme Akışı:**
1. Core güncelleme hazırlanır
2. Staging ortamında test edilir
3. Canary deployment ile küçük grup teste alınır
4. Tüm tenantlara aşamalı dağıtım yapılır
5. Health check ve monitoring



**2.4. İzole Veri Yapısı**

* **Veri İzolasyonu Seviyeleri:**
* **Veritabanı Seviyesi:** Her tenant için ayrı PostgreSQL şeması
* **Uygulama Seviyesi:** Middleware ile tenant context kontrolü
* **Cache Seviyesi:** Redis key prefix ile tenant izolasyonu
* **Dosya Seviyesi:** S3/GCS bucket path ile ayırım


* **Güvenlik Önlemleri:**
* Tenant ID her sorguda otomatik eklenir
* Cross-tenant query engelleyici middleware
* Audit log (her veri erişimi loglanır)



---

### 3. Fonksiyonel Gereksinimler

**3.1. Süper Admin Paneli (Merkez Yönetim)**

**3.1.1. Tenant Yönetimi**

* **Yeni Site Oluşturma:**
* Tenant adı, slug, domain bilgisi
* Başlangıç paketi seçimi (Starter, Business, Enterprise)
* Otomatik veritabanı şeması oluşturma
* Demo içerik yükleme seçeneği
* İlk admin kullanıcısı oluşturma


* **Domain Yönetimi:**
* Custom domain ekleme ve doğrulama
* DNS kayıt kontrolü (A, CNAME, TXT)
* SSL sertifika otomasyonu (Let's Encrypt entegrasyonu)
* SSL sertifika durumu takibi ve otomatik yenileme
* Subdomain yönetimi


* **Tenant Listeleme ve Filtreleme:**
* Arama (ad, domain, durum)
* Filtreleme (paket tipi, oluşturma tarihi, durum)
* Sıralama ve pagination
* Toplu işlemler (duraklatma, silme, güncelleme)



**3.1.2. Modül Kontrolü**

* **Modül Kütüphanesi:**
* Blog Modülü
* E-ticaret Modülü
* Katalog Modülü
* İnsan Kaynakları Modülü
* Form Builder Modülü
* Event/Etkinlik Modülü
* Medya Galerisi Modülü


* **Modül Yönetimi:**
* Tenant bazlı modül aktivasyonu/deaktivasyonu
* Modül versiyonlama
* Modül bağımlılık yönetimi
* Modül ayarları ve konfigürasyonu
* Toplu modül aktivasyonu



**3.1.3. Kaynak İzleme**

* **Metrikler:**
* Trafik istatistikleri (günlük/aylık ziyaretçi)
* Sayfa görüntüleme sayıları
* Depolama kullanımı (GB)
* Bandwidth kullanımı
* API çağrı sayıları
* Veritabanı boyutu


* **Raporlama:**
* Gerçek zamanlı dashboard
* Grafik ve trendler
* Export (CSV, PDF)
* Alarm ve bildirimler (eşik aşımı)
* Tenant bazlı maliyet hesaplama



**3.1.4. Sistem Yönetimi**

* **Özellikler:**
* Sistem logları görüntüleme
* Performance monitoring
* Cache yönetimi (temizleme, ısınma)
* Background job izleme
* Database backup ve restore
* Migration yönetimi



**3.2. Tenant (Firma) Yönetim Paneli**

**3.2.1. Dinamik Sayfa Oluşturucu**

* **Sayfa Yapısı:**
* Block/Bileşen tabanlı mimari
* Sürükle-bırak interface
* Nested block desteği (içiçe bileşenler)
* Grid sistemi (12 sütun responsive)


* **Hazır Bileşen Kütüphanesi:**
* **Temel Bileşenler:** Başlık, Paragraf, Görsel, Video, Buton, Spacer
* **Layout Bileşenleri:** Container, Row/Column, Grid, Tabs, Accordion
* **Medya Bileşenleri:** Görsel Galerisi, Video Player, Slider/Carousel
* **Form Bileşenleri:** İletişim Formu, Newsletter, Arama Kutusu
* **İçerik Bileşenleri:** Blog Listesi, Ürün Listesi, Testimonial, FAQ
* **Sosyal Bileşenler:** Social Feed, Share Buttons, Instagram Feed
* **E-ticaret Bileşenleri:** Ürün Kartı, Sepet, Kategori Listesi
* **Özel Bileşenler:** CTA Banner, Hero Section, Feature Cards


* **Bileşen Özellikleri:**
* Her bileşen için özelleştirme paneli
* Görsel stil editörü (margin, padding, border, shadow)
* Responsive ayarlar (mobil/tablet/desktop)
* Animasyon seçenekleri
* Custom CSS ekleme imkanı
* Koşullu görünürlük (kullanıcı rolü, tarih, dil)


* **Sayfa Yönetimi:**
* Sayfa hiyerarşisi (parent-child ilişkileri)
* URL yapısı özelleştirme (slug)
* Sayfa durumu (Taslak, Yayında, Arşiv)
* Zamanlı yayın (schedule publishing)
* Versiyonlama ve geri alma
* Sayfa şablonları (template system)



**3.2.2. Çoklu Dil Yönetimi**

* **Dil Yapısı:**
* Sınırsız dil desteği
* Dil başına ayrı URL yapısı (/tr, /en, /de)
* Varsayılan dil ayarı
* Fallback mekanizması


* **Çeviri Interface:**
* Yan yana çeviri editörü
* Çeviri durumu gösterimi (100%, 50%, 0%)
* Missing translations uyarıları
* Çeviri arama ve filtreleme


* **Otomatik Çeviri API Entegrasyonu:**
* Google Translate API
* DeepL API
* Microsoft Translator
* Özel model entegrasyonu (opsiyonel)


* **Çeviri İşlemleri:**
* Bulk (toplu) çeviri
* Tek sayfa çevirisi
* Sadece eksik alanları çevir
* Çeviri kalitesi değerlendirmesi
* Manuel düzeltme ve onaylama sistemi


* **SEO ve Dil:**
* hreflang etiketleri otomasyonu
* Dil bazlı meta bilgiler
* Dil değiştirici widget



**3.2.3. Medya Kütüphanesi**

* **Dosya Yönetimi:**
* Klasör yapısı (sınırsız derinlik)
* Dosya yükleme (drag & drop)
* Toplu yükleme desteği
* Dosya arama ve filtreleme
* Etiketleme sistemi
* Dosya bilgileri düzenleme (başlık, alt text, açıklama)


* **Görsel İşleme:**
* Otomatik WebP dönüşümü
* Responsive boyutlar (thumbnail, medium, large)
* Lazy loading desteği
* Crop ve resize
* Filtre ve efektler
* Focal point belirleme


* **Desteklenen Formatlar:**
* **Görseller:** JPG, PNG, GIF, WebP, SVG
* **Videolar:** MP4, WebM
* **Dökümanlar:** PDF, DOC, DOCX, XLS, XLSX
* **Arşivler:** ZIP


* **Storage Yönetimi:**
* Kullanım istatistikleri
* Kullanılmayan medya tespiti
* Toplu silme işlemleri
* CDN entegrasyonu
* External URL desteği



**3.2.4. İçerik Yönetimi**

* **Genel İçerik Özellikleri:**
* Rich text editor (WYSIWYG)
* Markdown desteği
* Kod blokları (syntax highlighting)
* İçerik şablonları
* Kategori ve etiket yönetimi
* Yazar/editör ataması
* Yorum yönetimi


* **SEO Araçları:**
* Meta başlık ve açıklama
* Open Graph etiketleri
* Twitter Card ayarları
* Canonical URL
* Schema markup builder
* Keyword analizi
* Readability score


* **Kullanıcı Yönetimi:**
* Rol ve yetki sistemi (Admin, Editör, Yazar, Görüntüleyici)
* Kullanıcı grupları
* İçerik onay akışı (workflow)
* Kullanıcı aktivite logları



**3.2.5. Ayarlar**

* **Site Ayarları:**
* Site başlığı ve tagline
* Logo ve favicon yönetimi
* İletişim bilgileri
* Sosyal medya bağlantıları
* Analytics entegrasyonu (GA4, GTM)
* Cookie consent yönetimi


* **Tema Ayarları:**
* Tema seçimi
* Renk paleti düzenleme
* Font seçimi (Google Fonts entegrasyonu)
* Header/Footer düzenleme
* Custom CSS/JS ekleme


* **Teknik Ayarlar:**
* URL yapısı (permalink structure)
* Robots.txt editörü
* .htaccess yönetimi
* Redirect yönetimi (301, 302)
* Cache ayarları



**3.3. Frontend (Sunum Katmanı)**

**3.3.1. SSR (Server Side Rendering)**

* **Gereksinimler:**
* Next.js ile tam SSR desteği
* Tüm içerik sunucu tarafında render edilir
* Google bot ve diğer crawlerlar tam HTML alır
* İlk yükleme hızı optimizasyonu
* SEO-friendly URL yapısı


* **Hydration:**
* Progressive hydration
* Selective hydration (sadece interaktif bileşenler)
* Streaming SSR desteği



**3.3.2. Tema Motoru**

* **JSON Tabanlı Tema Yapılandırması:**

```json
{
  "name": "Modern Business",
  "version": "1.0.0",
  "colors": {
    "primary": "#0066CC",
    "secondary": "#FF6B35",
    "background": "#FFFFFF",
    "text": "#333333"
  },
  "typography": {
    "headingFont": "Montserrat",
    "bodyFont": "Open Sans",
    "baseFontSize": "16px"
  },
  "layout": {
    "maxWidth": "1200px",
    "gridColumns": 12,
    "gutter": "24px"
  },
  "components": {
    "button": {
      "borderRadius": "4px",
      "padding": "12px 24px"
    }
  }
}

```

* **Tema Özellikleri:**
* Hazır tema kütüphanesi (10+ profesyonel tema)
* Tema önizleme (gerçek veriyle)
* Tema import/export
* Theme builder interface
* Dark mode desteği
* Responsive breakpoints


* **Performans:**
* CSS-in-JS optimizasyonu
* Critical CSS extraction
* Unused CSS purging
* Font optimization (preload, swap)



**3.3.3. Component System**

* **Özellikler:**
* React component library
* Storybook dokümantasyonu
* Atomic design prensibi
* TypeScript desteği
* Accessibility (WCAG 2.1 AA)



---

### 4. Teknik Gereksinimler & Stack

**4.1. Backend**

* **Teknoloji:** Node.js (NestJS)
* **Seçim Nedenleri:**
* Modüler ve ölçeklenebilir mimari
* TypeScript desteği
* Dependency injection
* Mikroservis mimariye uygunluk
* Güçlü ekosistem


* **Temel Modüller:**
* Authentication & Authorization (JWT, Passport)
* Tenant Resolver Middleware
* Database Connection Manager
* API Gateway
* File Upload & Processing
* Email Service (Nodemailer, SendGrid)
* Queue Management (Bull, Redis)


* **API Yapısı:**
* RESTful API
* GraphQL desteği (opsiyonel)
* API versioning
* Rate limiting
* Request validation
* Error handling
* API documentation (Swagger)



**4.2. Database**

* **Teknoloji:** PostgreSQL 14+
* **Seçim Nedenleri:**
* JSONB desteği (esnek veri yapıları)
* Schema-based multi-tenancy
* Full-text search
* Güçlü indeksleme
* ACID compliance
* Mature ve güvenilir


* **Veritabanı Yapısı:**
* **Master Database:** Tenant bilgileri, merkezi ayarlar
* **Tenant Schemas:** Her tenant için ayrı şema


* **Örnek Şema:**

```text
central_master (database)
├── public (schema) - Merkezi tablolar
│   ├── tenants
│   ├── domains
│   ├── subscriptions
│   └── system_users
│
├── tenant_firma_a (schema)
│   ├── pages
│   ├── posts
│   ├── media
│   └── users
│
└── tenant_firma_b (schema)
    ├── pages
    ├── posts
    ├── media
    └── users

```

* **Optimizasyon:**
* Connection pooling
* Query optimization
* Index stratejisi
* Partitioning (büyük tablolar için)
* Vacuum ve analyze otomasyonu



**4.3. Frontend**

* **Teknoloji:** Next.js 14+ (React 18+)
* **Seçim Nedenleri:**
* Mükemmel SSR ve SEO performansı
* App Router ve Server Components
* Otomatik kod bölme
* Image optimization
* Incremental Static Regeneration (ISR)


* **State Management:**
* React Context API
* Zustand veya Redux Toolkit
* React Query (server state)


* **Styling:**
* Tailwind CSS
* CSS Modules
* Emotion/Styled Components (tema motoru için)


* **Build ve Deployment:**
* Turbopack (hızlı development)
* Edge runtime desteği
* Static export opsiyonu



**4.4. Caching**

* **Teknoloji:** Redis 7+
* **Kullanım Alanları:**
* Tenant ayarları cache (host → tenant mapping)
* Session yönetimi
* API response cache
* Rate limiting
* Queue management
* Real-time features (pub/sub)


* **Cache Stratejileri:**
* Cache-aside pattern
* Write-through cache
* TTL yönetimi
* Cache invalidation
* Multi-level caching (memory → Redis → DB)



**4.5. Depolama**

* **Teknoloji:** AWS S3 / Google Cloud Storage
* **Seçim Nedenleri:**
* Sınırsız ölçeklenebilirlik
* Cost-effective
* CDN entegrasyonu
* Versioning desteği
* Lifecycle policies


* **Klasör Yapısı:**

```text
bucket-name/
├── tenants/
│   ├── firma-a/
│   │   ├── images/
│   │   ├── videos/
│   │   └── documents/
│   └── firma-b/
│       ├── images/
│       ├── videos/
│       └── documents/
└── shared/
    └── assets/

```

* **Özellikler:**
* Presigned URLs (güvenli upload)
* Image transformation (on-the-fly)
* CDN cache (CloudFront/Cloud CDN)
* Backup stratejisi



**4.6. DevOps ve Infrastructure**

* **Container Orchestration:**
* Docker
* Kubernetes (production)
* Docker Compose (development)


* **CI/CD:**
* GitHub Actions / GitLab CI
* Automated testing
* Linting ve code quality checks
* Automated deployment


* **Monitoring:**
* Application monitoring (New Relic, DataDog)
* Log aggregation (ELK Stack, CloudWatch)
* Error tracking (Sentry)
* Uptime monitoring (Pingdom, UptimeRobot)


* **Infrastructure:**
* Load balancer (Nginx, AWS ALB)
* Auto-scaling
* Multi-region deployment (opsiyonel)
* Disaster recovery plan



---

### 5. SEO ve Performans Gereksinimleri

**5.1. Core Web Vitals**

* **Hedef Metrikler:**
* LCP (Largest Contentful Paint): <2.5 saniye
* FID (First Input Delay): <100 milisaniye
* CLS (Cumulative Layout Shift): <0.1


* **Optimizasyon Stratejileri:**
* Image lazy loading ve optimization
* Font optimization (font-display: swap)
* Critical CSS inline
* Defer non-critical JavaScript
* Resource hints (preload, prefetch, preconnect)
* Code splitting ve tree shaking



**5.2. Otomatik Şema İşaretleme**

* **Desteklenen Schema Tipleri:**
* Organization: Firma bilgileri
* WebSite: Site meta bilgileri
* WebPage: Sayfa bilgileri
* Article: Blog yazıları
* Product: E-ticaret ürünleri
* FAQPage: SSS sayfaları
* BreadcrumbList: Breadcrumb navigasyon
* ContactPoint: İletişim bilgileri
* Event: Etkinlikler


* **JSON-LD Üretimi:**
* Otomatik üretim (içerik tipine göre)
* Manuel düzenleme opsiyonu
* Validasyon (Google Rich Results Test)
* Preview görünümü



**5.3. Dinamik Sitemap & Robots.txt**

* **Sitemap Özellikleri:**
* Otomatik sitemap.xml üretimi
* Çoklu dil desteği (sitemap-tr.xml, sitemap-en.xml)
* Image sitemap
* Video sitemap
* News sitemap
* Dinamik güncelleme (içerik değişikliğinde)
* Sitemap index (büyük siteler için)
* Öncelik ve güncelleme sıklığı yönetimi


* **Robots.txt:**
* Tenant bazlı özelleştirme
* Crawl delay ayarı
* Disallow rules
* Sitemap referansı
* User-agent bazlı kurallar



**5.4. Diğer SEO Özellikleri**

* Canonical URL yönetimi
* hreflang tag otomasyonu
* Meta robots (index/noindex, follow/nofollow)
* XML sitemap ping (Google, Bing)
* Social sharing optimization
* AMP support (opsiyonel)
* PWA desteği (opsiyonel)

---

### 6. Güvenlik Gereksinimleri

**6.1. Data Isolation (Veri İzolasyonu)**

* **Uygulama Seviyesi Önlemler:**
* Tenant context middleware (her istekte tenant ID kontrolü)
* Database query interceptor (tenant ID otomatik ekleme)
* Cross-tenant query engelleme
* Tenant switching engelleyici


* **Örnek Middleware:**

```javascript
// Tenant context middleware
app.use((req, res, next) => {
  const host = req.get('host');
  const tenant = getTenantByDomain(host); // Redis cache
  
  if (!tenant) {
    return res.status(404).send('Tenant not found');
  }
  
  req.tenant = tenant;
  req.dbSchema = `tenant_${tenant.slug}`;
  next();
});

// Query interceptor
db.interceptor((query, context) => {
  if (!query.includes('WHERE')) {
    query += ` WHERE tenant_id = ${context.tenant.id}`;
  }
  return query;
});

```

* **Test ve Doğrulama:**
* Automated security tests
* Penetration testing
* Cross-tenant access attempts monitoring
* Security audit logging



**6.2. Rate Limiting**

* **Katmanlar:**
* **Global:** IP başına genel limit (1000 req/hour)
* **Tenant:** Tenant başına limit (paket tipine göre)
* **User:** Kullanıcı başına limit (100 req/minute)
* **Endpoint:** Kritik endpoint'ler için özel limitler


* **Stratejiler:**
* Sliding window algorithm
* Token bucket algorithm
* IP whitelist/blacklist
* CAPTCHA entegrasyonu (şüpheli aktivitede)


* **Yanıt:**

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640000000

```

**6.3. JWT & RBAC (Rol Tabanlı Erişim)**

* **JWT (JSON Web Token):**
* Access token (kısa ömürlü, 15 dakika)
* Refresh token (uzun ömürlü, 7 gün)
* Token rotation
* Blacklist mekanizması (çalınan token iptali)


* **Rol Yapısı:**

```text
Süper Admin (System)
├── Tenant Admin
│   ├── Site Editor
│   │   └── Content Writer
│   ├── SEO Manager
│   └── HR Manager
└── Support Staff

```

* **İzin (Permission) Örnekleri:**
* pages.create
* pages.edit.own
* pages.edit.all
* pages.delete
* pages.publish
* users.manage
* settings.edit


* **RBAC Uygulama:**

```javascript
// Route guard
@UseGuards(AuthGuard, RoleGuard)
@Roles('tenant-admin', 'site-editor')
@Permissions('pages.edit.all')
async updatePage(@Param('id') id: string) {
  // ...
}

```

**6.4. Diğer Güvenlik Önlemleri**

* **Kimlik Doğrulama:**
* Multi-factor authentication (MFA)
* Social login (Google, Microsoft)
* SSO (SAML) desteği (enterprise)
* Password policy enforcement
* Account lockout (başarısız giriş denemeleri)


* **Veri Güvenliği:**
* Encryption at rest (veritabanı)
* Encryption in transit (HTTPS/TLS 1.3)
* Sensitive data masking (loglar)
* PII (Personal Identifiable Information) protection
* GDPR compliance


* **Uygulama Güvenliği:**
* Input validation ve sanitization
* SQL injection prevention (parametreli sorgular)
* XSS (Cross-Site Scripting) prevention
* CSRF (Cross-Site Request Forgery) protection
* Content Security Policy (CSP) headers
* CORS policy
* Helmet.js (security headers)


* **Monitoring ve Response:**
* Security incident detection
* Automated threat response
* Vulnerability scanning
* Regular security audits
* Incident response plan



---

### 7. Yol Haritası (Milestones)

**Faz 1 (M0): Altyapı ve Temel Mimari**

* **Süre:** 6-8 hafta
* **Çıktılar:**
* **Veritabanı Şeması Tasarımı**
* Master database şeması
* Tenant şema template
* Migration scripts
* Seed data


* **Tenant Resolver Middleware**
* Domain-based tenant detection
* Redis cache entegrasyonu
* Database connection pooling
* Error handling


* **Temel Backend Altyapısı**
* NestJS proje kurulumu
* Module yapısı
* Authentication modülü
* Basic API endpoints


* **DevOps Setup**
* Docker containerization
* CI/CD pipeline
* Development environment
* Monitoring tools




* **Başarı Kriterleri:**
* [ ] Tenant middleware %100 başarıyla tenant ayırıyor
* [ ] Database connection pooling çalışıyor
* [ ] Basic CRUD operations tenant-aware
* [ ] CI/CD pipeline otomatik deploy yapıyor



**Faz 2 (M1): İçerik Yönetim API'leri**

* **Süre:** 8-10 hafta
* **Çıktılar:**
* **Sayfa Yönetimi API**
* CRUD operations (Create, Read, Update, Delete)
* Page hierarchy
* Versioning sistem
* Scheduling


* **Blok/Bileşen Sistemi**
* Component registry
* Block API
* JSON schema validation
* Component rendering logic


* **Medya Yönetimi**
* Upload API (multipart)
* S3/GCS entegrasyonu
* Image processing (WebP, thumbnails)
* Folder management


* **Çoklu Dil API**
* Language management
* Translation API
* Auto-translate entegrasyonu
* Fallback mekanizması


* **Kullanıcı ve Rol Yönetimi**
* User CRUD
* Role ve permission system
* JWT authentication
* Password reset




* **API Endpoint Örnekleri:**

```http
POST   /api/pages
GET    /api/pages
GET    /api/pages/:id
PUT    /api/pages/:id
DELETE /api/pages/:id
POST   /api/pages/:id/publish
GET    /api/pages/:id/versions

POST   /api/media/upload
GET    /api/media
DELETE /api/media/:id
GET    /api/media/:id/transforms

```

* **Başarı Kriterleri:**
* [ ] Tüm CRUD operasyonları çalışıyor
* [ ] API response time <200ms
* [ ] API dokümantasyonu (Swagger) hazır
* [ ] Unit test coverage >80%



**Faz 3 (M2): Frontend ve SEO Katmanı**

* **Süre:** 10-12 hafta
* **Çıktılar:**
* **Next.js Dinamik Tema Motoru**
* Theme system architecture
* JSON-based theme config
* Theme builder UI
* Real-time preview
* 5+ hazır tema


* **SSR ve Sayfa Rendering**
* Dynamic page rendering
* Component hydration
* ISR (Incremental Static Regeneration)
* Edge caching


* **SEO Katmanı**
* Meta tag management
* Schema.org JSON-LD
* Sitemap generation
* Robots.txt
* hreflang implementation


* **Tenant Admin Paneli (Frontend)**
* Dashboard
* Sayfa yönetimi interface
* Medya kütüphanesi UI
* Kullanıcı yönetimi
* Ayarlar sayfası


* **Drag & Drop Page Builder**
* Component library UI
* Drag & drop functionality
* Properties panel
* Responsive preview
* Undo/redo




* **Başarı Kriterleri:**
* [ ] Core Web Vitals "İyi" kategorisinde
* [ ] SSR %100 çalışıyor
* [ ] Tema değişimi <5 saniye
* [ ] Mobile responsive tüm ekranlarda çalışıyor
* [ ] Lighthouse score >90



**Faz 4 (M3): Süper Admin ve SaaS Otomasyonu**

* **Süre:** 8-10 hafta
* **Çıktılar:**
* **Süper Admin Paneli**
* Tenant yönetimi interface
* Dashboard ve analytics
* Sistem ayarları
* Resource monitoring
* User activity logs


* **Tenant Onboarding Otomasyonu**
* Self-service signup
* Otomatik tenant provisioning
* Domain setup wizard
* Demo content import
* Email notifications


* **Billing ve Subscription System**
* Paket yönetimi (Starter, Business, Enterprise)
* Usage tracking
* Invoice generation
* Payment gateway entegrasyonu (Stripe/PayPal)
* Upgrade/downgrade flows


* **Advanced Features**
* Backup ve restore
* Tenant migration tools
* White-label options
* Custom domain automation
* SSL certificate automation


* **Monitoring ve Analytics**
* Real-time monitoring dashboard
* Performance metrics
* Error tracking
* Usage analytics
* Automated alerts




* **Başarı Kriterleri:**
* [ ] Yeni tenant oluşturma <5 dakika
* [ ] Otomatik billing çalışıyor
* [ ] Monitoring tüm metrikleri takip ediyor
* [ ] Backup otomasyonu günlük çalışıyor
* [ ] White-label tenant oluşturulabiliyor



**Faz 5 (M4): Gelişmiş Modüller ve Optimizasyon**

* **Süre:** 12-16 hafta (Paralel geliştirme)
* **Çıktılar:**
* **E-ticaret Modülü**
* Ürün yönetimi
* Kategori sistemi
* Sepet ve checkout
* Payment gateway
* Sipariş yönetimi


* **Blog Modülü**
* Post yönetimi
* Kategori ve etiket
* Yorum sistemi
* RSS feed
* Author management


* **Form Builder**
* Drag & drop form creator
* Field types library
* Validation rules
* Email notifications
* Submission management


* **İK Modülü**
* İlan yönetimi
* Başvuru formu
* Candidate tracking
* Email automation


* **Performance Optimizasyonu**
* Database query optimization
* Cache layer geliştirme
* CDN configuration
* Image optimization
* Code splitting




* **Başarı Kriterleri:**
* [ ] Her modül bağımsız aktive edilebiliyor
* [ ] Modüller arası conflict yok
* [ ] Performance regression yok
* [ ] Documentation her modül için hazır



---

### 8. Başarı Metrikleri ve KPI'lar

**8.1. Performans Metrikleri**

* Sayfa yükleme süresi: <2 saniye
* API response time: <200ms
* Core Web Vitals: Tüm değerler "İyi"
* Uptime: %99.9
* TTFB (Time to First Byte): <500ms

**8.2. Kullanıcı Metrikleri**

* Tenant onboarding süresi: <5 dakika
* Sayfa oluşturma süresi: <2 dakika
* Öğrenme eğrisi: <1 saat (temel işlemler)
* User satisfaction score: >4.5/5

**8.3. İş Metrikleri**

* Tenant sayısı: İlk 6 ayda 50+
* Churn rate: <%5
* Customer LTV: >$10,000
* Support ticket resolution time: <24 saat

**8.4. Teknik Metrikleri**

* Test coverage: >80%
* Bug density: <1 bug/1000 LOC
* Deployment frequency: Günlük
* Mean time to recovery: <1 saat

---

### 9. Risk Analizi ve Azaltma Stratejileri

**9.1. Teknik Riskler**

* **Risk:** Multi-tenant mimari karmaşıklığı ve veri izolasyonu ihlali
* **Olasılık:** Orta
* **Etki:** Kritik
* **Azaltma:** Kapsamlı test, code review, automated security scanning


* **Risk:** Performans sorunları (ölçeklenme)
* **Olasılık:** Orta
* **Etki:** Yüksek
* **Azaltma:** Load testing, horizontal scaling, caching stratejisi


* **Risk:** Third-party bağımlılıklar (API değişiklikleri)
* **Olasılık:** Düşük
* **Etki:** Orta
* **Azaltma:** Version locking, fallback mekanizmaları, monitoring



**9.2. İş Riskleri**

* **Risk:** Market adoption düşük olabilir
* **Olasılık:** Orta
* **Etki:** Yüksek
* **Azaltma:** MVP ile erken geri bildirim, beta programı, aggressive marketing


* **Risk:** Competitor advantage
* **Olasılık:** Yüksek
* **Etki:** Orta
* **Azaltma:** Unique selling points, hızlı iterasyon, müşteri ilişkileri



**9.3. Operasyonel Riskler**

* **Risk:** Support yükü yönetilemeyebilir
* **Olasılık:** Orta
* **Etki:** Orta
* **Azaltma:** Self-service documentation, chatbot, ticket automation


* **Risk:** Security breach
* **Olasılık:** Düşük
* **Etki:** Kritik
* **Azaltma:** Security audits, penetration testing, incident response plan



---

### 10. Ekler

**10.1. Örnek Kullanım Senaryoları**

* **Senaryo 1: Yeni Tenant Oluşturma**
1. Süper admin paneline giriş
2. "Yeni Site Ekle" butonuna tıklama
3. Form doldurma (Site adı, domain, paket)
4. Otomatik provisioning (5 dakika içinde)
5. İlk admin kullanıcısı oluşturma
6. Demo içerik yükleme (opsiyonel)
7. Site yayında


* **Senaryo 2: Sayfa Oluşturma**
1. Tenant admin paneline giriş
2. "Sayfalar" → "Yeni Sayfa"
3. Sayfa şablonu seçme veya boş başlama
4. Drag & drop ile bileşen ekleme
5. Bileşen özelliklerini düzenleme
6. SEO bilgilerini girme
7. Önizleme kontrolü
8. Yayınlama


* **Senaryo 3: Çoklu Dil Eklemek**
1. Ayarlar → Diller
2. "Yeni Dil Ekle" (örn: İngilizce)
3. Mevcut içerikleri seçme
4. Otomatik çeviri başlatma
5. Manuel düzeltmeler yapma
6. Hreflang kontrolü
7. Yayınlama



**10.2. Glossary (Terimler Sözlüğü)**

* **Tenant:** CMS üzerinde barınan her bir müşteri/firma
* **Multi-Tenant:** Tek yazılımın birden fazla müşteriyi desteklemesi
* **SSR:** Server-Side Rendering (Sunucu taraflı işleme)
* **Schema:** PostgreSQL veritabanı şeması
* **Component/Block:** Sayfa oluşturmada kullanılan yapı taşları
* **Core Web Vitals:** Google'ın performans metrikleri
* **RBAC:** Role-Based Access Control
* **JWT:** JSON Web Token (kimlik doğrulama)

**10.3. Referanslar**

* Next.js Dokümantasyonu: [https://nextjs.org/docs](https://nextjs.org/docs)
* NestJS Dokümantasyonu: [https://docs.nestjs.com](https://docs.nestjs.com)
* PostgreSQL Multi-Tenancy: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
* Core Web Vitals: [https://web.dev/vitals/](https://web.dev/vitals/)
* Schema.org: [https://schema.org/](https://schema.org/)

> **Doküman Versiyonu:** 1.0
> **Son Güncelleme:** {{ current_date }}
> **Hazırlayan:** Product Team
> **Durum:** Draft → Review → Approved
