export interface IEditServiceArgs {
  serviceId: number;
  category?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  durationUnit?: string;
  inHouse?: boolean;
}
