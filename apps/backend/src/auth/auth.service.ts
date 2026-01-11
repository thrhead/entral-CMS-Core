import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { tenancyStore } from '../tenancy/tenancy.store';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/tenant-client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const store = tenancyStore.getStore();
        const payload = {
            email: user.email,
            sub: user.id,
            tenantId: store?.tenant.id,
            role: user.role
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: Prisma.UserCreateInput) {
        // Check if user exists
        const existing = await this.usersService.findOne(data.email);
        if (existing) {
            throw new ConflictException('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.usersService.create({
            ...data,
            password: hashedPassword,
        });

        return this.login(user);
    }
}
