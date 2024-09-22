'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';

import { commonServices, Service } from '@/data/subscriptions';
import { ScrollArea } from './ui/scroll-area';

interface PrefillServiceProps {
  onSelect: (service: Service) => void;
}

export const PrefillService = ({ onSelect }: PrefillServiceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full"
        >
          Select a service to prefill name and logo
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search for a service" />
          <CommandList className="w-full">
            <CommandEmpty>No service found</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-40">
                {commonServices.map((service) => (
                  <CommandItem
                    key={service.name}
                    value={service.name}
                    onSelect={() => {
                      onSelect(service);
                      setIsOpen(false);
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={20}
                      height={20}
                      className="mr-2 size-5"
                    />
                    {service.name}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
