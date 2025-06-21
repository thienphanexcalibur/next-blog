"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Loader } from "./Loader";

interface InputsState {
  experience: string;
  goal: string;
  days: string;
}

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

interface AICoachFormProps {
  onProgramGenerated?: (program: ProgramData) => void;
}

export const AICoachForm: React.FC<AICoachFormProps> = ({ onProgramGenerated }) => {
  const [inputs, setInputs] = useState<InputsState>({
    experience: "Intermediate",
    goal: "Hypertrophy (Build Muscle)",
    days: "4",
  });
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof InputsState, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const generateProgram = async () => {
    setIsLoading(true);
    setError(null);
    setProgram(null);
    
    const prompt = `Act as an expert powerlifting and hypertrophy coach. Based on the principles of block periodization, create a detailed 4-week training program for an athlete with the following characteristics:
- Experience Level: ${inputs.experience}
- Primary Goal: ${inputs.goal}
- Training Days per Week: ${inputs.days}
The program should start with an accumulation phase (weeks 1-2) and move into a transmutation phase (weeks 3-4).
Provide the output as a JSON object. The root object should have keys "week1", "week2", "week3", "week4". Each week should be an array of objects, where each object represents a training day with "day", "focus", and "workout" properties. The "workout" property should be an array of objects, each with "exercise", "sets", "reps", and "rpe" properties. Make sure the exercise selection is appropriate.`;

    try {
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      
      const result = await response.json();
      if (result.candidates && result.candidates[0].content.parts[0].text) {
        const generatedProgram = JSON.parse(result.candidates[0].content.parts[0].text);
        setProgram(generatedProgram);
        onProgramGenerated?.(generatedProgram);
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error generating program:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <Badge variant="secondary">AI Powered</Badge>
        </div>
        <CardTitle className="text-2xl">Personalized Program Builder</CardTitle>
        <CardDescription>
          Tell the AI your goals, and it will generate a customized 4-week training block.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <Select value={inputs.experience} onValueChange={(value) => handleInputChange('experience', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Goal</label>
            <Select value={inputs.goal} onValueChange={(value) => handleInputChange('goal', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hypertrophy (Build Muscle)">Hypertrophy (Build Muscle)</SelectItem>
                <SelectItem value="Strength (Get Stronger)">Strength (Get Stronger)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Training Days/Week</label>
            <Select value={inputs.days} onValueChange={(value) => handleInputChange('days', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Days</SelectItem>
                <SelectItem value="4">4 Days</SelectItem>
                <SelectItem value="5">5 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={generateProgram}
            disabled={isLoading}
            size="lg"
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate My Program
          </Button>
        </div>

        {isLoading && <Loader />}
        
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">
                Sorry, the AI Coach couldn&apos;t generate a program: {error}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}; 