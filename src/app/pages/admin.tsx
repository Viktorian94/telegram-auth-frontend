import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types";

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

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

  return (
    <div>
      <h1>Адмін-панель</h1>
      <input
        type="text"
        placeholder="Пошук за username, ім'ям або прізвищем"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Telegram ID</th>
            <th>Ім`я</th>
            <th>Прізвище</th>
            <th>Username</th>
            <th>Мова</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.telegramId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.languageCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Назад
        </button>
        <span>Сторінка {page}</span>
        <button onClick={() => setPage(page + 1)}>Вперед</button>
      </div>
    </div>
  );
};

export default Admin;
