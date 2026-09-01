import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const votarSchema = z.object({
  opcaoId: z.uuid('Informe o id de uma opcao valida'),
});

export class VotarDto extends createZodDto(votarSchema) {}
