import { AccessType } from "@/types/AccessType";

export interface IAccess {
  global: AccessType | null;
  partial: {
    type: 'user' | 'role';
    id: number | string;
    access: AccessType;
  }[];
}
