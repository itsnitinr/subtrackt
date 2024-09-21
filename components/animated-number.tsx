import { useEffect } from 'react';

import { motion, useSpring, useTransform } from 'framer-motion';

export const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
    duration: 0.5,
  });
  const display = useTransform(spring, (current) => current.toFixed(2));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};
