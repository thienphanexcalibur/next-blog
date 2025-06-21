"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = "",
  title,
  subtitle,
  description
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 space-y-12 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
    >
      {(title || subtitle || description) && (
        <div className="text-center max-w-4xl mx-auto">
          {subtitle && (
            <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}; 