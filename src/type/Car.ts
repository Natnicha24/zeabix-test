type StatusType = "working" | "available" | "booked";

export interface Car {
  model: string;
  plate: string;
  usageCount: number;
  status: StatusType;
}

export interface CarProps {
  cars: Car[];
  loading: boolean;
  error: string | null;
}
