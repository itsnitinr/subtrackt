'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SubscriptionForm } from '@/components/forms/SubscriptionForm';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

import { subscriptionSchema } from '@/schema/subscription';

import { useSubscriptions } from '@/hooks/use-subscriptions';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect } from 'react';

interface AddSubscriptionOnDateProps {
  open: boolean;
  onClose: () => void;
  dateToAddTo: Date;
}

export const AddSubscriptionOnDate = ({
  open,
  onClose,
  dateToAddTo,
}: AddSubscriptionOnDateProps) => {
  const { addSubscription } = useSubscriptions();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: '',
      image: '',
      price: 0,
      interval: 'monthly',
      isOngoing: true,
      startDate: dateToAddTo,
      endDate: null,
    },
  });

  useEffect(() => {
    form.setValue('startDate', dateToAddTo);
  }, [dateToAddTo, form]);

  function onSubmit(values: z.infer<typeof subscriptionSchema>) {
    addSubscription({
      id: crypto.randomUUID(),
      name: values.name,
      image: values.image || '/placeholder-logo.svg',
      price: values.price,
      interval: values.interval,
      startDate: values.startDate,
      endDate: values.isOngoing ? null : values.endDate,
    });
    form.reset();
    onClose();
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add subscription</DialogTitle>
            <DialogDescription>
              Fill in your subscription details to start tracking them.
            </DialogDescription>
          </DialogHeader>
          <SubscriptionForm form={form} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add subscription</DrawerTitle>
          <DrawerDescription>
            Fill in your subscription details to start tracking them.
          </DrawerDescription>
        </DrawerHeader>
        <SubscriptionForm form={form} onSubmit={onSubmit} isDrawer />
      </DrawerContent>
    </Drawer>
  );
};
