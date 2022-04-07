import { AxiosInstance } from "axios";
import { IRequestNodes } from '@/types/IRequestNodes';
import { IRequestFolder } from "@/types/IRequestFolder";
import { IRequestFile } from "@/types/IRequestFile";
import { INodeModel } from "@/types/INodeModel";
import { IRequestUpload } from "@/types/IRequestUpload";
import { IRequestRename } from "@/types/IRequestRename";
import { IRequestDelete } from "@/types/IRequestDelete";
import { IRequestTrash } from "@/types/IRequestTrash";
import { IRequestUntrash } from "@/types/IRequestUntrash";
import { IRequestCreate } from "@/types/IRequestCreate";
import { IRequestMove } from "@/types/IRequestMove";
import { IRequestPaste } from "@/types/IRequestPaste";
import { IUser } from "@/types/IUser";
import { IRole } from "@/types/IRole";
import { IRequestLog } from "@/types/IRequestLog";
import { ILogResponse } from "@/types/ILogResponse";
import { IRequestSaveContent } from "@/types/IRequestSaveContent";
import { IRequestSaveComment } from "@/types/IRequestSaveComment";
import { IRequestSaveAccess } from "@/types/IRequestSaveAccess";

export interface IApiService {
  axios: AxiosInstance;

  nodes: (request: IRequestNodes, cancelable?: boolean) => Promise<INodeModel[]>;
  folder: (request: IRequestFolder) => Promise<INodeModel | null>;
  file: (request: IRequestFile) => Promise<INodeModel | null>;

  upload: (request: IRequestUpload) => Promise<INodeModel | null>;
  rename: (request: IRequestRename) => Promise<INodeModel | null>;
  trash: (request: IRequestTrash) => Promise<INodeModel[]>;
  delete: (request: IRequestDelete) => Promise<boolean>;
  untrash: (request: IRequestUntrash) => Promise<INodeModel[]>;
  move: (request: IRequestMove) => Promise<INodeModel[]>;
  paste: (request: IRequestPaste) => Promise<INodeModel[]>;
  create: (request: IRequestCreate) => Promise<INodeModel | null>;
  saveContent: (request: IRequestSaveContent) => Promise<INodeModel | null>;
  saveComment: (request: IRequestSaveComment) => Promise<INodeModel | null>;
  saveAccess: (request: IRequestSaveAccess) => Promise<INodeModel | null>;
  emptyTrash: () => Promise<boolean>;
  
  currentUser: () => Promise<IUser>;
  users: () => Promise<IUser[]>;
  roles: () => Promise<IRole[]>;
  log: (request: IRequestLog) => Promise<ILogResponse>;
}

