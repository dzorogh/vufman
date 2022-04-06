export interface INodesRequest {
  folderId?: string | null;
  isFolder?: boolean;
  isTrashed?: true;
  search?: string;
  withDescendants?: boolean;
}
