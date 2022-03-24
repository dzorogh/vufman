import { INodesRequest } from '@/types/INodesRequest';
import { IFolderRequest } from "@/types/IFolderRequest";
import { IFileRequest } from "@/types/IFileRequest";
import { INodeModel } from "@/types/INodeModel";
import { IUploadRequest } from "@/types/IUploadRequest";

export interface ApiServiceInterface {
  getNodes: (request: INodesRequest, cancelable?: boolean) => Promise<INodeModel[] | []>;
  getFolder: (request: IFolderRequest) => Promise<INodeModel | null>;
  getFile: (request: IFileRequest) => Promise<INodeModel | null>;

  upload: (request: IUploadRequest) => Promise<INodeModel[] | null>;
}
