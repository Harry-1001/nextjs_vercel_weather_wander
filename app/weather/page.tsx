// app/weather.page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// Prevent Tailwind from purging these classes
const unusedClasses = "animate-sunny animate-rainy animate-cloudy animate-snowy";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgClass, setBgClass] = useState("from-blue-300 to-blue-500");
  const [animationClass, setAnimationClass] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) setCity(savedCity);
  }, []);

  useEffect(() => {
    if (!weather) return;

    let newBgClass = "from-blue-300 to-blue-500";
    let newAnimationClass = "";

    stopAnimation();

    if (weather.description.includes("晴れ")) {
      newBgClass = "from-yellow-300 to-orange-500";
      newAnimationClass = "animate-sunny";
      startSunnyAnimation();
    } else if (weather.description.includes("雨")) {
      newBgClass = "from-gray-500 to-blue-900";
      newAnimationClass = "animate-rainy";
      startRainAnimation();
    } else if (weather.description.includes("曇")) {
      newBgClass = "from-gray-300 to-gray-600";
      newAnimationClass = "animate-cloudy";
      startCloudyAnimation();
    }

    console.log("Applied animation:", newAnimationClass);
    setBgClass(newBgClass);
    setAnimationClass(newAnimationClass);
  }, [weather]);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      localStorage.setItem("lastCity", city);
      const response = await fetch(`/api/weather?city=${city}`, { cache: "no-store" });
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.error || "天気情報を取得できませんでした");
      }
    } catch (error) {
      setError("データ取得エラー");
    } finally {
      setLoading(false);
    }
  };

  /** ☀️ Start sunny animation */
  const startSunnyAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const drawSun = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "orange";
      for (let i = 0; i < 8; i++) {
        const x = Math.cos(angle + (i * Math.PI) / 4) * 70 + canvas.width / 2;
        const y = Math.sin(angle + (i * Math.PI) / 4) * 70 + canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      angle += 0.02;
      animationFrameRef.current = requestAnimationFrame(drawSun);
    };
    drawSun();
  };

  /** 🌧 Start rain animation */
  const startRainAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raindrops = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 4 + 2,
      length: Math.random() * 10 + 5,
    }));

    const drawRain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(173, 216, 230, 0.6)";
      ctx.lineWidth = 1.5;

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
      animationFrameRef.current = requestAnimationFrame(drawRain);
    };
    drawRain();
  };

  /** ☁️ Start cloudy animation */
  const startCloudyAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cloudX = 0;
    const drawCloud = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "lightgray";
      ctx.beginPath();
      ctx.arc(cloudX, 50, 40, 0, Math.PI * 2);
      ctx.arc(cloudX + 40, 60, 50, 0, Math.PI * 2);
      ctx.arc(cloudX + 80, 50, 40, 0, Math.PI * 2);
      ctx.fill();
      cloudX = (cloudX + 1) % canvas.width;
      animationFrameRef.current = requestAnimationFrame(drawCloud);
    };
    drawCloud();
  };

  /** 🛑 Stop all animations */
  const stopAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  return (
    <div className={clsx("h-screen w-full flex items-center justify-center transition-all duration-500 bg-gradient-to-b", bgClass, animationClass)}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </div>
  );
}