import { OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): any;
    enableShutdownHooks(app: INestApplication): any;
}
