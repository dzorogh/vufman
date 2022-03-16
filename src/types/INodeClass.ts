import { INode } from "@/types/INode";

export interface INodeClass extends Partial<INode> {
  getFullName: () => string;
  getFileType: () => string | null;
  download: () => void;
}
