import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Diligencie nombre de usuario!",
  }),
  fechanac: z.string({
      required_error: "Diligencie fecha de nacimiento!",
    }),
  identificacion: z.string({
      required_error: "Diligencie identificación!",
    }),
  email: z.string({
      required_error: "Diligencie correo electrónico!",
    })
    .email({
      message: "Correo electrónico no válido!",
    }),
  celular: z.string({
      required_error: "Diligencie celular!",
    }),
  password: z.string({
      required_error: "Diligencie contgraseña!",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 carácteres!",
    }),
    perfil: z.string({
      required_error: "Perfil es requerido!",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
