import Image from 'next/image';
import { format, isPast } from 'date-fns';
import {
  CalendarIcon,
  RepeatIcon,
  CircleDashedIcon,
  WalletIcon,
  CalendarOffIcon,
} from 'lucide-react';

import { Subscription } from '@/types/subscription';

interface SubscriptionTooltipContentProps {
  subscription: Subscription;
}

export const SubscriptionTooltipContent = ({
  subscription,
}: SubscriptionTooltipContentProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-foreground/10 py-3 px-3">
        <Image
          src={subscription.image as string}
          width={40}
          height={40}
          alt={subscription.name}
          className="size-4"
        />
        <p className="font-medium">{subscription.name}</p>
      </div>
      <div className="flex flex-col gap-1 px-3 pb-3 text-xs border-b border-foreground/10">
        {!subscription.endDate && (
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-1 text-muted-foreground">
              <CircleDashedIcon className="size-3" />
              <p>Status</p>
            </div>
            <p className="font-medium">active</p>
          </div>
        )}
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-1 text-muted-foreground">
            <RepeatIcon className="size-3" />
            <p>Billing cycle</p>
          </div>
          <p className="font-medium">{subscription.interval}</p>
        </div>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarIcon className="size-3" />
            <p>Started on</p>
          </div>
          <p className="font-medium">
            {format(subscription.startDate, 'dd MMM yyyy')}
          </p>
        </div>
        {subscription.endDate && (
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarOffIcon className="size-3" />
              <p>{isPast(subscription.endDate) ? 'Ended' : 'Ends'} on</p>
            </div>
            <p className="font-medium">
              {format(subscription.endDate, 'dd MMM yyyy')}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-8 px-3 pb-3 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <WalletIcon className="size-3" />
          <p>Cost</p>
        </div>
        <p className="font-medium text-emerald-700 dark:text-emerald-500">
          ${subscription.price}
        </p>
      </div>
    </div>
  );
};
