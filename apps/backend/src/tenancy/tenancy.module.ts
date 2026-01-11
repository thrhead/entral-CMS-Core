import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TenancyMiddleware } from './tenancy.middleware';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
})
export class TenancyModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TenancyMiddleware)
            .exclude({ path: 'initial-seed', method: RequestMethod.GET })
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
