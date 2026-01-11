import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
    constructor(private readonly prisma: PrismaService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const host = req.headers.host;

        // Development override via header (optional)
        const tenantIdHeader = req.headers['x-tenant-id'] as string;

        let tenant;

        if (tenantIdHeader) {
            // Direct lookup by ID/Slug for testing
            tenant = await this.prisma.tenant.findUnique({
                where: { slug: tenantIdHeader }, // Assuming header sends slug
            });
        } else if (host) {
            // Domain lookup
            // Strip port number if exists (localhost:3000 -> localhost)
            const domainName = host.split(':')[0];

            const domainRecord = await this.prisma.domain.findUnique({
                where: { domain: domainName },
                include: { tenant: true },
            });

            if (domainRecord) {
                tenant = domainRecord.tenant;
            }
        }

        if (!tenant) {
            // Fallback or Error
            // For now, throw 404 if no tenant found
            throw new NotFoundException('Tenant not found');
        }

        // Attach tenant to request object
        (req as any).tenant = tenant;

        next();
    }
}
