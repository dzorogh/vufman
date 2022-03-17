import { INode } from "@/types/INode";
import { RouteLocationRaw } from "vue-router";

export interface INodeModel extends Partial<INode> {
  getFullName: () => string;
  getFileType: () => string;
  getSize: () => string;
  download: () => void;
  getParentRoute: () => RouteLocationRaw | null;
  getParentName: () => string;
}
