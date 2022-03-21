import { INode } from "@/types/INode";
import { NodeModel } from "@/models/NodeModel";

export type INodeModel = Partial<INode> & Omit<NodeModel, 'collection'>
