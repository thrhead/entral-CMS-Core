import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        // request.tenant is set by TenancyMiddleware
        if (!request.tenant) {
            throw new UnauthorizedException('Tenant contest could not be resolved.');
        }

        return true;
    }
}
