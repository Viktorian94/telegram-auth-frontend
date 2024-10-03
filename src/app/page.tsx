'use client'

import { useRouter } from 'next/navigation';
import TelegramLoginButton from 'telegram-login-button';


const Home = () => {
  const router = useRouter();

  const handleTelegramResponse = (response: unknown) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL!}/auth/telegram/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/profile?userId=${data.id}`);
      })
      .catch((error) => {
        console.error('Authorization error', error);
      });
  };

  return (
    <div>
      <h1>Авторизація через Telegram</h1>
      <TelegramLoginButton
        dataOnauth={handleTelegramResponse}
        botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME!}
        buttonSize='large'
      />
    </div>
  );
};

export default Home;