import { Node } from '@/types/Node';
import { NodesRequest } from '@/types/NodesRequest';

export interface ApiServiceInterface {

  getNavigator: () => Promise<Node[]>;

  getNodes: (request: NodesRequest) => Promise<Node[] | []>;

}
