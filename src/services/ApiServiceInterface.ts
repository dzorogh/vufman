import { Node } from '@/types/Node';
import { NodesRequest } from '@/types/NodesRequest';
import { FolderRequest } from "@/types/FolderRequest";
import { FileRequest } from "@/types/FileRequest";

export interface ApiServiceInterface {

  getNodes: (request: NodesRequest) => Promise<Node[] | []>;
  getFolder: (request: FolderRequest) => Promise<Node | null>;
  getFile: (request: FileRequest) => Promise<Node | null>;
}
