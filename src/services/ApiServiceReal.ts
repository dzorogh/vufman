import { ApiService } from "@/services/ApiService";
import { IApiService } from "@/types/IApiService";
import { INodesRequest } from "@/types/INodesRequest";
import { NodeModel } from "@/models/NodeModel";
import { IFolderRequest } from "@/types/IFolderRequest";
import { IFileRequest } from "@/types/IFileRequest";
import { UploadCustomRequestOptions } from "naive-ui";
import { INodeModel } from "@/types/INodeModel";
import { AxiosRequestConfig } from "axios";
import { IDownloadRequest } from "@/types/IDownloadRequest";
import { IRenameRequest } from "@/types/IRenameRequest";
import { ISaveContentRequest } from "@/types/ISaveContentRequest";
import { ISaveCommentRequest } from "@/types/ISaveCommentRequest";
import { ISaveAccessRequest } from "@/types/ISaveAccessRequest";
import { ICreateRequest } from "@/types/ICreateRequest";
import { IDeleteRequest } from "@/types/IDeleteRequest";
import { IDestroyRequest } from "@/types/IDestroyRequest";
import { IRestoreRequest } from "@/types/IRestoreRequest";
import { IMoveRequest } from "@/types/IMoveRequest";
import { IPasteRequest } from "@/types/IPasteRequest";
import { ILogRequest } from "@/types/ILogRequest";

export class ApiServiceReal extends ApiService implements IApiService {
  private getNodesController: AbortController | undefined;

  async nodes(request: INodesRequest, cancelable?: boolean) {
    console.log('getNodes', request, cancelable);

    if (this.getNodesController && cancelable) {
      this.getNodesController.abort();
    }

    this.getNodesController = new AbortController();

    const response = await this.axios.get(
      'nodes', {
        params: request,
        signal: cancelable ? this.getNodesController.signal : undefined
      });

    return NodeModel.collection(response.data.data);
  }

  async folder(request: IFolderRequest) {
    const response = await this.axios.get(
      'folder',
      {
        params: request
      }
    );

    if (response.data.data) {
      return new NodeModel(response.data.data);
    }

    return null;
  }

  async file(request: IFileRequest) {
    const response = await this.axios.get(
      'file',
      {
        params: request
      }
    );

    return new NodeModel(response.data.data);
  }

  upload({
           file,
           data,
           headers,
           withCredentials,
           action,
           onFinish,
           onError,
           onProgress
         }: UploadCustomRequestOptions) {

    return new Promise<INodeModel>((resolve, reject) => {
      const formData = new FormData();

      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key as keyof UploadCustomRequestOptions['data']]
          );
        });
      }

      formData.append('file', file.file as File);

      console.log('FileUpload FormData', data, formData);

      this.axios
        .post(
          // action as string,
          'upload',
          formData,
          {
            withCredentials,
            headers,
            onUploadProgress: ({ loaded, total }) => {
              onProgress({ percent: Math.ceil((loaded / total) * 100) });
            }
          } as AxiosRequestConfig)
        .then((e) => {
          onFinish();
          resolve(this.create({ name: file.name, folderId: null, type: 'file' }));
        })
        .catch((error) => {
          onError();
          reject();
        });
    });

  }

  async download(request: IDownloadRequest) {
    const response = await this.axios.get(
      'download',
      {
        params: request,
        responseType: 'blob'
      }
    );

    return new Blob([ response.data ]);
  }

  async rename(request: IRenameRequest) {
    const response = await this.axios.post(
      'rename',
      request
    );

    return new NodeModel(response.data.data);
  }

  async saveContent(request: ISaveContentRequest) {
    const response = await this.axios.post(
      'save-content',
      request
    );
    return new NodeModel(response.data.data);
  }

  async saveComment(request: ISaveCommentRequest) {
    const response = await this.axios.post(
      'save-comment',
      request
    );
    return new NodeModel(response.data.data);
  }

  async saveAccess(request: ISaveAccessRequest) {
    const response = await this.axios.post(
      'save-access',
      request
    );
    return new NodeModel(response.data.data);
  }

  async create(request: ICreateRequest) {
    const response = await this.axios.post(
      'create',
      request
    );

    return new NodeModel(response.data.data);
  }

  async delete(request: IDeleteRequest) {
    const response = await this.axios.post(
      'delete',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async destroy(request: IDestroyRequest) {
    const response = await this.axios.post(
      'destroy',
      request
    );

    return true;
  }

  async restore(request: IRestoreRequest) {
    const response = await this.axios.post(
      'restore',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async move(request: IMoveRequest) {
    const response = await this.axios.post(
      'move',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async paste(request: IPasteRequest) {
    const response = await this.axios.post(
      'paste',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async emptyTrash() {
    const response = await this.axios.post(
      'empty-trash',
    );

    return true;
  }

  async log(request: ILogRequest) {
    const response = await this.axios.get(
      'log',
      {
        params: request
      }
    );

    return response.data;
  }

  async currentUser() {
    const response = await this.axios.get(
      'current-user',
    );

    return response.data.data;
  }

  async users() {
    const response = await this.axios.get(
      'users',
    );

    return response.data.data;
  }

  async roles() {
    const response = await this.axios.get(
      'roles',
    );

    return response.data.data;
  }
}
