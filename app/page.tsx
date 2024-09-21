import { DayPill } from '@/components/day-pill';
import { MonthSwitcher } from '@/components/month-switcher';

const Home = () => {
  return (
    <div className="h-full flex flex-col justify-center gap-6">
      <MonthSwitcher />
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <DayPill key={day}>{day}</DayPill>
        ))}
      </div>
    </div>
  );
};

export default Home;
