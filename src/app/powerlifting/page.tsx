"use client";

import { Chart, registerables } from "chart.js";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

Chart.register(...registerables);

// Helper Components
const Loader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="border-4 border-gray-200 dark:border-gray-700 border-t-4 border-t-amber-600 rounded-full w-10 h-10 animate-spin"></div>
    <p className="ml-4 text-gray-600 dark:text-gray-400">
      Your AI Coach is working...
    </p>
  </div>
);

const Section = ({ id, children, className = "" }) => {
  const sectionRef = useRef(null);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-16 md:py-24 space-y-12 transition-all duration-700 ease-out ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </section>
  );
};

// Main Section Components
const Header = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { href: "#principles", text: "Principles" },
    { href: "#periodization", text: "Periodization" },
    { href: "#your-volume", text: "Your Volume" },
    { href: "#ai-coach", text: "✨ AI Coach" },
    { href: "#recovery", text: "Recovery" },
  ];

  const NavLink = ({ href, text }) => (
    <a
      href={href}
      onClick={() => setIsMenuOpen(false)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 border-b-2 ${
        activeSection === href.substring(1)
          ? "text-amber-600 border-amber-600"
          : "text-gray-700 dark:text-gray-300 border-transparent hover:text-amber-600 dark:hover:text-amber-500"
      }`}
    >
      {text}
    </a>
  );

  const MobileNavLink = ({ href, text }) => (
    <a
      href={href}
      onClick={() => setIsMenuOpen(false)}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 border-l-4 ${
        activeSection === href.substring(1)
          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-500"
          : "text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {text}
    </a>
  );

  return (
    <header className="backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
          >
            The Volume <span className="text-amber-600">Dial</span>
          </a>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </div>
            </div>
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section id="hero" className="text-center py-16 md:py-24">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
      Master Your Strength Potential.
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
      Move beyond "just lift heavy." This guide translates the science of
      training volume into a practical, interactive framework to help you build
      a smarter, stronger program.
    </p>
    <a
      href="#principles"
      className="mt-8 inline-block bg-amber-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-700 transition-colors"
    >
      Start Exploring
    </a>
  </section>
);

const PrinciplesSection = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (chartRef.current && Chart) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const textColor =
        theme === "dark" ? "rgba(229, 231, 235, 0.8)" : "rgba(55, 65, 81, 1)";
      const gridColor =
        theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Low Volume", "Moderate Volume", "High Volume"],
          datasets: [
            {
              label: "Muscle Growth (Hypertrophy)",
              data: [50, 85, 100],
              backgroundColor: "rgba(217, 119, 6, 0.6)",
              borderColor: "rgba(217, 119, 6, 1)",
              borderWidth: 1,
            },
            {
              label: "Maximal Strength (1RM)",
              data: [60, 75, 80],
              backgroundColor: "rgba(107, 114, 128, 0.6)",
              borderColor: "rgba(107, 114, 128, 1)",
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
                afterLabel: (context) =>
                  context.dataset.label.includes("Hypertrophy")
                    ? context.dataIndex === 2
                      ? "Finding: 12-20 sets/week is optimal."
                      : "Finding: More sets lead to more growth."
                    : context.dataIndex === 2
                    ? "Finding: Pronounced diminishing returns."
                    : "Finding: Gains quickly level off.",
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [theme]);

  return (
    <Section id="principles">
      <div className="text-center">
        <h2 className="text-base font-semibold text-amber-600 tracking-wider uppercase">
          The Foundation
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
          The Core Principles of Volume
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          This section breaks down the relationship between the work you do
          (volume) and the results you get (strength and size).
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          The Powerlifter's Paradox: Volume's Dual Effect
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Volume has a different effect on muscle size versus maximal strength.
          This chart visualizes the concept: strength gains level off much
          faster than muscle gains as volume increases.
        </p>
        <div className="mt-6 relative w-full max-w-3xl mx-auto h-80 md:h-96">
          <canvas ref={chartRef}></canvas>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
          Hover over the bars for key insights.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            What Are We Counting?
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 flex-grow">
            The most effective method for programming is counting{" "}
            <span className="font-bold text-amber-600 dark:text-amber-500">
              weekly hard sets
            </span>{" "}
            per muscle group, where a hard set is taken close to muscular
            failure (0-4 Reps in Reserve).
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Volume vs. Intensity
          </h3>
          <ul className="mt-2 space-y-3 text-gray-700 dark:text-gray-400 flex-grow">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-2xl">🏋️</span>
              <p className="ml-3">
                <strong className="text-gray-900 dark:text-gray-100">
                  Intensity (%1RM)
                </strong>{" "}
                determines the{" "}
                <strong className="text-amber-600 dark:text-amber-500">
                  TYPE
                </strong>{" "}
                of adaptation.
              </p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-2xl">📈</span>
              <p className="ml-3">
                <strong className="text-gray-900 dark:text-gray-100">
                  Volume (Hard Sets)
                </strong>{" "}
                determines the{" "}
                <strong className="text-amber-600 dark:text-amber-500">
                  MAGNITUDE
                </strong>{" "}
                of that adaptation.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

const PeriodizationSection = () => {
  const [openDetails, setOpenDetails] = useState(null);

  const toggleDetails = (id) => {
    setOpenDetails(openDetails === id ? null : id);
  };

  const blocks = [
    {
      id: "details-1",
      num: "01",
      title: "Accumulation",
      subtitle: "Build the Engine",
      desc: "This is your high-volume, muscle-building phase. It lays the foundation for future strength.",
      details: [
        "Primary Goal: Muscle Hypertrophy & Work Capacity",
        "Volume: HIGH (e.g., 15-25 sets/week)",
        "Intensity: Low-Moderate (60-80% 1RM)",
        "Duration: 2-6 weeks",
      ],
    },
    {
      id: "details-2",
      num: "02",
      title: "Transmutation",
      subtitle: "Tune the Engine",
      desc: "Convert new muscle into usable strength with higher intensity and lower volume.",
      details: [
        "Primary Goal: Maximal Strength",
        "Volume: Moderate (e.g., 10-18 sets/week)",
        "Intensity: HIGH (80-90%+ 1RM)",
        "Duration: 4-6 weeks",
      ],
    },
    {
      id: "details-3",
      num: "03",
      title: "Realization",
      subtitle: "Test the Engine",
      desc: "Peak your strength and shed fatigue to prepare for a meet or testing your 1RM.",
      details: [
        "Primary Goal: Peaking & Fatigue Dissipation",
        "Volume: LOW (e.g., 5-10 sets/week)",
        "Intensity: Very High (90-100%+ 1RM)",
        "Duration: 2-3 weeks",
      ],
    },
  ];

  return (
    <Section id="periodization">
      <div className="text-center">
        <h2 className="text-base font-semibold text-amber-600 tracking-wider uppercase">
          The Roadmap
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
          Building Your Long-Term Plan
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Periodization sequences training phases to build on each other,
          culminating in peak strength. This interactive timeline shows how it
          works.
        </p>
      </div>
      <div className="relative mt-12">
        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className={`text-center md:text-${
                index === 0 ? "right" : index === 2 ? "left" : "center"
              } ${
                index === 0 ? "md:pr-8" : index === 2 ? "md:pl-8" : "md:px-8"
              }`}
            >
              <div
                className={`text-5xl font-black ${
                  index === 0
                    ? "text-amber-400"
                    : index === 1
                    ? "text-amber-500"
                    : "text-amber-600"
                }`}
              >
                {block.num}
              </div>
              <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-200">
                {block.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {block.subtitle}
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {block.desc}
              </p>
              <button
                onClick={() => toggleDetails(block.id)}
                className="mt-4 text-amber-600 dark:text-amber-500 font-semibold hover:text-amber-800 dark:hover:text-amber-400"
              >
                View Details →
              </button>
              {openDetails === block.id && (
                <div className="mt-4 text-left p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-sm text-gray-700 dark:text-gray-300">
                  {block.details.map((detail) => (
                    <p key={detail}>
                      {detail.split(":")[0]}:{" "}
                      <strong>{detail.split(":")[1]}</strong>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const VolumeSection = () => {
  const landmarks = [
    {
      name: "MV",
      title: "Maintenance Volume",
      desc: "The minimum to keep gains (~6 sets/week).",
      color: "gray",
    },
    {
      name: "MEV",
      title: "Minimum Effective Volume",
      desc: "The minimum to make new gains (~10-12 sets/week to start a block).",
      color: "green",
    },
    {
      name: "MAV",
      title: "Maximum Adaptive Volume",
      desc: 'Your "sweet spot" range for the best progress.',
      color: "amber",
    },
    {
      name: "MRV",
      title: "Maximum Recoverable Volume",
      desc: "The absolute ceiling you can recover from.",
      color: "red",
    },
  ];

  const colors = {
    gray: {
      bg: "dark:bg-gray-800 bg-gray-50",
      border: "dark:border-gray-700 border-gray-200",
      text: "dark:text-gray-200 text-gray-800",
      subtext: "dark:text-gray-400 text-gray-500",
    },
    green: {
      bg: "dark:bg-green-900/30 bg-green-50",
      border: "dark:border-green-800/50 border-green-200",
      text: "dark:text-green-300 text-green-800",
      subtext: "dark:text-green-400 text-green-600",
    },
    amber: {
      bg: "dark:bg-amber-900/30 bg-amber-50",
      border: "dark:border-amber-800/50 border-amber-200",
      text: "dark:text-amber-300 text-amber-800",
      subtext: "dark:text-amber-400 text-amber-600",
    },
    red: {
      bg: "dark:bg-red-900/30 bg-red-50",
      border: "dark:border-red-800/50 border-red-200",
      text: "dark:text-red-300 text-red-800",
      subtext: "dark:text-red-400 text-red-600",
    },
  };

  return (
    <Section id="your-volume">
      <div className="text-center">
        <h2 className="text-base font-semibold text-amber-600 tracking-wider uppercase">
          Individualization
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
          Finding Your Optimal Volume
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          "Optimal volume" isn't one number—it's a personal range. This section
          gives you the tools to find your sweet spot.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
          Your Volume Landmarks
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
          Use these concepts, measured in weekly hard sets, as a GPS for your
          training. Start at MEV, progress towards MRV, then deload.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {landmarks.map((l) => (
            <div
              key={l.name}
              className={`p-4 rounded-lg border-2 ${colors[l.color].bg} ${
                colors[l.color].border
              }`}
            >
              <h4 className={`font-bold text-lg ${colors[l.color].text}`}>
                {l.name}
              </h4>
              <p className={`text-sm ${colors[l.color].subtext}`}>{l.title}</p>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                {l.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
          Your Daily Compass: Autoregulation
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
          Your ability to perform changes daily. Autoregulation (using RPE/RIR)
          lets you adjust your training to match your readiness.
        </p>
        <div className="mt-6 flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
              <span>EASY</span>
              <span>MAX EFFORT</span>
            </div>
            <div className="relative mt-2">
              <div className="h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-500 rounded-full"></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="font-bold text-green-700 dark:text-green-400">
                  RPE 7
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  3 Reps Left
                </p>
              </div>
              <div>
                <p className="font-bold text-yellow-700 dark:text-yellow-400">
                  RPE 8
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  2 Reps Left
                </p>
              </div>
              <div>
                <p className="font-bold text-red-700 dark:text-red-400">
                  RPE 9
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  1 Rep Left
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const AICoachSection = () => {
  const [inputs, setInputs] = useState({
    experience: "Intermediate",
    goal: "Hypertrophy (Build Muscle)",
    days: "4",
  });
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const generateProgram = async () => {
    setIsLoading(true);
    setError(null);
    setProgram(null);
    const prompt = `Act as an expert powerlifting and hypertrophy coach. Based on the principles of block periodization, create a detailed 4-week training program for an athlete with the following characteristics:\n- Experience Level: ${inputs.experience}\n- Primary Goal: ${inputs.goal}\n- Training Days per Week: ${inputs.days}\nThe program should start with an accumulation phase (weeks 1-2) and move into a transmutation phase (weeks 3-4).\nProvide the output as a JSON object. The root object should have keys "week1", "week2", "week3", "week4". Each week should be an array of objects, where each object represents a training day with "day", "focus", and "workout" properties. The "workout" property should be an array of objects, each with "exercise", "sets", "reps", and "rpe" properties. Make sure the exercise selection is appropriate.`;
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
        setProgram(JSON.parse(result.candidates[0].content.parts[0].text));
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error generating program:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const thClasses =
    "py-2 px-3 bg-gray-50 dark:bg-gray-700/50 font-bold uppercase text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600";
  const tdClasses = "py-2 px-3 border-b border-gray-200 dark:border-gray-700";

  return (
    <Section id="ai-coach">
      <div className="text-center">
        <h2 className="text-base font-semibold text-amber-600 tracking-wider uppercase">
          Your AI Coach
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
          Personalized Program Builder
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Tell the AI your goals, and it will generate a customized 4-week
          training block.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 mt-12 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Experience Level
            </label>
            <select
              id="experience"
              name="experience"
              value={inputs.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="goal"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Primary Goal
            </label>
            <select
              id="goal"
              name="goal"
              value={inputs.goal}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            >
              <option>Hypertrophy (Build Muscle)</option>
              <option>Strength (Get Stronger)</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="days"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Training Days/Week
            </label>
            <select
              id="days"
              name="days"
              value={inputs.days}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            >
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={generateProgram}
            disabled={isLoading}
            className="inline-flex items-center bg-amber-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-700 transition-colors disabled:bg-amber-400 disabled:cursor-not-allowed"
          >
            ✨ Generate My Program
          </button>
        </div>
      </div>
      <div className="mt-8 max-w-6xl mx-auto text-gray-800 dark:text-gray-200">
        {isLoading && <Loader />}
        {error && (
          <div className="text-center p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            <p>Sorry, the AI Coach couldn't generate a program: {error}</p>
          </div>
        )}
        {program && (
          <div>
            {Object.entries(program).map(([week, days]) => (
              <div key={week}>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-4">
                  {week.charAt(0).toUpperCase() + week.slice(1)}
                </h3>
                {days.map((day, dayIndex) => (
                  <div
                    key={`${week}-${day.day}-${dayIndex}`}
                    className="mb-6 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <h4 className="font-bold text-lg text-amber-700 dark:text-amber-500">
                      {day.day}: {day.focus}
                    </h4>
                    <table className="mt-2 w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className={thClasses}>Exercise</th>
                          <th className={thClasses}>Sets</th>
                          <th className={thClasses}>Reps</th>
                          <th className={thClasses}>RPE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.workout.map((w, wIndex) => (
                          <tr
                            key={`${week}-${day.day}-${w.exercise}-${wIndex}`}
                          >
                            <td className={tdClasses}>{w.exercise}</td>
                            <td className={tdClasses}>{w.sets}</td>
                            <td className={tdClasses}>{w.reps}</td>
                            <td className={tdClasses}>{w.rpe}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

const RecoverySection = () => {
  const [ratings, setRatings] = useState({ sleep: 3, stress: 3, soreness: 3 });
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRatingChange = (e) => {
    setRatings({ ...ratings, [e.target.name]: e.target.value });
  };

  const getAdvice = async () => {
    setIsLoading(true);
    setError(null);
    setAdvice("");
    const prompt = `Act as a compassionate but firm strength and conditioning coach. My recovery metrics for today are:\n- Sleep Quality: ${ratings.sleep} out of 5 (1=poor, 5=excellent)\n- General Life Stress: ${ratings.stress} out of 5 (1=low, 5=high)\n- Muscle Soreness: ${ratings.soreness} out of 5 (1=none, 5=high)\nBased on these metrics, provide 2-3 brief, actionable pieces of advice for my training and recovery today. Keep the tone encouraging.`;
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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="recovery">
      <div className="text-center">
        <h2 className="text-base font-semibold text-amber-600 tracking-wider uppercase">
          The Support System
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
          Your Recovery Toolkit
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          High-volume training is demanding. Prioritizing recovery isn't
          optional—it's what allows you to adapt and get stronger.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-4xl">😴</span>
            <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-gray-200">
              Sleep
            </h3>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The non-negotiable foundation. Aim for 7-9+ hours/night.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-4xl">🍽️</span>
            <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-gray-200">
              Nutrition
            </h3>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Provides the fuel for performance and the raw materials for repair.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <span className="text-4xl">🚶‍♂️</span>
            <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-gray-200">
              Active Recovery
            </h3>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Low-intensity activity on rest days increases blood flow.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mt-12 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
          ✨ AI Recovery Advisor
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
          Check in with your AI coach for actionable advice to optimize your
          recovery.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <label
              htmlFor="sleep"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Sleep Quality
            </label>
            <input
              type="range"
              id="sleep"
              name="sleep"
              min="1"
              max="5"
              value={ratings.sleep}
              onChange={handleRatingChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <span className="text-amber-700 dark:text-amber-500 font-bold">
              {ratings.sleep}
            </span>
          </div>
          <div>
            <label
              htmlFor="stress"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Stress Level
            </label>
            <input
              type="range"
              id="stress"
              name="stress"
              min="1"
              max="5"
              value={ratings.stress}
              onChange={handleRatingChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <span className="text-amber-700 dark:text-amber-500 font-bold">
              {ratings.stress}
            </span>
          </div>
          <div>
            <label
              htmlFor="soreness"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Soreness
            </label>
            <input
              type="range"
              id="soreness"
              name="soreness"
              min="1"
              max="5"
              value={ratings.soreness}
              onChange={handleRatingChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <span className="text-amber-700 dark:text-amber-500 font-bold">
              {ratings.soreness}
            </span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={getAdvice}
            disabled={isLoading}
            className="inline-flex items-center bg-amber-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-700 transition-colors disabled:bg-amber-400"
          >
            ✨ Get Recovery Advice
          </button>
        </div>
        {isLoading && <Loader />}
        {error && (
          <div className="mt-6 text-center p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            <p>Sorry, the AI Advisor couldn't generate advice: {error}</p>
          </div>
        )}
        {advice && (
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-800 dark:text-amber-300 rounded-r-lg whitespace-pre-wrap">
            {advice}
          </div>
        )}
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer>
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
      <p className="font-bold text-lg text-gray-200">The Volume Dial</p>
      <p className="mt-2 text-sm text-gray-400">
        An interactive guide to build a smarter, stronger you.
      </p>
    </div>
  </footer>
);

function App() {
  const [activeSection, setActiveSection] = useState("hero");

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

  return (
    <div className="text-gray-800 dark:text-gray-300 font-sans antialiased">
      <Header activeSection={activeSection} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <PrinciplesSection />
        <PeriodizationSection />
        <VolumeSection />
        <AICoachSection />
        <RecoverySection />
      </main>
      <Footer />
    </div>
  );
}

export default function ThemedApp() {
  return <App />;
}
