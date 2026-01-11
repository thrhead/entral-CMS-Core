# Ürün Bağlamı (Product Context)

## Ürün: Central CMS Core (C3)

**Versiyon:** 1.0 (PRD v1.0 referanslı)
**Tarih:** 11.01.2026

### 1. Vizyon ve Amaç
Kurumsal firmaların dijital varlıklarını tek bir merkezden, yüksek SEO performansı ve tam güvenlik ile yönetebilecekleri, **Multi-Tenant** (Çoklu Kiracı) mimarili tescilli bir CMS altyapısı oluşturmak. "Tek Kod Tabanı, Çoklu Veritabanı" prensibiyle çalışarak merkezi yönetim ve ölçeklenebilirlik sağlar.

### 2. Hedef Kitle
* Çoklu marka veya bölgesel siteleri olan kurumsal şirketler
* Dijital ajanslar (Müşteri siteleri yönetimi için)
* Franchise işletmeler
* Holding şirketleri

### 3. Başarı Kriterleri
* **Performans:** Core Web Vitals tüm değerlerde "İyi" (Yeşil), LCP < 2.5s, TTI < 100ms. Sayfa yükleme süresi < 2 saniye.
* **Uptime:** %99.9 garanti.
* **Operasyon:** Yeni tenant ekleme süresi < 5 dakika. Otomatik billing ve onboarding.
* **SEO:** Otomatik schema işaretleme, dinamik sitemap, tam SSR.

### 4. Özellik Seti (High Level)

#### 4.1 Yönetim Panelleri
* **Süper Admin Paneli:** Merkezi tenant yönetimi, kaynak izleme, modül modülasyonu, sistem logları.
* **Tenant (Firma) Paneli:** Sürükle-bırak sayfa oluşturucu, çoklu dil yönetimi, medya kütüphanesi, rol tabanlı erişim (RBAC).

#### 4.2 Sunum Katmanı (Frontend)
* **Next.js SSR:** Tam sunucu taraflı render, Google bot dostu.
* **Tema Motoru:** JSON tabanlı tema yapılandırması, hot-swap tema desteği.
* **Bileşen Sistemi:** Atomic design, erişilebilir (WCAG 2.1 AA).

#### 4.3 Modüller (Genişletilebilirlik)
* **Temel:** Blog, Sayfa, Medya.
* **Gelişmiş:** E-ticaret, İK, Form Builder, Event/Etkinlik.

### 5. Kullanım Senaryoları
1. **Yeni Tenant:** 5 dakika içinde domain tanımlama, veritabanı seed etme ve yayına alma.
2. **Global İçerik:** Bir içeriğin tek tuşla 5 dile çevrilip ilgili alt alan adlarında (/tr, /en) yayına alınması.
3. **Kampanya Sayfası:** Pazarlama ekibinin sürükle-bırak editör ile IT'den bağımsız "Landing Page" oluşturması.
