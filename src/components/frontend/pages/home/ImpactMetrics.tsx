"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Individuals Empowered", value: 2500, suffix: "+" },
  { label: "Leaders Mentored", value: 350, suffix: "+" },
  { label: "Institutions Structured", value: 40, suffix: "+" },
  { label: "Communities Reached", value: 120, suffix: "+" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const ImpactMetrics = () => (
  <section className="py-24 bg-background">
    <div className="container-narrow">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Counter target={m.value} suffix={m.suffix} />
            <p className="mt-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactMetrics;
