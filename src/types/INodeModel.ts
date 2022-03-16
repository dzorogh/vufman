import { INode } from "@/types/INode";

export interface INodeModel extends Partial<INode> {
  getFullName: () => string;
  getFileType: () => string | null;
  getSize: () => string | null;
  download: () => void;
}
