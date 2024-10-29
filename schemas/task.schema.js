import { z } from "zod";

export const createTaskSchema = z.object({
  codigo: z.string({
    required_error: "El código es requerido!",
  }),
});
