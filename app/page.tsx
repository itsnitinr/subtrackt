'use client';

import { useState, useMemo,  } from 'react';
import {
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { useHotkeys } from '@mantine/hooks';

import { DayPill } from '@/components/day-pill';
import { MonthSwitcher } from '@/components/month-switcher';
import { Calendar } from '@/components/calendar';
import { Badge } from '@/components/ui/badge';
import { AddSubscription } from '@/components/modals/add-subscription';

const Home = () => {
  const [monthToShow, setMonthToShow] = useState(new Date());
  const [direction, setDirection] = useState<0 | -1 | 1>(0);

  const goToPreviousMonth = () => {
    setDirection(-1);
    setMonthToShow((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setDirection(1);
    setMonthToShow((prev) => addMonths(prev, 1));
  };

  const dates = useMemo(() => {
    const start = startOfWeek(startOfMonth(monthToShow));
    const end = endOfWeek(endOfMonth(monthToShow));
    return eachDayOfInterval({ start, end });
  }, [monthToShow]);

  useHotkeys([
    ['ArrowLeft', goToPreviousMonth],
    ['ArrowRight', goToNextMonth],
  ]);

  return (
    <div className="h-full flex flex-col justify-center gap-6">
      <div className="flex flex-col gap-4 items-center mb-4">
        <Badge className="w-fit" variant="secondary">
          In Development
        </Badge>
        <p className="text-center text-sm text-muted-foreground">
          What you&apos;re looking right now is using dummy data. The ability to
          add your own subscriptions and track them is coming soon, in a few
          hours. Keep an eye out on my Twitter profile{' '}
          <a
            className="underline"
            href="https://twitter.com/iamnitinr"
            target="_blank"
          >
            here
          </a>{' '}
          or check back in a while.
        </p>
      </div>
      <MonthSwitcher
        month={monthToShow}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
        direction={direction}
      />
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-2 ">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <DayPill key={day}>{day}</DayPill>
          ))}
        </div>
        <Calendar
          dates={dates}
          monthToShow={monthToShow}
          direction={direction}
        />
      </section>
      <AddSubscription />
    </div>
  );
};

export default Home;
