import { INode } from "@/types/INode";
import { NodeModel } from "@/models/NodeModel";

export type INodeModel = Partial<INode> & Pick<NodeModel,
  'getFullName' | 'getFileType' | 'download' | 'getSize' | 'getPath' | 'getParentName' | 'getParentRoute'>
