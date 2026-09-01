import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MIN_OPCOES = 3;

const dataComOffset = z.iso
  .datetime({ offset: true })
  .transform((valor) => new Date(valor));

export const createEnqueteBaseSchema = z.object({
  pergunta: z
    .string()
    .trim()
    .min(1, 'A pergunta e obrigatoria')
    .max(500, 'A pergunta deve ter no maximo 500 caracteres'),

  opcoes: z
    .array(
      z
        .string()
        .trim()
        .min(1, 'A opcao nao pode ser vazia')
        .max(200, 'A opcao deve ter no maximo 200 caracteres'),
    )
    .min(MIN_OPCOES, `A enquete deve ter no minimo ${MIN_OPCOES} opcoes`)
    .refine((opcoes) => new Set(opcoes).size === opcoes.length, {
      message: 'As opcoes nao podem se repetir',
    }),

  dataInicio: dataComOffset,
  dataFim: dataComOffset,
});

export const createEnqueteSchema = createEnqueteBaseSchema.refine(
  ({ dataInicio, dataFim }) => dataFim > dataInicio,
  {
    message: 'A data de termino deve ser posterior a data de inicio',
    path: ['dataFim'],
  },
);

export class createEnqueteDto extends createZodDto(createEnqueteSchema) {}
