import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // 1. Create Default Tenant
    const tenantSlug = 'default-tenant';
    let tenant = await prisma.tenant.findUnique({
        where: { slug: tenantSlug },
    });

    if (!tenant) {
        tenant = await prisma.tenant.create({
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
        console.log('Created tenant:', tenant.id);
    } else {
        console.log('Tenant already exists:', tenant.id);
    }

    const tenantId = tenant.id;
    const schemaName = `tenant_${tenantId.replace(/-/g, '_')}`; // Ensure valid SQL identifier, usually we use tenant_<id> or just replace - with _
    // Wait, my PrismaTenancyService uses `tenant_${tenantId}`. Let's check how it formats it.
    // GUIDs contain dashes. Postgres schemas can contain dashes if quoted, but unquoted identifiers can't.
    // PrismaTenancyService uses: `SET search_path = "tenant_${tenantId}"`. It quotes it.
    // So I should use the exact UUID.
    const quotedSchema = `"tenant_${tenantId}"`;

    console.log(`Setting up schema: ${quotedSchema}`);

    // 2. Create Schema
    await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS ${quotedSchema}`);

    // 3. Create ENUMs and Tables (Manual Migration basically)
    // Note: Creating Types in a specific schema requires prefixing or setting search_path.

    // Set search path for the following commands
    // We can't toggle search_path in one transaction easily with Prisma client in implicit way, so we explicitly prefix names OR use SET.
    // Let's use SET search_path for the session if possible, but executeRaw is separate connection usually? 
    // Prisma executeRaw might use different connections from pool.
    // Safe way: Fully qualify names.

    // 3a. Role Enum
    try {
        await prisma.$executeRawUnsafe(`CREATE TYPE ${quotedSchema}."Role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER')`);
    } catch (e: any) {
        // Ignore if exists
        if (!e.message.includes('already exists')) console.warn('Enum error (might exist):', e.message);
    }

    // 3b. User Table
    await prisma.$executeRawUnsafe(`
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

    // Unique Index on email
    await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON ${quotedSchema}."users"("email");
    `);

    // 3c. Page Table
    await prisma.$executeRawUnsafe(`
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
    // Note: `email` field in `pages`? Copied from user? No, Page model has title, slug. 
    // Wait, looking at tenant.prisma: Page { id, title, slug, content, isPublished ... }
    // Remove email from Pages table definition above.

    await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_key" ON ${quotedSchema}."pages"("slug");
    `);

    // 4. Create Admin User
    const adminEmail = 'admin@example.com';
    const rawPassword = 'password123';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Check if user exists
    // We can use raw query to select
    const users = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM ${quotedSchema}."users" WHERE "email" = '${adminEmail}'`);

    if (users.length === 0) {
        // Insert
        const userId = 'user_admin_01'; // or uuid
        await prisma.$executeRawUnsafe(`
            INSERT INTO ${quotedSchema}."users" ("id", "email", "password", "name", "role", "updatedAt")
            VALUES ('${userId}', '${adminEmail}', '${hashedPassword}', 'Admin User', 'ADMIN', NOW());
        `);
        console.log(`Created admin user: ${adminEmail} / ${rawPassword}`);
    } else {
        console.log(`Admin user already exists: ${adminEmail}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
