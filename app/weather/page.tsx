// app/weather.page.tsx
"use client";
import { useState, useEffect } from "react";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgClass, setBgClass] = useState("from-blue-300 to-blue-500");

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    if (!weather) return;

    // 天気に応じた背景を設定
    if (weather.description.includes("晴れ")) {
      setBgClass("from-yellow-300 to-orange-500"); // 晴れ → 黄・オレンジ
    } else if (weather.description.includes("雨")) {
      setBgClass("from-gray-500 to-blue-900"); // 雨 → グレー・青
    } else if (weather.description.includes("曇")) {
      setBgClass("from-gray-300 to-gray-600"); // 曇り → ライトグレー・ダークグレー
    } else {
      setBgClass("from-blue-300 to-blue-500"); // デフォルト
    }
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

  // bgClass を直接クラス名として使用
  return (
    <div className={`h-screen w-full flex items-center justify-center transition-all duration-500 bg-gradient-to-b ${bgClass}`}>
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl text-gray-700 mb-4 text-center">都市名 in English</h1>
        <input
          type="text"
          placeholder="都市名を入力 (例: Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
          className="text-2xl border p-2 rounded w-full"
        />
        <button 
          onClick={fetchWeather} 
          disabled={loading}
          className="mt-2 bg-blue-500 text-white text-lg py-3 px-6 rounded w-full hover:bg-blue-600"
        >
          {loading ? "取得中..." : "天気を取得"}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {weather && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl underline">{weather.name}の天気</h2>
            <div className="text-lg">最高気温: {weather.temp_max}℃</div>
            <div className="text-lg">最低気温: {weather.temp_min}℃</div>
            <div className="text-lg">湿度: {weather.humidity}%</div>
            <div className="text-lg">
              天気: {weather.description} {getWeatherIcon(weather.description)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const getWeatherIcon = (description: string) => {
  if (description.includes("晴")) return "☀️";
  if (description.includes("雨")) return "🌧";
  if (description.includes("曇")) return "☁️";
  if (description.includes("雲")) return "☁️";
  if (description.includes("雪")) return "⛄️";
  return "🌍";
};