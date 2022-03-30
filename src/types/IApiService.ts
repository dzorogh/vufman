import { AxiosInstance } from "axios";
import { INodesRequest } from '@/types/INodesRequest';
import { IFolderRequest } from "@/types/IFolderRequest";
import { IFileRequest } from "@/types/IFileRequest";
import { INodeModel } from "@/types/INodeModel";
import { IUploadRequest } from "@/types/IUploadRequest";
import { IRenameRequest } from "@/types/IRenameRequest";
import { IDeleteRequest } from "@/types/IDeleteRequest";
import { IDestroyRequest } from "@/types/IDestroyRequest";
import { IRestoreRequest } from "@/types/IRestoreRequest";
import { ICreateRequest } from "@/types/ICreateRequest";
import { IMoveRequest } from "@/types/IMoveRequest";
import { IDownloadRequest } from "@/types/IDownloadRequest";
import { IPasteRequest } from "@/types/IPasteRequest";
import { IUser } from "@/types/IUser";
import { IRole } from "@/types/IRole";
import { ILogRequest } from "@/types/ILogRequest";
import { ILogResponse } from "@/types/ILogResponse";
import { ISaveFileRequest } from "@/types/ISaveFileRequest";
import { ISaveCommentRequest } from "@/types/ISaveCommentRequest";
import { ISaveAccessRequest } from "@/types/ISaveAccessRequest";

export interface IApiService {
  axios: AxiosInstance;

  nodes: (request: INodesRequest, cancelable?: boolean) => Promise<INodeModel[]>;
  folder: (request: IFolderRequest) => Promise<INodeModel | null>;
  file: (request: IFileRequest) => Promise<INodeModel | null>;

  upload: (request: IUploadRequest) => Promise<INodeModel>;
  rename: (request: IRenameRequest) => Promise<INodeModel | null>;
  delete: (request: IDeleteRequest) => Promise<INodeModel[]>;
  destroy: (request: IDestroyRequest) => Promise<boolean>;
  restore: (request: IRestoreRequest) => Promise<INodeModel[]>;
  move: (request: IMoveRequest) => Promise<INodeModel[]>;
  paste: (request: IPasteRequest) => Promise<INodeModel[]>;
  create: (request: ICreateRequest) => Promise<INodeModel | null>;
  download: (request: IDownloadRequest) => Promise<Blob | null>;
  saveFile: (request: ISaveFileRequest) => Promise<INodeModel | null>;
  saveComment: (request: ISaveCommentRequest) => Promise<INodeModel | null>;
  saveAccess: (request: ISaveAccessRequest) => Promise<INodeModel | null>;

  emptyTrash: () => Promise<boolean>;
  currentUser: () => Promise<IUser>;
  users: () => Promise<IUser[]>;
  roles: () => Promise<IRole[]>;
  log: (request: ILogRequest) => Promise<ILogResponse>;
}

