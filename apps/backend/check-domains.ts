import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking Domains...');
    const domains = await prisma.domain.findMany({
        include: { tenant: true }
    });
    console.log('Domains found:', domains);

    const tenants = await prisma.tenant.findMany();
    console.log('Tenants found:', tenants);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
