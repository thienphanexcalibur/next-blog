import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  className,
  message = "Your AI Coach is working..."
}) => (
  <div className={cn("flex justify-center items-center py-8", className)}>
    <div className="border-4 border-muted border-t-4 border-t-primary rounded-full w-10 h-10 animate-spin" />
    <p className="ml-4 text-muted-foreground">
      {message}
    </p>
  </div>
); 