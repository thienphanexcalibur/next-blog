"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Menu, 
  X, 
  BarChart3, 
  Target, 
  Settings, 
  Sparkles, 
  Heart,
  Moon,
  Utensils,
  Activity
} from "lucide-react";

// Import our reusable components
import { Section } from "@/components/powerlifting/Section";
import { VolumeCard } from "@/components/powerlifting/VolumeCard";
import { PeriodizationTimeline } from "@/components/powerlifting/PeriodizationTimeline";
import { AICoachForm } from "@/components/powerlifting/AICoachForm";
import { ProgramDisplay } from "@/components/powerlifting/ProgramDisplay";
import { RecoveryAdvisor } from "@/components/powerlifting/RecoveryAdvisor";
import { cn } from "@/lib/utils";

Chart.register(...registerables);

// Navigation Component
const Navigation = ({ activeSection }: { activeSection: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#principles", text: "Principles", icon: BarChart3 },
    { href: "#periodization", text: "Periodization", icon: Target },
    { href: "#your-volume", text: "Your Volume", icon: Settings },
    { href: "#ai-coach", text: "AI Coach", icon: Sparkles },
    { href: "#recovery", text: "Recovery", icon: Heart },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold text-xl">
              The Volume <span className="text-primary">Dial</span>
            </span>
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center space-x-2 transition-colors hover:text-foreground/80",
                    activeSection === link.href.substring(1)
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.text}</span>
                </a>
              );
            })}
          </nav>
          
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 text-sm font-medium transition-colors hover:text-foreground/80 py-2 px-3 rounded-md",
                    activeSection === link.href.substring(1)
                      ? "text-foreground bg-accent"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.text}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => (
  <section className="py-24 text-center">
    <div className="container">
      <Badge variant="outline" className="mb-4">
        Science-Based Training
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Master Your Strength Potential
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        Move beyond &ldquo;just lift heavy.&rdquo; This guide translates the science of
        training volume into a practical, interactive framework to help you build
        a smarter, stronger program.
      </p>
      <Button size="lg" asChild>
        <a href="#principles">Start Exploring</a>
      </Button>
    </div>
  </section>
);

// Principles Chart Component
const PrinciplesChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();
  const { theme } = useTheme();

  useEffect(() => {
    if (chartRef.current && Chart) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const textColor = theme === "dark" ? "rgba(229, 231, 235, 0.8)" : "rgba(55, 65, 81, 1)";
      const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Low Volume", "Moderate Volume", "High Volume"],
            datasets: [
              {
                label: "Muscle Growth (Hypertrophy)",
                data: [50, 85, 100],
                backgroundColor: "hsl(var(--primary))",
                borderColor: "hsl(var(--primary))",
                borderWidth: 1,
              },
              {
                label: "Maximal Strength (1RM)",
                data: [60, 75, 80],
                backgroundColor: "hsl(var(--secondary))",
                borderColor: "hsl(var(--secondary))",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: textColor, callback: (value) => value + "%" },
                grid: { color: gridColor },
                title: {
                  display: true,
                  text: "Relative Gains (%)",
                  color: textColor,
                },
              },
              x: {
                ticks: { color: textColor },
                grid: { display: false },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Volume Dose-Response: Hypertrophy vs. Strength",
                font: { size: 16 },
                color: textColor,
              },
              legend: { labels: { color: textColor } },
              tooltip: {
                titleColor: "#fff",
                bodyColor: "#fff",
                callbacks: {
                  afterLabel: (context) => {
                    const label = context.dataset.label;
                    if (label?.includes("Hypertrophy")) {
                      return context.dataIndex === 2
                        ? "Finding: 12-20 sets/week is optimal."
                        : "Finding: More sets lead to more growth.";
                    } else {
                      return context.dataIndex === 2
                        ? "Finding: Pronounced diminishing returns."
                        : "Finding: Gains quickly level off.";
                    }
                  },
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [theme]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>The Powerlifter&apos;s Paradox: Volume&apos;s Dual Effect</CardTitle>
        <CardDescription>
          Volume has a different effect on muscle size versus maximal strength.
          This chart visualizes the concept: strength gains level off much
          faster than muscle gains as volume increases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 md:h-96">
          <canvas ref={chartRef}></canvas>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Hover over the bars for key insights.
        </p>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function PowerliftingPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [generatedProgram, setGeneratedProgram] = useState(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Periodization data
  const periodizationBlocks = [
    {
      id: "accumulation",
      phase: "Phase 1",
      title: "Accumulation",
      subtitle: "Build the Engine",
      description: "This is your high-volume, muscle-building phase. It lays the foundation for future strength.",
      details: [
        "Primary Goal: Muscle Hypertrophy & Work Capacity",
        "Volume: HIGH (e.g., 15-25 sets/week)",
        "Intensity: Low-Moderate (60-80% 1RM)",
        "Duration: 2-6 weeks",
      ],
      color: "primary" as const,
    },
    {
      id: "transmutation",
      phase: "Phase 2", 
      title: "Transmutation",
      subtitle: "Tune the Engine",
      description: "Convert new muscle into usable strength with higher intensity and lower volume.",
      details: [
        "Primary Goal: Maximal Strength",
        "Volume: Moderate (e.g., 10-18 sets/week)",
        "Intensity: HIGH (80-90%+ 1RM)",
        "Duration: 4-6 weeks",
      ],
      color: "secondary" as const,
    },
    {
      id: "realization",
      phase: "Phase 3",
      title: "Realization", 
      subtitle: "Test the Engine",
      description: "Peak your strength and shed fatigue to prepare for a meet or testing your 1RM.",
      details: [
        "Primary Goal: Peaking & Fatigue Dissipation",
        "Volume: LOW (e.g., 5-10 sets/week)",
        "Intensity: Very High (90-100%+ 1RM)",
        "Duration: 2-3 weeks",
      ],
      color: "destructive" as const,
    },
  ];

  // Volume landmarks data
  const volumeLandmarks = [
    {
      name: "MV",
      title: "Maintenance Volume",
      description: "The minimum to keep gains (~6 sets/week).",
      variant: "outline" as const,
    },
    {
      name: "MEV",
      title: "Minimum Effective Volume",
      description: "The minimum to make new gains (~10-12 sets/week to start a block).",
      variant: "secondary" as const,
    },
    {
      name: "MAV",
      title: "Maximum Adaptive Volume",
      description: 'Your "sweet spot" range for the best progress.',
      variant: "default" as const,
    },
    {
      name: "MRV",
      title: "Maximum Recoverable Volume",
      description: "The absolute ceiling you can recover from.",
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} />
      
      <main>
        <HeroSection />
        
        <Section
          id="principles"
          subtitle="The Foundation"
          title="The Core Principles of Volume"
          description="This section breaks down the relationship between the work you do (volume) and the results you get (strength and size)."
        >
          <div className="container space-y-8">
            <PrinciplesChart />
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    What Are We Counting?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The most effective method for programming is counting{" "}
                    <span className="font-semibold text-primary">
                      weekly hard sets
                    </span>{" "}
                    per muscle group, where a hard set is taken close to muscular
                    failure (0-4 Reps in Reserve).
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Volume vs. Intensity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">Intensity</Badge>
                    <p className="text-sm text-muted-foreground">
                      (%1RM) determines the{" "}
                      <span className="font-semibold text-primary">TYPE</span>{" "}
                      of adaptation.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">Volume</Badge>
                    <p className="text-sm text-muted-foreground">
                      (Hard Sets) determines the{" "}
                      <span className="font-semibold text-primary">MAGNITUDE</span>{" "}
                      of that adaptation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Section
          id="periodization"
          subtitle="The Roadmap"
          title="Building Your Long-Term Plan"
          description="Periodization sequences training phases to build on each other, culminating in peak strength. This interactive timeline shows how it works."
        >
          <div className="container">
            <PeriodizationTimeline blocks={periodizationBlocks} />
          </div>
        </Section>

        <Section
          id="your-volume"
          subtitle="Individualization"
          title="Finding Your Optimal Volume"
          description="&ldquo;Optimal volume&rdquo; isn&apos;t one number—it&apos;s a personal range. This section gives you the tools to find your sweet spot."
        >
          <div className="container space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Your Volume Landmarks</CardTitle>
                <CardDescription className="text-center max-w-2xl mx-auto">
                  Use these concepts, measured in weekly hard sets, as a GPS for your
                  training. Start at MEV, progress towards MRV, then deload.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {volumeLandmarks.map((landmark) => (
                    <VolumeCard
                      key={landmark.name}
                      name={landmark.name}
                      title={landmark.title}
                      description={landmark.description}
                      variant={landmark.variant}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Your Daily Compass: Autoregulation</CardTitle>
                <CardDescription className="text-center max-w-2xl mx-auto">
                  Your ability to perform changes daily. Autoregulation (using RPE/RIR)
                  lets you adjust your training to match your readiness.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>EASY</span>
                    <span>MAX EFFORT</span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        RPE 7
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">3 Reps Left</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        RPE 8
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">2 Reps Left</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        RPE 9
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">1 Rep Left</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section
          id="ai-coach"
          subtitle="Your AI Coach"
          title="Personalized Program Builder"
          description="Tell the AI your goals, and it will generate a customized 4-week training block."
        >
          <div className="container space-y-8">
            <AICoachForm onProgramGenerated={setGeneratedProgram} />
            {generatedProgram && <ProgramDisplay program={generatedProgram} />}
          </div>
        </Section>

        <Section
          id="recovery"
          subtitle="The Support System"
          title="Your Recovery Toolkit"
          description="High-volume training is demanding. Prioritizing recovery isn&apos;t optional—it&apos;s what allows you to adapt and get stronger."
        >
          <div className="container space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-blue-500" />
                    Sleep
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The non-negotiable foundation. Aim for 7-9+ hours/night.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-green-500" />
                    Nutrition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provides the fuel for performance and the raw materials for repair.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    Active Recovery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Low-intensity activity on rest days increases blood flow.
                  </p>
                </CardContent>
              </Card>
            </div>

            <RecoveryAdvisor />
          </div>
        </Section>
      </main>

      <footer className="border-t py-12">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <span className="font-bold text-lg">The Volume Dial</span>
          </div>
          <p className="text-muted-foreground">
            An interactive guide to build a smarter, stronger you.
          </p>
        </div>
      </footer>
    </div>
  );
} 