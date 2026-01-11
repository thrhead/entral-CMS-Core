import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const host = "localhost:3000";
    const domainName = host.split(':')[0];

    console.log(`Input Host: ${host}`);
    console.log(`Parsed Domain: ${domainName}`);

    const domainRecord = await prisma.domain.findUnique({
        where: { domain: domainName },
        include: { tenant: true },
    });

    if (domainRecord) {
        console.log('✅ Tenant Found:', domainRecord.tenant.slug);
    } else {
        console.error('❌ Tenant NOT Found for domain:', domainName);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
