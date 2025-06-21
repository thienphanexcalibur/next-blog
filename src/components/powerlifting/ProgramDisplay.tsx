import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgramData {
  [week: string]: Array<{
    day: string;
    focus: string;
    workout: Array<{
      exercise: string;
      sets: string | number;
      reps: string | number;
      rpe: string | number;
    }>;
  }>;
}

interface ProgramDisplayProps {
  program: ProgramData;
}

export const ProgramDisplay: React.FC<ProgramDisplayProps> = ({ program }) => {
  const weeks = Object.keys(program).sort();

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue={weeks[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {weeks.map((week) => (
            <TabsTrigger key={week} value={week} className="capitalize">
              {week.replace('week', 'Week ')}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {weeks.map((week) => (
          <TabsContent key={week} value={week} className="space-y-6 mt-6">
            <div className="text-center">
              <Badge variant="outline" className="text-sm">
                {week.charAt(0).toUpperCase() + week.slice(1)}
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {Array.isArray(program[week]) && program[week].map((day: any, dayIndex: number) => (
                <Card key={`${week}-${day.day}-${dayIndex}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{day.day}</span>
                      <Badge variant="secondary">{day.focus}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3 font-semibold text-sm">Exercise</th>
                            <th className="text-left py-2 px-3 font-semibold text-sm">Sets</th>
                            <th className="text-left py-2 px-3 font-semibold text-sm">Reps</th>
                            <th className="text-left py-2 px-3 font-semibold text-sm">RPE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(day.workout) && day.workout.map((exercise: any, exerciseIndex: number) => (
                            <tr key={`${week}-${day.day}-${exercise.exercise}-${exerciseIndex}`} className="border-b border-muted/30">
                              <td className="py-3 px-3 text-sm font-medium">{exercise.exercise}</td>
                              <td className="py-3 px-3 text-sm text-muted-foreground">{exercise.sets}</td>
                              <td className="py-3 px-3 text-sm text-muted-foreground">{exercise.reps}</td>
                              <td className="py-3 px-3 text-sm">
                                <Badge variant="outline" className="text-xs">
                                  RPE {exercise.rpe}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}; 