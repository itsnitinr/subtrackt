import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const MonthSwitcher = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Button variant="ghost" size="icon">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <h2 className="text-xl font-medium">
          September{' '}
          <span className="text-muted-foreground font-normal">2024</span>
        </h2>
      </div>
      <p className="font-medium">$2,097.10</p>
    </header>
  );
};
