import { INode } from '@/types/INode';
import { INodesRequest } from '@/types/INodesRequest';
import { IFolderRequest } from "@/types/IFolderRequest";
import { IFileRequest } from "@/types/IFileRequest";
import { Node } from "@/models/Node";

export interface ApiServiceInterface {

  getNodes: (request: INodesRequest, cancelable?: boolean) => Promise<Node[] | []>;
  getFolder: (request: IFolderRequest) => Promise<Node | null>;
  getFile: (request: IFileRequest) => Promise<Node | null>;
}
