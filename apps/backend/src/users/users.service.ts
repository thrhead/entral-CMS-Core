import { Injectable } from '@nestjs/common';
import { PrismaTenancyService } from '../prisma/prisma-tenancy.service';
import { User, Prisma } from '@prisma/tenant-client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaTenancyService) { }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.run(async (client) => {
            const users = await client.$queryRawUnsafe<User[]>(
                `SELECT * FROM "users" WHERE "email" = $1 LIMIT 1`,
                email
            );
            return users[0] || null;
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.run(async (client) => {
            // Provide fallback for optional fields
            const id = data.id || crypto.randomUUID();
            const role = data.role || 'EDITOR';
            const now = new Date().toISOString();
            // Note: Postgres timestamps might need formatting or ISO string

            // We need to handle hashing if not done? AuthService hashes it.
            // Data contains hashed password.

            // Warning: SQL injection risk if data fields unvalidated.
            // Using parameterized query is best.
            // $queryRawUnsafe allows parameters.

            const result = await client.$queryRawUnsafe<User[]>(
                `INSERT INTO "users" ("id", "email", "password", "name", "role", "createdAt", "updatedAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $6) 
                RETURNING *`,
                id, data.email, data.password, data.name || null, role, now
            );
            return result[0];
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.run(async (client) => {
            const users = await client.$queryRawUnsafe<User[]>(
                `SELECT * FROM "users" WHERE "id" = $1 LIMIT 1`,
                id
            );
            return users[0] || null;
        });
    }
}
