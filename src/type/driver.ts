type StatusType = "working" | "avaiable" | "booked";

export interface Driver {
  fullName: string;
  tripsCount: number;
  status: StatusType;
}

export interface DriverProps {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
}
