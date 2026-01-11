import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaTenancyService } from '../prisma/prisma-tenancy.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from '@prisma/tenant-client';

@Injectable()
export class PagesService {
    constructor(private readonly prisma: PrismaTenancyService) { }

    async findAll(): Promise<Page[]> {
        return this.prisma.run(async (client) => {
            return client.$queryRawUnsafe<Page[]>(`SELECT * FROM "pages"`);
        });
    }

    async findOne(id: string): Promise<Page> {
        return this.prisma.run(async (client) => {
            const pages = await client.$queryRawUnsafe<Page[]>(
                `SELECT * FROM "pages" WHERE "id" = $1 LIMIT 1`,
                id
            );
            if (!pages[0]) {
                throw new NotFoundException(`Page with ID ${id} not found`);
            }
            return pages[0];
        });
    }

    async findBySlug(slug: string): Promise<Page> {
        return this.prisma.run(async (client) => {
            const pages = await client.$queryRawUnsafe<Page[]>(
                `SELECT * FROM "pages" WHERE "slug" = $1 LIMIT 1`,
                slug
            );
            if (!pages[0]) {
                throw new NotFoundException(`Page with slug ${slug} not found`);
            }
            return pages[0];
        });
    }

    async create(createPageDto: CreatePageDto): Promise<Page> {
        return this.prisma.run(async (client) => {
            const id = crypto.randomUUID();
            const now = new Date(); // Pass Date object
            const content = createPageDto.content ? JSON.stringify(createPageDto.content) : null;

            const result = await client.$queryRawUnsafe<Page[]>(
                `INSERT INTO "pages" ("id", "title", "slug", "content", "isPublished", "createdAt", "updatedAt") 
                 VALUES ($1, $2, $3, $4::jsonb, $5, $6, $6) 
                 RETURNING *`,
                id, createPageDto.title, createPageDto.slug, content, createPageDto.isPublished || false, now
            );
            return result[0];
        });
    }

    async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
        return this.prisma.run(async (client) => {
            const now = new Date(); // Pass Date object
            // Note: This is a partial update. Building dynamic SQL query is safer but for MVP:
            // We fetch existing, merge in memory (or use COALESCE in SQL if complex).
            // Let's use a simple approach: Fetch first via findOne (which uses safe raw query now).

            // Check existence
            const existingPages = await client.$queryRawUnsafe<Page[]>(
                `SELECT * FROM "pages" WHERE "id" = $1 LIMIT 1`, id
            );
            if (!existingPages[0]) throw new NotFoundException(`Page with ID ${id} not found`);
            const existing = existingPages[0];

            const title = updatePageDto.title ?? existing.title;
            const slug = updatePageDto.slug ?? existing.slug;
            const isPublished = updatePageDto.isPublished ?? existing.isPublished;
            // Handle content carefully. If undefined, keep existing.
            const content = updatePageDto.content !== undefined ?
                (updatePageDto.content ? JSON.stringify(updatePageDto.content) : null)
                : (existing.content ? JSON.stringify(existing.content) : null);

            const result = await client.$queryRawUnsafe<Page[]>(
                `UPDATE "pages" 
                 SET "title" = $2, "slug" = $3, "content" = $4::jsonb, "isPublished" = $5, "updatedAt" = $6
                 WHERE "id" = $1
                 RETURNING *`,
                id, title, slug, content, isPublished, now
            );
            return result[0];
        });
    }

    async remove(id: string): Promise<Page> {
        return this.prisma.run(async (client) => {
            // Check existence
            const existingPages = await client.$queryRawUnsafe<Page[]>(
                `SELECT * FROM "pages" WHERE "id" = $1 LIMIT 1`, id
            );
            if (!existingPages[0]) throw new NotFoundException(`Page with ID ${id} not found`);

            const result = await client.$queryRawUnsafe<Page[]>(
                `DELETE FROM "pages" WHERE "id" = $1 RETURNING *`,
                id
            );
            return result[0];
        });
    }
}
