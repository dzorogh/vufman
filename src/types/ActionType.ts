import { IApiService } from "@/types/IApiService";

export type ActionType =
  keyof Omit<IApiService, 'axios' | 'nodes' | 'currentUser' | 'roles' | 'log' | 'file' | 'folder' | 'users'>
