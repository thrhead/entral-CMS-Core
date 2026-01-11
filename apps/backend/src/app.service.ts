import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async seed() {
    // 1. Create Default Tenant
    const tenantSlug = 'default-tenant';
    let tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      tenant = await this.prisma.tenant.create({
        data: {
          name: 'Default Tenant',
          slug: tenantSlug,
          isActive: true,
          domains: {
            create: {
              domain: 'localhost',
              isPrimary: true,
            },
          },
        },
      });
    }

    const tenantId = tenant.id;
    const quotedSchema = `"tenant_${tenantId}"`;

    // 2. Create Schema
    await this.prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS ${quotedSchema}`);

    // 3. Create ENUMs and Tables
    try {
      await this.prisma.$executeRawUnsafe(`CREATE TYPE ${quotedSchema}."Role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER')`);
    } catch (e: any) {
      if (!e.message.includes('already exists')) console.warn('Enum exists');
    }

    await this.prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS ${quotedSchema}."users" (
            "id" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "name" TEXT,
            "role" ${quotedSchema}."Role" NOT NULL DEFAULT 'EDITOR',
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "users_pkey" PRIMARY KEY ("id")
        );
    `);

    await this.prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON ${quotedSchema}."users"("email");
    `);

    await this.prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS ${quotedSchema}."pages" (
            "id" TEXT NOT NULL,
            "title" TEXT NOT NULL,
            "slug" TEXT NOT NULL,
            "content" JSONB,
            "isPublished" BOOLEAN NOT NULL DEFAULT false,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
        );
    `);

    await this.prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_key" ON ${quotedSchema}."pages"("slug");
    `);

    // 4. Create Admin User
    const adminEmail = 'admin@example.com';
    const rawPassword = 'password123';
    // Requires: import * as bcrypt from 'bcrypt';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const users = await this.prisma.$queryRawUnsafe<any[]>(`SELECT * FROM ${quotedSchema}."users" WHERE "email" = '${adminEmail}'`);

    if (users.length === 0) {
      const userId = 'user_admin_01';
      await this.prisma.$executeRawUnsafe(`
            INSERT INTO ${quotedSchema}."users" ("id", "email", "password", "name", "role", "updatedAt")
            VALUES ('${userId}', '${adminEmail}', '${hashedPassword}', 'Admin User', 'ADMIN', NOW());
        `);
      return { message: 'Seeding complete. Admin created.', email: adminEmail, password: rawPassword };
    } else {
      return { message: 'Admin already exists.', email: adminEmail };
    }
  }
}
