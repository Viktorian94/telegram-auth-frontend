"use client";

import { useEffect } from "react";

const Home = () => {
  const url = process.env.NEXT_PUBLIC_API_URL as string
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "knopers_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", `${url}/auth/telegram/callback`);
    document.getElementById("telegram-login-button")?.appendChild(script);
  }, [url]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Авторизація через Telegram</h1>
      <div id="telegram-login-button"></div>
    </div>
  );
};

export default Home;
