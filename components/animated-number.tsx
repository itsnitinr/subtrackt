import MotionNumber from 'motion-number';

export const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <MotionNumber
      value={value}
      format={{
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      }}
    />
  );
};
