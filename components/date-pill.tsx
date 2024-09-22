import Image from 'next/image';
import { format, isToday } from 'date-fns';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

import { SubscriptionTooltipContent } from '@/components/subscription-tooltip-content';

import { cn } from '@/lib/utils';
import { Subscription } from '@/types/subscription';

interface DatePillProps {
  date: Date;
  isCurrentMonth: boolean;
  subscriptions: Subscription[];
}

export const DatePill = ({
  date,
  isCurrentMonth,
  subscriptions,
}: DatePillProps) => {
  const renderSubscriptionImage = (subscription: Subscription) => {
    return (
      <Image
        src={subscription.image}
        width={40}
        height={40}
        alt={subscription.name}
        className="-translate-y-2.5 size-6"
      />
    );
  };

  if (subscriptions.length) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn(
                'text-center rounded-xl h-16 relative text-sm',
                'flex items-center justify-center',
                'cursor-pointer',
                isCurrentMonth
                  ? 'bg-secondary/60'
                  : 'bg-transparent text-muted-foreground',
                isToday(date) && 'border border-foreground/10'
              )}
            >
              {isCurrentMonth &&
                subscriptions.length === 1 &&
                renderSubscriptionImage(subscriptions[0])}
              {isCurrentMonth && subscriptions.length > 1 && (
                <p>{subscriptions.length} subscriptions</p>
              )}
              <p className="absolute bottom-1 w-full">{format(date, 'd')}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="w-fit rounded-xl bg-secondary border-foreground/10 p-0"
          >
            <SubscriptionTooltipContent subscription={subscriptions[0]} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div
      className={cn(
        'text-center rounded-xl h-16 relative text-sm',
        'flex items-center justify-center',
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
