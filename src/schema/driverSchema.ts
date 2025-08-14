import z from "zod";

export const driverSchema = z.object({
  fullName: z.string(),
  tripsCount: z.number().min(0, "Trip Count can not be negative"),
  status: z.enum(["available", "working", "booked"]),
});

export type DriverForm = z.infer<typeof driverSchema>;
