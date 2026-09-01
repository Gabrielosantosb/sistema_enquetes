import { createZodDto } from 'nestjs-zod';

import { createEnqueteBaseSchema } from './create-enquete.dto';

export const updateEnqueteBaseSchema = createEnqueteBaseSchema.partial();

export const updateEnqueteSchema = updateEnqueteBaseSchema
  .refine((dados) => Object.keys(dados).length > 0, {
    message: 'Informe ao menos um campo para atualizar',
  })
  .refine(
    ({ dataInicio, dataFim }) =>
      dataInicio === undefined || dataFim === undefined || dataFim > dataInicio,
    {
      message: 'A data de termino deve ser posterior a data de inicio',
      path: ['dataFim'],
    },
  );

export class UpdateEnqueteDto extends createZodDto(updateEnqueteSchema) {}
