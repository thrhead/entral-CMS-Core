import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTenancyService } from './prisma-tenancy.service';

@Global()
@Module({
    providers: [PrismaService, PrismaTenancyService],
    exports: [PrismaService, PrismaTenancyService],
})
export class PrismaModule { }
