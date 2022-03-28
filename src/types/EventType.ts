import { IApiService } from "@/types/IApiService";

export type EventType =
  keyof Omit<IApiService, 'axios' | 'nodes' | 'currentUser' | 'roles' | 'log' | 'file' | 'folder'>
