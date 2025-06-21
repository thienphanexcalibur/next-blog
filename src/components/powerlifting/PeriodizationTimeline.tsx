import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PeriodizationBlock {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  color: "primary" | "secondary" | "destructive";
}

interface PeriodizationTimelineProps {
  blocks: PeriodizationBlock[];
}

export const PeriodizationTimeline: React.FC<PeriodizationTimelineProps> = ({ blocks }) => {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedBlock(expandedBlock === id ? null : id);
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {blocks.map((block, index) => (
        <Card key={block.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge 
                variant={block.color === "primary" ? "default" : block.color}
                className="text-xs"
              >
                Phase {index + 1}
              </Badge>
              <span className={cn(
                "text-4xl font-black",
                block.color === "primary" && "text-primary",
                block.color === "secondary" && "text-secondary",
                block.color === "destructive" && "text-destructive"
              )}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <CardTitle className="text-xl">{block.title}</CardTitle>
            <CardDescription className="font-medium text-primary">
              {block.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {block.description}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(block.id)}
              className="w-full justify-between p-0 h-auto font-medium text-primary hover:text-primary/80"
            >
              View Details
              {expandedBlock === block.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            {expandedBlock === block.id && (
              <div className="mt-4 pt-4">
                <Separator className="mb-4" />
                <div className="space-y-2">
                  {block.details.map((detail, detailIndex) => {
                    const [key, value] = detail.split(':');
                    return (
                      <div key={detailIndex} className="text-sm">
                        <span className="font-medium text-foreground">{key}:</span>
                        <span className="text-muted-foreground ml-1">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 