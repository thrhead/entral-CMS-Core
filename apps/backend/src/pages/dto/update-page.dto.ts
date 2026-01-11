import { Prisma } from '@prisma/tenant-client';

export class UpdatePageDto {
    title?: string;
    slug?: string;
    content?: Prisma.InputJsonValue;
    isPublished?: boolean;
}
