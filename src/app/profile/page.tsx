'use client'
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const Profile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId')!;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL as string}/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user", error);
        });
    } else {
      router.push('/')
    }
  }, [userId, router]);

  if (!user) return <div>Завантаження...</div>;

  const handleAdminClick = () => {
    router.push(`/admin?userId=${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl md:text-3xl font-bold mb-4 text-center text-black">Особистий кабінет</h1>
        {user.photoUrl && (
          <div className="flex justify-center mb-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/user-photo/${user.telegramId}`}
              alt="Фото профілю"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        )}
        <div className="text-gray-800 space-y-2">
          <p><strong>Ім`я:</strong> {user.firstName}</p>
          <p><strong>Прізвище:</strong> {user.lastName}</p>
          <p><strong>Telegram ID:</strong> {user.telegramId}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Номер телефону:</strong> {user.phoneNumber}</p>
          <p><strong>Мова:</strong> {user.languageCode}</p>
        </div>
        <button
          onClick={handleAdminClick}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Перейти на сторінку адміністратора
        </button>
      </div>
    </div>
  );
};

export default function ProfileWithSuspense() {
  return (
    <Suspense fallback={<div>Завантаження профілю...</div>}>
      <Profile />
    </Suspense>
  );
}
