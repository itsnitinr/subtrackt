import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import {
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  differenceInMonths,
} from 'date-fns';

import { Subscription } from '@/types/subscription';

interface SubscriptionState {
  subscriptions: Subscription[];
  setSubscriptions: (subscriptions: Subscription[]) => void;
  getMonthSubscriptions: (
    date: Date,
    subscriptions: Subscription[]
  ) => Subscription[];
  addSubscription: (subscription: Subscription) => void;
  removeSubscription: (id: string) => void;
  updateSubscription: (id: string, subscription: Subscription) => void;
}

export const useSubscriptions = create(
  persist<SubscriptionState>(
    (set, get) => ({
      subscriptions: [],
      setSubscriptions: (subscriptions: Subscription[]) =>
        set({ subscriptions }),
      getMonthSubscriptions: (date: Date, subscriptions: Subscription[]) => {
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);

        return subscriptions.filter((subscription) => {
          const subscriptionStart = new Date(subscription.startDate);
          const subscriptionEnd = subscription.endDate
            ? new Date(subscription.endDate)
            : null;

          const isStarted = subscriptionStart <= monthEnd;
          const isActive =
            subscriptionEnd === null || subscriptionEnd >= monthStart;

          if (!isStarted || !isActive) return false;

          const monthsSinceStart = differenceInMonths(
            date,
            subscription.startDate
          );

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
      addSubscription: (subscription: Subscription) => {
        const subscriptions = get().subscriptions;
        const updatedSubscriptions = [...subscriptions, subscription];
        set({ subscriptions: updatedSubscriptions });
      },
      removeSubscription: (id: string) => {
        const subscriptions = get().subscriptions;
        const updatedSubscriptions = subscriptions.filter(
          (subscription) => subscription.id !== id
        );
        set({ subscriptions: updatedSubscriptions });
      },
      updateSubscription: (id: string, subscription: Subscription) => {
        const subscriptions = get().subscriptions;
        const updatedSubscriptions = subscriptions.map((s) =>
          s.id === id ? subscription : s
        );
        set({ subscriptions: updatedSubscriptions });
      },
    }),
    {
      name: 'subscriptions-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
