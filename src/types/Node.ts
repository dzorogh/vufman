export interface Node {
  isTrashed: boolean;
  id: string;
  name: string;
  isFolder: boolean;
  size: number;

  folderId: string | null;

  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;

  authorId: number;
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

  // For folder
  children?: Node[];

}
