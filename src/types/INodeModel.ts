import { INode } from "@/types/INode";
import { RouteLocationRaw } from "vue-router";

export interface INodeModel extends Partial<INode> {
  getFullName: () => string;
  getFileType: () => string | null;
  getSize: () => string | null;
  download: () => void;
  getParentRoute: () => RouteLocationRaw | null;
  getParentName: () => string;
}
