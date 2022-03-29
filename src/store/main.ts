import { defineStore } from 'pinia';
import { IUser } from "@/types/IUser";
import { IRole } from "@/types/IRole";

export const useStore = defineStore('main', {
  state: () => {
    return {
      users: [] as IUser[],
      currentUser: null as IUser | null,
      roles: [] as IRole[]
    };
  }
});

