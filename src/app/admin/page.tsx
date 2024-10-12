'use client'
import { Suspense, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types";
import { useRouter, useSearchParams } from "next/navigation";


const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const router = useRouter();

  const fetchUsers = useCallback(() => {
    axios
      .get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        params: { page, limit, search },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  }, [page, limit, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBackToProfile = () => {
    router.push(`/profile?userId=${userId}`);
  };

  return (
    <div className="container bg-gray-100 min-h-screen mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Адмін-панель</h1>
      <input
        type="text"
        placeholder="Пошук за username, ім'ям або прізвищем"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Telegram ID</th>
            <th className="py-2 px-4 border-b">Ім`я</th>
            <th className="py-2 px-4 border-b">Прізвище</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Мова</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.telegramId}</td>
              <td className="py-2 px-4 border-b">{user.firstName}</td>
              <td className="py-2 px-4 border-b">{user.lastName}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.languageCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap justify-center mt-4">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Назад
        </button>
        <span className="p-4">Сторінка {page}</span>
        <button onClick={() => setPage(page + 1)}>Вперед</button>
      </div>
      <button
        onClick={handleBackToProfile}
        className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Повернутися до профілю
      </button>
    </div>
  );
};

export default function AdminWithSuspense() {
  return (
    <Suspense fallback={<div>Завантаження Сторінки...</div>}>
      <Admin />
    </Suspense>
  );
}
