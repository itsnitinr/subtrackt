import { isSameMonth } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { DatePill } from '@/components/date-pill';

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

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={monthToShow.toISOString()}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="grid grid-cols-7 gap-2 overflow-hidden"
      >
        {dates.map((date) => (
          <DatePill
            key={date.toISOString()}
            date={date}
            isCurrentMonth={isSameMonth(date, monthToShow)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
