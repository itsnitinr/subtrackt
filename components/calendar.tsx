'use client';

import { useState, useEffect } from 'react';
import { isSameMonth, getDate } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { DatePill } from '@/components/date-pill';
import { AddSubscriptionOnDate } from '@/components/modals/add-subscription-on-date';
import { SubscriptionsSummary } from '@/components/modals/subscriptions-summary';

import { useSubscriptions } from '@/hooks/use-subscriptions';
import { Subscription } from '@/types/subscription';
import { oldToNewLogoMap } from '@/lib/migrate-logos';

interface CalendarProps {
  dates: Date[];
  monthToShow: Date;
  direction: number;
}

export const Calendar = ({ dates, monthToShow, direction }: CalendarProps) => {
  const slideVariants = {
    initial: (direction: number) => ({
      y: direction * 40,
      opacity: 0,
    }),
    animate: { y: 0, opacity: 1 },
    exit: (direction: number) => ({
      y: direction * -40,
      opacity: 0,
    }),
  };

  const { getMonthSubscriptions, subscriptions, updateSubscription } =
    useSubscriptions();

  const monthSubscriptions = getMonthSubscriptions(monthToShow, subscriptions);

  const [dateToAddTo, setDateToAddTo] = useState<Date | null>(null);
  const [subscriptionToShow, setSubscriptionToShow] = useState<Subscription[]>(
    []
  );

  useEffect(() => {
    const migrateLogos = () => {
      if (localStorage.getItem('LOGO_MIGRATION_COMPLETE')) return;

      subscriptions.forEach((subscription) => {
        if (
          oldToNewLogoMap[subscription.image as keyof typeof oldToNewLogoMap]
        ) {
          updateSubscription(subscription.id, {
            ...subscription,
            image:
              oldToNewLogoMap[
                subscription.image as keyof typeof oldToNewLogoMap
              ],
          });
        }
      });

      localStorage.setItem('LOGO_MIGRATION_COMPLETE', 'true');
    };

    migrateLogos();
  }, [subscriptions, updateSubscription]);

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={monthToShow.toISOString()}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="grid grid-cols-7 gap-2"
        >
          {dates.map((date) => (
            <DatePill
              key={date.toISOString()}
              date={date}
              isCurrentMonth={isSameMonth(date, monthToShow)}
              subscriptions={monthSubscriptions.filter(
                (subscription) =>
                  getDate(subscription.startDate) === getDate(date)
              )}
              onAddSubscription={() => setDateToAddTo(date)}
              onShowSubscriptionsSummary={(subscription) =>
                setSubscriptionToShow(subscription)
              }
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <AddSubscriptionOnDate
        open={!!dateToAddTo}
        onClose={() => setDateToAddTo(null)}
        dateToAddTo={dateToAddTo || new Date()}
      />
      <SubscriptionsSummary
        open={!!subscriptionToShow.length}
        onClose={() => setSubscriptionToShow([])}
        subscriptions={subscriptionToShow}
      />
    </>
  );
};
