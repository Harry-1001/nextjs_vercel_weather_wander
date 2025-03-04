// app.api/weather.route.
import { NextRequest, NextResponse } from "next/server";

type WeatherData = {
    name: string; // 都市名
    temp_max: number; // 最高気温
    temp_min: number; // 最低気温
    humidity: number; // 湿度
    description: string; // 天気の説明
  };

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  
  
  if (!city) {
    return NextResponse.json({ error: "都市名を指定してください" }, { status: 400 });
  }
  const API_KEY = process.env.NEXT_PUBLIC_API_TOKEN;
  console.log("APIキー:", process.env.NEXT_PUBLIC_API_TOKEN);
  if (!API_KEY) {
    return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 });
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ja&appid=${API_KEY}`;

  try {
    const response = await fetch(API_URL, { cache: "no-store" }); // キャッシュ防止
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        name: data.name,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });
    } else {
      return NextResponse.json({ error: "都市が見つかりません" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
