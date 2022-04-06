import { AccessType } from "@/types/AccessType";

export const accessTypes: { [key in AccessType]: string } = {
  read: 'Чтение',
  write: 'Запись',
  denied: 'Запрещен'
};
