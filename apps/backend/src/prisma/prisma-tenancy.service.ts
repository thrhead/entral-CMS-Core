import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/tenant-client';
import { tenancyStore } from '../tenancy/tenancy.store';

@Injectable()
export class PrismaTenancyService {
    private client: PrismaClient;

    constructor() {
        // Initialize the client specific to tenants
        // Remove 'schema' param to prevent Prisma from prepending it to table names
        const url = process.env.DATABASE_URL?.replace(/[?&]schema=[^&]+/, '');
        this.client = new PrismaClient({
            datasources: {
                db: {
                    url: url
                }
            }
        });
    }

    /**
     * Executes a database operation within the current tenant's context.
     * It ensures the correct schema is set via 'SET search_path'.
     */
    async run<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
        const store = tenancyStore.getStore();
        if (!store || !store.tenant) {
            throw new Error('Tenant context is missing. Are you using TenancyMiddleware?');
        }

        const schemaName = `tenant_${store.tenant.id}`;

        return await this.client.$transaction(async (tx: PrismaClient) => {
            await tx.$executeRawUnsafe(`SET search_path = "${schemaName}", "public"`);
            return await fn(tx as unknown as PrismaClient);
        });
    }

    /**
     * Optional: Direct access if needed, but unsafe without search_path
     */
    get unsafeClient(): PrismaClient {
        return this.client;
    }
}
