import { AccessType } from "@/types/AccessType";

export interface IAccess {
  global: AccessType | 'default';
  special: {
    type: 'user' | 'role';
    id: number | string;
    access: AccessType;
  }[];
}
