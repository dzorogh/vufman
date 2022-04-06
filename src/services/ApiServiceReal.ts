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

  /**
   * Upload file by chunks
   *
   * @param file
   * @param data
   * @param withCredentials
   * @param onFinish
   * @param onError
   * @param onProgress
   */
  async upload({
                 file,
                 data,
                 // headers,
                 withCredentials,
                 // action,
                 onFinish,
                 onError,
                 onProgress
               }: UploadCustomRequestOptions) {
    if (!file || !file.file) {
      throw new Error('No file content');
    }

    const chunkSize = 2 * 1024 * 1024; // 2MB
    const chunksCount = Math.ceil(file.file.size / chunkSize);
    const chunks = [];
    const fileContent = file.file;
    const fileName = file.name;
    const fileType = file.type;

    for (let i = 0; i < chunksCount; i++) {
      chunks.push(fileContent.slice(
        i * chunkSize, Math.min(i * chunkSize + chunkSize, fileContent.size), fileContent.type
      ));
    }

    if (chunks.length > 0) {
      for (const [ index, chunk ] of chunks.entries()) {
        const isLast = index + 1 === chunks.length;
        const formData = new FormData();

        if (data) {
          Object.keys(data).forEach((key) => {
            formData.append(
              key,
              data[key as keyof UploadCustomRequestOptions['data']]
            );
          });
        }

        formData.append('chunk', chunk);
        formData.append('isLast', isLast ? "1" : "0");
        formData.append('name', fileName);
        formData.append('type', fileType || '');
        formData.append('chunkIndex', index + 1 + '');

        try {
          const percent = Math.ceil(((index + 1) / chunks.length) * 100);
          console.log(`Sending chunk ${index + 1} of ${chunks.length}: ${percent}%`);
          const response = await this.axios.post(
            'upload',
            formData,
            {
              withCredentials,
              headers: {
                'Content-Type': 'application/octet-stream'
              },
              onUploadProgress: ({ loaded, total }) => {
                // onProgress({ percent: Math.ceil(loaded / total) });
                onProgress({ percent }); // get percents only from chunks
              }
            });

          if (isLast) {
            onFinish();

            return new NodeModel(response.data.data);
          }

        } catch (err) {
          onError();
        }
      }
    }

    return null;
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
