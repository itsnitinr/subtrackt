'use client';

import { useState } from 'react';
import { isSameMonth, getDate } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { DatePill } from '@/components/date-pill';
import { AddSubscriptionOnDate } from '@/components/modals/add-subscription-on-date';

import { useSubscriptions } from '@/hooks/use-subscriptions';

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

  const { getMonthSubscriptions, subscriptions } = useSubscriptions();

  const monthSubscriptions = getMonthSubscriptions(monthToShow, subscriptions);

  const [dateToAddTo, setDateToAddTo] = useState<Date | null>(null);

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
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <AddSubscriptionOnDate
        open={!!dateToAddTo}
        onClose={() => setDateToAddTo(null)}
        dateToAddTo={dateToAddTo || new Date()}
      />
    </>
  );
};
