'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { subscriptionSchema } from '@/schema/subscription';
import { useSubscriptions } from '@/hooks/use-subscriptions';
import { Subscription } from '@/types/subscription';
import { SubscriptionForm } from '../forms/SubscriptionForm';

interface EditSubscriptionProps {
  subscriptionToEdit: Subscription;
  setSubscriptionToEdit: (subscription: Subscription | null) => void;
  open: boolean;
}

export const EditSubscription = ({
  subscriptionToEdit,
  open,
  setSubscriptionToEdit,
}: EditSubscriptionProps) => {
  const { updateSubscription } = useSubscriptions();

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: subscriptionToEdit.name,
      image: subscriptionToEdit.image,
      price: subscriptionToEdit.price,
      interval: subscriptionToEdit.interval,
      isOngoing: !subscriptionToEdit.endDate,
      startDate: new Date(subscriptionToEdit.startDate),
      endDate: subscriptionToEdit.endDate
        ? new Date(subscriptionToEdit.endDate)
        : null,
    },
  });

  function onSubmit(values: z.infer<typeof subscriptionSchema>) {
    updateSubscription(subscriptionToEdit.id, {
      ...subscriptionToEdit,
      name: values.name,
      image: values.image || '/placeholder-logo.svg',
      price: values.price,
      interval: values.interval,
      startDate: values.startDate,
      endDate: values.isOngoing ? null : values.endDate,
    });
    setSubscriptionToEdit(null);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSubscriptionToEdit(null);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit subscription</DialogTitle>
          <DialogDescription>
            Update your subscription details.
          </DialogDescription>
        </DialogHeader>
        <SubscriptionForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
