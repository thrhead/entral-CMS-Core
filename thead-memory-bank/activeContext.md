# Aktif Bağlam (Active Context)

## Şu Anki Durum
Proje'de **Faz 1, Faz 2 ve Faz 3** başarıyla tamamlanmıştır.
Multi-tenancy altyapısı, Backend API'leri (Auth, Users, Pages) ve Frontend entegrasyonu (Login, Dashboard, Page Management) canlı ve çalışır durumdadır.

## Aktif Odak (Tamamlandı)
Aşağıdaki kritik sistemler devreye alındı:
1.  **Backend & Database:** Postgres (Split Schema), Redis Caching, Tenant Resolver.
2.  **Auth System:** JWT, RBAC, Tenant-aware authentication.
3.  **Frontend:** Next.js Dashboard, API Client (Port 3001 fix), Sayfa Yönetimi UI.

## Son Kararlar (Technical Decisions)
*   **Raw SQL Kullanımı:** Tenant şemalarındaki (`tenant_<id>`) tablolar (`User`, `Page` vb.) için Prisma Client'ın `search_path` hatası nedeniyle `Raw SQL ($queryRawUnsafe)` kullanımına geçilmiştir.
*   **Port Konfigürasyonu:** Backend 3001, Frontend 3000 portunda çalışacak şekilde sabitlenmiştir.

## Sonraki Adımlar
*   Tenant oluşturma otomasyonu (Migration yönetimi).
*   Süper Admin paneli özelliklerinin eklenmesi.
