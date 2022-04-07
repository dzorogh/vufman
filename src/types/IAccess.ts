import { AccessType } from "@/types/AccessType";

export interface IAccess {
  global: AccessType | null;
  special: {
    type: 'user' | 'role';
    id: number | string;
    access: AccessType;
  }[];
}
