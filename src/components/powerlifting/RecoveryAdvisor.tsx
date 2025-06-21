"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, Moon, Zap, Activity } from "lucide-react";
import { Loader } from "./Loader";

interface RatingsState {
  sleep: number;
  stress: number;
  soreness: number;
}

export const RecoveryAdvisor: React.FC = () => {
  const [ratings, setRatings] = useState<RatingsState>({ sleep: 3, stress: 3, soreness: 3 });
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (field: keyof RatingsState, value: number) => {
    setRatings(prev => ({ ...prev, [field]: value }));
  };

  const getAdvice = async () => {
    setIsLoading(true);
    setError(null);
    setAdvice("");
    
    const prompt = `Act as a compassionate but firm strength and conditioning coach. My recovery metrics for today are:
- Sleep Quality: ${ratings.sleep} out of 5 (1=poor, 5=excellent)
- General Life Stress: ${ratings.stress} out of 5 (1=low, 5=high)
- Muscle Soreness: ${ratings.soreness} out of 5 (1=none, 5=high)
Based on these metrics, provide 2-3 brief, actionable pieces of advice for my training and recovery today. Keep the tone encouraging.`;

    try {
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
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
        setAdvice(result.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Invalid response from API.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (value: number, isStress = false) => {
    if (isStress) {
      return value <= 2 ? "text-green-600" : value <= 3 ? "text-yellow-600" : "text-red-600";
    }
    return value >= 4 ? "text-green-600" : value >= 3 ? "text-yellow-600" : "text-red-600";
  };

  const getRatingLabel = (field: keyof RatingsState, value: number) => {
    if (field === 'sleep') {
      return value >= 4 ? 'Excellent' : value >= 3 ? 'Good' : value >= 2 ? 'Fair' : 'Poor';
    }
    if (field === 'stress') {
      return value >= 4 ? 'Very High' : value >= 3 ? 'Moderate' : value >= 2 ? 'Low' : 'Very Low';
    }
    return value >= 4 ? 'Very Sore' : value >= 3 ? 'Moderate' : value >= 2 ? 'Mild' : 'None';
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <Badge variant="secondary">AI Recovery Coach</Badge>
        </div>
        <CardTitle className="text-2xl">Recovery Advisor</CardTitle>
        <CardDescription>
          Check in with your AI coach for actionable advice to optimize your recovery.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Moon className="h-5 w-5 text-blue-500" />
              <label className="text-sm font-medium">Sleep Quality</label>
            </div>
            <div className="space-y-2">
              <Input
                type="range"
                min="1"
                max="5"
                value={ratings.sleep}
                onChange={(e) => handleRatingChange('sleep', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
              <div className={`font-bold text-lg ${getRatingColor(ratings.sleep)}`}>
                {ratings.sleep} - {getRatingLabel('sleep', ratings.sleep)}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <label className="text-sm font-medium">Stress Level</label>
            </div>
            <div className="space-y-2">
              <Input
                type="range"
                min="1"
                max="5"
                value={ratings.stress}
                onChange={(e) => handleRatingChange('stress', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
              <div className={`font-bold text-lg ${getRatingColor(ratings.stress, true)}`}>
                {ratings.stress} - {getRatingLabel('stress', ratings.stress)}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Activity className="h-5 w-5 text-red-500" />
              <label className="text-sm font-medium">Muscle Soreness</label>
            </div>
            <div className="space-y-2">
              <Input
                type="range"
                min="1"
                max="5"
                value={ratings.soreness}
                onChange={(e) => handleRatingChange('soreness', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>None</span>
                <span>Very Sore</span>
              </div>
              <div className={`font-bold text-lg ${getRatingColor(ratings.soreness, true)}`}>
                {ratings.soreness} - {getRatingLabel('soreness', ratings.soreness)}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={getAdvice}
            disabled={isLoading}
            size="lg"
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Get Recovery Advice
          </Button>
        </div>

        {isLoading && <Loader message="Analyzing your recovery metrics..." />}
        
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">
                Sorry, the AI Advisor couldn&apos;t generate advice: {error}
              </p>
            </CardContent>
          </Card>
        )}

        {advice && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {advice}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}; 