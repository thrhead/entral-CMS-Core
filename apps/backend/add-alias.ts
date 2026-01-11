import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding 127.0.0.1 alias...');

    const tenant = await prisma.tenant.findUnique({
        where: { slug: 'default-tenant' }
    });

    if (!tenant) {
        console.error('Default tenant not found');
        return;
    }

    try {
        const domain = await prisma.domain.create({
            data: {
                domain: '127.0.0.1',
                tenantId: tenant.id,
                isPrimary: false
            }
        });
        console.log('✅ Added domain:', domain);
    } catch (e: any) {
        if (e.code === 'P2002') {
            console.log('ℹ️ Domain 127.0.0.1 already exists');
        } else {
            throw e;
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
