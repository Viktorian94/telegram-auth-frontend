import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types';
import { useSearchParams } from 'next/navigation';

 
const Profile = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user', error);
        });
    }
  }, [userId]);

  if (!user) return <div>Завантаження...</div>;

  return (
    <div>
      <h1>Особистий кабінет</h1>
      <p>Ім`я: {user.firstName}</p>
      <p>Прізвище: {user.lastName}</p>
      <p>Telegram ID: {user.telegramId}</p>
      <p>Username: {user.username}</p>
      <p>Номер телефону: {user.phoneNumber}</p>
      <p>Мова: {user.languageCode}</p>
      {user.photoUrl && <img src={user.photoUrl} alt="Фото профілю" />}
    </div>
  );
};

export default Profile;