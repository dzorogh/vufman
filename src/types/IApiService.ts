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
import { AxiosInstance } from "axios";
import { IPasteRequest } from "@/types/IPasteRequest";

export interface IApiService {
  axios: AxiosInstance;

  nodes: (request: INodesRequest, cancelable?: boolean) => Promise<INodeModel[]>;
  folder: (request: IFolderRequest) => Promise<INodeModel | null>;
  file: (request: IFileRequest) => Promise<INodeModel | null>;

  upload: (request: IUploadRequest) => Promise<INodeModel[]>;
  rename: (request: IRenameRequest) => Promise<INodeModel | null>;
  delete: (request: IDeleteRequest) => Promise<boolean>;
  destroy: (request: IDestroyRequest) => Promise<boolean>;
  restore: (request: IRestoreRequest) => Promise<boolean>;
  move: (request: IMoveRequest) => Promise<boolean>;
  paste: (request: IPasteRequest) => Promise<boolean>;
  create: (request: ICreateRequest) => Promise<INodeModel | null>;
  download: (request: IDownloadRequest) => Promise<Blob | null>;
}

