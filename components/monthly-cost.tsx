import Image from 'next/image';
import { format } from 'date-fns';
import MotionNumber from 'motion-number';

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Subscription } from '@/types/subscription';

interface MonthlyCostProps {
  value: number;
  subscriptions: Subscription[];
  month: Date;
}

export const MonthlyCost = ({
  value,
  subscriptions,
  month,
}: MonthlyCostProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <MotionNumber
            value={value}
            format={{
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'narrowSymbol',
            }}
          />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="w-fit rounded-xl bg-background border-foreground/10 p-0"
        >
          <h2 className="border-b border-foreground/10 py-3 px-3 font-medium">
            Total cost this month
          </h2>
          <ScrollArea className="max-h-60 overflow-y-auto">
            <div className="flex flex-col gap-3 px-3 py-3">
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between gap-12"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Image
                          src={subscription.image as string}
                          width={40}
                          height={40}
                          alt={subscription.name}
                          className="size-4"
                        />
                        <p>{subscription.name}</p>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {format(subscription.startDate, 'do')}{' '}
                        {format(month, 'MMMM')}
                      </p>
                    </div>
                    <div className="flex flex-col text-right">
                      <p className="font-medium text-emerald-700 dark:text-emerald-500">
                        ${subscription.price}
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        {((subscription.price / value) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No subscriptions this month
                </p>
              )}
            </div>
          </ScrollArea>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
