import { create } from 'zustand';
import {
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  differenceInMonths,
} from 'date-fns';

import { Subscription } from '@/types/subscription';
import { subscriptions } from '@/data/subscriptions';

interface SubscriptionState {
  subscriptions: Subscription[];
  setSubscriptions: (subscriptions: Subscription[]) => void;
  getMonthSubscriptions: (date: Date) => Subscription[];
}

export const useSubscriptions = create<SubscriptionState>((set) => ({
  subscriptions: subscriptions,
  setSubscriptions: (subscriptions: Subscription[]) => set({ subscriptions }),
  getMonthSubscriptions: (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    return subscriptions.filter((subscription) => {
      const isStarted = subscription.startDate <= monthEnd;
      const isActive =
        subscription.endDate === null || subscription.endDate >= monthStart;

      if (!isStarted || !isActive) return false;

      const monthsSinceStart = differenceInMonths(date, subscription.startDate);

      switch (subscription.interval) {
        case 'monthly':
          return true; // Monthly subscriptions are always active if they've started and haven't ended
        case 'quarterly':
          // Check if this is a billing month (every 3 months)
          return monthsSinceStart % 3 === 0;
        case 'yearly':
          // Check if this is the billing month (every 12 months)
          return monthsSinceStart % 12 === 0;
        default:
          return isWithinInterval(date, {
            start: subscription.startDate,
            end: subscription.endDate || new Date(9999, 11, 31), // Far future date if no end date
          });
      }
    });
  },
}));
