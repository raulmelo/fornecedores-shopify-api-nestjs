import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$disconnect().then( async () => {
            console.log('Prisma client disconnected');
            await app.close();
        });
    }
}