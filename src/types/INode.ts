import { IAccess } from "@/types/IAccess";

export interface INode {
  // All nodes
  ancestors: INode[];
  id: string | number;
  name: string;
  isFolder: boolean;
  size: number;
  comment?: string;
  folderId: INode['id'] | null;

  createdAt: number | null;
  updatedAt: number | null;
  deletedAt: number | null;
  trashedAt: number | null;

  isTrashed: boolean;
  isDeleted: boolean;

  authorId: number | string;
  author?: {
    firstName: string;
    lastName: string;
    fullName: string;
  };
  access?: IAccess;

  // For file
  thumbnail?: string;
  mimetype?: string;
  src?: string;
  extension?: string;
  content?: string;

  // For folder
  children?: INode[];

  canRead: boolean;
  canWrite: boolean;

}
