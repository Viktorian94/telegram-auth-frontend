export interface User {
  id: number;
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  languageCode?: string;
  photoUrl?: string;
}
