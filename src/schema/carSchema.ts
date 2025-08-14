import z from "zod";

export const carSchema = z.object({
  model: z.string(),
  plate: z
    .string()
    .regex(/^[ก-ฮ]{2}\d{4} [ก-๛\s]+$/, "Invalid plate format") 
    .min(1, "Plate is required"),
  usageCount: z.number().min(0,"Usage can not be negative"),
  status: z.enum(["available", "working", "booked"]),
});

export type CarForm=z.infer<typeof carSchema>