import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VolumeCardProps {
  name: string;
  title: string;
  description: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

const variantStyles = {
  default: "border-primary/20 bg-primary/5",
  secondary: "border-secondary/20 bg-secondary/5", 
  destructive: "border-destructive/20 bg-destructive/5",
  outline: "border-muted/20 bg-muted/5"
};

export const VolumeCard: React.FC<VolumeCardProps> = ({
  name,
  title,
  description,
  variant = "default",
  className
}) => {
  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant={variant} className="text-sm font-bold">
            {name}
          </Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}; 