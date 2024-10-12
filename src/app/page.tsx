"use client";

import Script from "next/script";

const Home = () => {
  const url = process.env.NEXT_PUBLIC_API_URL as string
  // if (!url) return;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Авторизація через Telegram</h1>
      <div>
        <Script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="knopers_bot"
          data-size="large"
          data-userpic="true"
          data-request-access="write"
          data-auth-url={`${url}/auth/telegram/callback`}
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
};

export default Home;
