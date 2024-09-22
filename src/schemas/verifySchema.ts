import { z } from 'zod';

export const verifySchema = z.object({
  code: z.string().length(6, 'VerifyCode must me 6 digits'),
});
