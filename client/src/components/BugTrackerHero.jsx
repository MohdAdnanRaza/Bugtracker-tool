import { useState, useEffect, useRef } from "react";
import {
  BugPlay,
  CheckCircle,
  AlertTriangle,
  Bolt,
  ChevronRight,
} from "lucide-react";

export default function BugTrackerHero() {
  // Refs for animation elements
  const bugRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featureRef = useRef(null);
  const ctaRef = useRef(null);

  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [counterValue, setCounterValue] = useState(0);

  // Feature list for animation
  const features = [
    {
      icon: <BugPlay className="text-emerald-500" size={24} />,
      text: "Track bugs efficiently",
    },
    {
      icon: <CheckCircle className="text-emerald-500" size={24} />,
      text: "Resolve issues faster",
    },
    {
      icon: <AlertTriangle className="text-emerald-500" size={24} />,
      text: "Prioritize what matters",
    },
    {
      icon: <Bolt className="text-emerald-500" size={24} />,
      text: "Boost team productivity",
    },
  ];

  // Visual bug elements
  const bugElements = [
    { top: "15%", left: "80%", delay: 2, size: "w-6 h-6" },
    { top: "75%", left: "10%", delay: 4, size: "w-5 h-5" },
    { top: "35%", left: "20%", delay: 7, size: "w-4 h-4" },
    { top: "60%", left: "85%", delay: 5, size: "w-5 h-5" },
    { top: "25%", left: "40%", delay: 6, size: "w-4 h-4" },
    { top: "80%", left: "60%", delay: 3, size: "w-6 h-6" },
  ];

  // Handle animations on component mount
  useEffect(() => {
    // Trigger enter animations
    setIsLoaded(true);

    // Start counter animation
    const interval = setInterval(() => {
      setCounterValue((prev) => {
        if (prev < 98) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 98;
        }
      });
    }, 30);

    // Feature list animation
    const featureInterval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(featureInterval);
    };
  }, []);

  // Custom wiggle animation for bugs
  const wiggleAnimation = (delay) => {
    return {
      animation: `wiggle 3s ease-in-out ${delay}s infinite alternate`,
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 0.5s ease-in-out",
    };
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes wiggle {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(5px, 2px) rotate(5deg);
          }
          50% {
            transform: translate(0, 4px) rotate(0deg);
          }
          75% {
            transform: translate(-5px, 2px) rotate(-5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .feature-transition {
          transition: all 0.5s ease-in-out;
        }
      `}</style>

      {/* Animated Bug Elements */}
      {bugElements.map((bug, index) => (
        <div
          key={index}
          className={`absolute ${bug.size} rounded-full bg-red-500 opacity-0`}
          style={{
            top: bug.top,
            left: bug.left,
            ...wiggleAnimation(bug.delay),
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50"></div>
            <BugPlay size="100%" className="text-white" />
          </div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 z-10">
            {/* Bug Icon with Animation */}
            <div
              ref={bugRef}
              className="flex items-center mb-6 transform transition-all duration-700"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div
                className="mr-3 bg-emerald-500 p-2 rounded-lg"
                style={{
                  animation: "pulse 3s infinite ease-in-out",
                }}
              >
                <BugPlay size={28} className="text-white" />
              </div>
              <span className="text-emerald-400 font-semibold">
                THE ULTIMATE BUG TRACKING SOLUTION
              </span>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-1000"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "300ms",
              }}
            >
              Catch Bugs <span className="text-emerald-400">Before</span> Your
              Users Do
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg text-slate-300 mb-8 max-w-lg transition-all duration-1000"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "500ms",
              }}
            >
              A powerful, intuitive platform that helps development teams track,
              prioritize, and squash bugs with unprecedented efficiency.
            </p>

            {/* Animated Feature List */}
            <div
              ref={featureRef}
              className="mb-10 h-8 transition-all duration-1000"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "700ms",
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center feature-transition absolute"
                  style={{
                    opacity: animationIndex === index ? 1 : 0,
                    transform:
                      animationIndex === index
                        ? "translateX(0)"
                        : "translateX(-20px)",
                  }}
                >
                  {feature.icon}
                  <span className="ml-2">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "900ms",
              }}
            >
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                Get Started Free
                <ChevronRight size={20} className="ml-2" />
              </button>

              <button className="border border-slate-500 hover:border-emerald-400 px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-slate-800">
                Watch Demo
              </button>
            </div>

            {/* Stats Counter */}
            <div
              className="mt-12 flex items-center transition-all duration-1000"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "1100ms",
              }}
            >
              <div className="mr-6">
                <div className="text-3xl font-bold">{counterValue}%</div>
                <div className="text-slate-400 text-sm">Faster Resolution</div>
              </div>

              <div className="border-l border-slate-700 pl-6">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-slate-400 text-sm">Development Teams</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div
            className="lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateX(0)" : "translateX(50px)",
              transitionDelay: "800ms",
            }}
          >
            <div
              className="relative"
              style={{
                animation: "float 6s infinite ease-in-out",
              }}
            >
              {/* Dashboard Visual */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-semibold">Bug Dashboard</div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Bug Graph */}
                <div className="mb-6">
                  <div className="h-40 flex items-end space-x-2">
                    {[40, 65, 35, 80, 55, 70, 50, 85, 60, 75, 45, 90].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="w-full bg-emerald-500/20 rounded-t-sm relative overflow-hidden"
                          style={{
                            height: `${height}%`,
                            transition: "height 1s ease-in-out",
                            transitionDelay: `${i * 100}ms`,
                          }}
                        >
                          <div
                            className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm"
                            style={{
                              height: isLoaded ? "100%" : "0%",
                              transition: "height 1s ease-in-out",
                              transitionDelay: `${800 + i * 100}ms`,
                            }}
                          ></div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-400">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Bug Status Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Open", count: "27", color: "bg-red-500" },
                    {
                      label: "In Progress",
                      count: "14",
                      color: "bg-yellow-500",
                    },
                    { label: "Resolved", count: "94", color: "bg-emerald-500" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-700/50 p-4 rounded-lg border border-slate-600"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded
                          ? "translateY(0)"
                          : "translateY(20px)",
                        transition: "all 0.5s ease-in-out",
                        transitionDelay: `${1200 + i * 200}ms`,
                      }}
                    >
                      <div
                        className={`${item.color} h-2 w-16 mb-2 rounded-full`}
                      ></div>
                      <div className="text-2xl font-bold">{item.count}</div>
                      <div className="text-sm text-slate-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"
                style={{ animation: "pulse 4s infinite ease-in-out" }}
              ></div>
              <div
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
                style={{ animation: "pulse 5s infinite ease-in-out 1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-24"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,141.89,111.51,214.86,91.39A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-900"
          ></path>
        </svg>
      </div>
    </div>
  );
}
