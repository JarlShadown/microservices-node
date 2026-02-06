import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'jest-mock-extended';

// Exportamos el mock para usarlo en los tests
export const prismaMock = mockDeep<PrismaClient>();
