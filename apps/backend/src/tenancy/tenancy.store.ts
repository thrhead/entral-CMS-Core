import { AsyncLocalStorage } from 'async_hooks';
import { Tenant } from '@prisma/client';

export interface TenancyContext {
    tenant: Tenant;
}

export const tenancyStore = new AsyncLocalStorage<TenancyContext>();
