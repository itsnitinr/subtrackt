import { IconType } from 'react-icons';

export interface Subscription {
  id: string;
  name: string;
  image: IconType | string;
  startDate: Date;
  // null endDate if the subscription is still active
  endDate: Date | null;
  price: number;
  interval: 'monthly' | 'quarterly' | 'yearly';
}
