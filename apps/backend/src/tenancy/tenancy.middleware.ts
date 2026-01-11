import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { tenancyStore } from './tenancy.store';
import { Tenant } from '@prisma/client';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: RedisService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const fs = require('fs');
        try {
            const host = req.headers.host;
            const tenantIdHeader = req.headers['x-tenant-id'] as string;
            fs.appendFileSync('middleware.log', `[TenancyMiddleware] Host: ${host}, Header: ${tenantIdHeader}\n`);

            let tenant: Tenant | null = null;

            // 1. Dev/Test Override
            if (tenantIdHeader) {
                tenant = await this.prisma.tenant.findUnique({
                    where: { slug: tenantIdHeader },
                });
            }
            // 2. Domain Lookup
            else if (host) {
                const domainName = host.split(':')[0];
                const cacheKey = `tenant_domain:${domainName}`;

                // Check Redis
                const cachedTenant = await this.redis.get(cacheKey);
                if (cachedTenant) {
                    tenant = JSON.parse(cachedTenant);
                } else {
                    // Check DB
                    const domainRecord = await this.prisma.domain.findUnique({
                        where: { domain: domainName },
                        include: { tenant: true },
                    });

                    if (domainRecord) {
                        tenant = domainRecord.tenant;
                        await this.redis.set(cacheKey, JSON.stringify(tenant), 3600);
                    }
                }
            }

            if (!tenant) {
                fs.appendFileSync('middleware.log', `[TenancyMiddleware] Tenant not found for host: ${host}\n`);
                throw new NotFoundException('Tenant not found');
            }

            // fs.appendFileSync('middleware.log', `[TenancyMiddleware] Tenant found: ${tenant.slug}\n`);

            // 3. Attach to Request & ALS
            (req as any).tenant = tenant;

            tenancyStore.run({ tenant }, () => {
                next();
            });
        } catch (e: any) {
            fs.appendFileSync('middleware.log', `[TenancyMiddleware] Error: ${e.message}\n`);
            throw e;
        }
    }
}
