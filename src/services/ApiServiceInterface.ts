import { INode } from '@/types/INode';
import { INodesRequest } from '@/types/INodesRequest';
import { IFolderRequest } from "@/types/IFolderRequest";
import { IFileRequest } from "@/types/IFileRequest";
import { NodeModel } from "@/models/NodeModel";

export interface ApiServiceInterface {

  getNodes: (request: INodesRequest, cancelable?: boolean) => Promise<NodeModel[] | []>;
  getFolder: (request: IFolderRequest) => Promise<NodeModel | null>;
  getFile: (request: IFileRequest) => Promise<NodeModel | null>;
}
