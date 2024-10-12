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

  const filteredUsers = users
  .filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a) => {
    if (
      a.username?.toLowerCase().includes(search.toLowerCase()) ||
      a.firstName.toLowerCase().includes(search.toLowerCase()) ||
      a.lastName?.toLowerCase().includes(search.toLowerCase())
    ) {
      return -1; 
    }
    return 0;
  });

  return (
    <div className="container bg-gray-100 min-h-screen mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-4 text-black">Адмін-панель</h1>
      <input
        className="w-full mb-4 p-2 border rounded"
        type="text"
        placeholder="Пошук за username, ім'ям або прізвищем"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">Telegram ID</th>
            <th className="py-2 px-4 border-b text-black">Ім`я</th>
            <th className="py-2 px-4 border-b text-black">Прізвище</th>
            <th className="py-2 px-4 border-b text-black">Username</th>
            <th className="py-2 px-4 border-b text-black">Мова</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-black">
                {user.telegramId}
              </td>
              <td className="py-2 px-4 border-b text-black">{user.firstName}</td>
              <td className="py-2 px-4 border-b text-black">{user.lastName}</td>
              <td className="py-2 px-4 border-b text-black">{user.username}</td>
              <td className="py-2 px-4 border-b text-black">
                {user.languageCode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap justify-center mt-4 text-black">
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
