import { Prisma } from '@prisma/tenant-client';

export class CreatePageDto {
    title: string;
    slug: string;
    content?: Prisma.InputJsonValue;
    isPublished?: boolean;
}
