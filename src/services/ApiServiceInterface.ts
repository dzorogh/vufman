import { Node } from '@/types/Node';
import { NodesRequest } from '@/types/NodesRequest';
import { FolderRequest } from "@/types/FolderRequest";

export interface ApiServiceInterface {

  getNodes: (request: NodesRequest) => Promise<Node[] | []>;

  getFolder: (request: FolderRequest) => Promise<Node | null>;
}
