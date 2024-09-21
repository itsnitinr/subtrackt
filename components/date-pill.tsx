import Image from 'next/image';
import { format, isToday } from 'date-fns';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { SubscriptionHoverContent } from '@/components/subscription-hover-content';

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
    // If icon, return the icon
    if (typeof subscription.image === 'function') {
      return <subscription.image className="size-5 -translate-y-3" />;
    }

    // If string, return image tag
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
      <HoverCard openDelay={50} closeDelay={0}>
        <HoverCardTrigger>
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
        </HoverCardTrigger>
        <HoverCardContent className="w-fit bg-background/80 border-foreground/10 backdrop-blur-sm p-3">
          <SubscriptionHoverContent
            subscription={subscriptions[0]}
            date={date}
          />
        </HoverCardContent>
      </HoverCard>
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
