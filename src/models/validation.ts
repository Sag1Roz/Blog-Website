import z from "zod";

export const validation = z.object({
  firstName: z
    .string()
    .min(2, "שם צריך להכיל לפחות שני תווים")
    .max(10, "שם צריך להכיל עד עשרה תווים"),
  lastName: z
    .string()
    .min(2, "שם משפחה צריך להכיל לפחות שני תווים")
    .max(10, "שם משפחה צריך להכיל עד עשרה תווים"),
  email: z.string().email("איימל לא תקין"),
  nikName: z
    .string()
    .min(2, "ניק ניים צריך להכיל לפחות שני תווים")
    .max(12, "ניק ניים צריך להכיל עד שניים עשר תווים"),
});

export const login = z.object({
  email: z.string().email("איימל לא תקין"),
});

export type SchemaValidation = z.infer<typeof validation>;
export type LoginValidation = z.infer<typeof login>;
