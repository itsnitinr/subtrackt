import { format, isToday } from 'date-fns';

import { cn } from '@/lib/utils';

interface DatePillProps {
  date: Date;
  isCurrentMonth: boolean;
}

export const DatePill = ({ date, isCurrentMonth }: DatePillProps) => {
  return (
    <div
      className={cn(
        'text-center rounded-xl h-16 relative text-sm',
        isCurrentMonth
          ? 'bg-secondary/60'
          : 'bg-transparent text-muted-foreground',
        isToday(date) && 'border border-foreground/10'
      )}
    >
      <p className="absolute bottom-1 w-full">{format(date, 'd')}</p>
    </div>
  );
};
