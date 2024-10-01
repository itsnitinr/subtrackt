'use client';

import { useState, useMemo } from 'react';
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
import { AddSubscription } from '@/components/modals/add-subscription';
import Image from 'next/image';

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
    ['m', () => setMonthToShow(new Date())],
  ]);

  return (
    <div className="h-full flex flex-col justify-center gap-6">
      <div className="flex items-end gap-1.5">
        <Image
          src="/logo.svg"
          alt="Subtrackt"
          width={100}
          height={100}
          className="mb-2 pointer-events-none"
        />
        <span className="bg-muted text-muted-foreground text-[8px] uppercase px-1 py-0.5 rounded mb-1.5">
          Beta
        </span>
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
      <div className="mb-6" />
    </div>
  );
};

export default Home;
