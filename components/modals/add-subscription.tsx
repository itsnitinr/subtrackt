'use client';

import { useState } from 'react';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, CalendarPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHotkeys } from '@mantine/hooks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import { subscriptionSchema } from '@/schema/subscription';
import { cn } from '@/lib/utils';
import { useSubscriptions } from '@/hooks/use-subscriptions';
import { PrefillService } from '@/components/prefill-service';

export const AddSubscription = () => {
  const { addSubscription } = useSubscriptions();

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: '',
      image: '',
      price: 0,
      interval: 'monthly',
      isOngoing: false,
      startDate: new Date(),
      endDate: null,
    },
  });

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
    setOpen(false);
  }

  const [open, setOpen] = useState(false);

  useHotkeys([['mod+a', () => setOpen(true)]]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <CalendarPlus className="size-4 mr-2" />
          Add subscription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add subscription</DialogTitle>
          <DialogDescription>
            Fill in your subscription details to start tracking them.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4">
            <ScrollArea className="max-h-96 overflow-y-auto">
              <div className="p-1">
                <PrefillService
                  onSelect={(service) => {
                    form.setValue('name', service.name);
                    form.setValue('image', service.image);
                  }}
                />
                <Separator className="my-4" />
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Netflix" {...field} autoFocus />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Logo URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <div className="h-10 flex items-center justify-center aspect-square border rounded-md">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={field.value || '/placeholder-logo.svg'}
                                alt="Service Logo"
                                width={20}
                                height={20}
                                className="size-6 object-contain"
                              />
                            </div>
                            <Input
                              placeholder="https://www.netflix.com/logo.png"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Square images / SVGs work best. Leave blank for a
                          placeholder logo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            step={0.01}
                            type="number"
                            min={0}
                            onChange={(e) => {
                              field.onChange(e.target.valueAsNumber);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interval</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an interval" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Support for other intervals coming soon.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2">
                        <FormLabel>Subscription start date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isOngoing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Ongoing subscription</FormLabel>
                          <FormDescription>
                            Check this if you want to track an ongoing
                            subscription without an end date.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2">
                        <FormLabel
                          className={cn(
                            form.getValues('isOngoing') &&
                              'text-muted-foreground'
                          )}
                        >
                          Subscription end date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                                disabled={form.getValues('isOngoing')}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ?? new Date()}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add subscription</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
