import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface MonthSwitcherProps {
  month: Date;
  onPrevious: () => void;
  onNext: () => void;
  direction: number;
}

export const MonthSwitcher = ({
  month,
  onPrevious,
  onNext,
  direction,
}: MonthSwitcherProps) => {
  const slideVariants = {
    initial: (direction: number) => ({ y: direction * 20, opacity: 0 }),
    animate: { y: 0, opacity: 1 },
    exit: (direction: number) => ({ y: direction * -20, opacity: 0 }),
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.h2
            key={format(month, 'MMMM yyyy')}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
            className="text-xl font-medium"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {format(month, 'MMMM')}
          </motion.h2>
          <motion.h2
            layout="position"
            transition={{ duration: 0.25 }}
            className="text-xl text-muted-foreground -ml-1"
          >
            {format(month, 'yyyy')}
          </motion.h2>
        </AnimatePresence>
      </div>
      <p className="font-medium">$2,097.10</p>
    </header>
  );
};
