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
  createdAt: ReturnType<Date['toISOString']> | null;
  updatedAt: ReturnType<Date['toISOString']> | null;
  deletedAt: ReturnType<Date['toISOString']> | null;
  trashedAt: ReturnType<Date['toISOString']> | null;

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

}
