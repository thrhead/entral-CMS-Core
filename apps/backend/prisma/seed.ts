import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a default tenant for localhost
    const tenantSlug = 'default-tenant';

    const existing = await prisma.tenant.findUnique({
        where: { slug: tenantSlug },
    });

    if (!existing) {
        const tenant = await prisma.tenant.create({
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
        console.log('Created tenant:', tenant);
    } else {
        console.log('Tenant already exists:', existing);
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
