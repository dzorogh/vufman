import { INode } from "@/types/INode";

export interface IRequestNodes {
  folderId?: INode['id'] | null;
  isFolder?: boolean;
  isTrashed?: boolean;
  search?: string;
  withDescendants?: boolean;
}
