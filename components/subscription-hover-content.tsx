import Image from 'next/image';
import { format } from 'date-fns';

import { Subscription } from '@/types/subscription';

interface SubscriptionHoverContentProps {
  subscription: Subscription;
  date: Date;
}

export const SubscriptionHoverContent = ({
  subscription,
  date,
}: SubscriptionHoverContentProps) => {
  const getIntervalText = () => {
    if (subscription.interval === 'monthly') {
      return `Billed monthly every ${format(date, 'do')}`;
    }

    if (subscription.interval === 'quarterly') {
      return `Billed quarterly on ${format(date, 'do')}`;
    }

    if (subscription.interval === 'yearly') {
      return `Billed yearly on ${format(date, 'dd MMM')}`;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Image
            src={subscription.image as string}
            width={40}
            height={40}
            alt={subscription.name}
            className="size-4"
          />
          <p className="font-medium">{subscription.name}</p>
        </div>
        <p className="font-medium">${subscription.price}</p>
      </div>
      <p className="text-muted-foreground text-xs">{getIntervalText()}</p>
    </div>
  );
};
