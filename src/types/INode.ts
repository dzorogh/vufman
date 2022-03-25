import { INodeModel } from "@/types/INodeModel";
import { NodeModel } from "@/models/NodeModel";

export interface INode {
  // All nodes
  ancestors: INode[];
  isTrashed: boolean;
  id: string;
  name: string;
  isFolder: boolean;
  size: number;
  comment?: string;
  folderId: string | null;
  createdAt: ReturnType<Date['toISOString']> | null;
  updatedAt: ReturnType<Date['toISOString']> | null;
  deletedAt: ReturnType<Date['toISOString']> | null;
  authorId: number | string;
  author?: {
    firstName: string;
    lastName: string;
    fullName: string;
  };

  // For file
  thumbnail?: string;
  mimetype?: string;
  src?: string;
  extension?: string;
  content?: string;

  // For folder
  children?: INode[];

}
