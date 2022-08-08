import { ApiService } from "@/services/ApiService";
import { IApiService } from "@/types/IApiService";
import { IRequestNodes } from "@/types/IRequestNodes";
import { NodeModel } from "@/models/NodeModel";
import { IRequestFolder } from "@/types/IRequestFolder";
import { IRequestFile } from "@/types/IRequestFile";
import { UploadCustomRequestOptions } from "naive-ui";
import { INodeModel } from "@/types/INodeModel";
import { AxiosRequestConfig } from "axios";
import { IRequestRename } from "@/types/IRequestRename";
import { IRequestSaveContent } from "@/types/IRequestSaveContent";
import { IRequestSaveComment } from "@/types/IRequestSaveComment";
import { IRequestSaveAccess } from "@/types/IRequestSaveAccess";
import { IRequestCreate } from "@/types/IRequestCreate";
import { IRequestDelete } from "@/types/IRequestDelete";
import { IRequestTrash } from "@/types/IRequestTrash";
import { IRequestUntrash } from "@/types/IRequestUntrash";
import { IRequestMove } from "@/types/IRequestMove";
import { IRequestPaste } from "@/types/IRequestPaste";
import { IRequestLog } from "@/types/IRequestLog";

export class ApiServiceReal extends ApiService implements IApiService {
  private getNodesController: AbortController | undefined;

  async nodes(request: IRequestNodes, cancelable?: boolean) {
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

  async navigator() {
    console.log('getNavigator');

    const response = await this.axios.get('navigator');

    return NodeModel.collection(response.data.data);
  }

  async folder(request: IRequestFolder) {
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

  async file(request: IRequestFile) {
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

    const chunkSize = 256 * 1000 * 20;
    const chunksCount = Math.ceil(file.file.size / chunkSize);
    const fileContent = file.file;
    const fileName = file.name;
    const fileType = file.type;

    const chunks = [];

    for (let i = 0; i < chunksCount; i++) {
      chunks.push(fileContent.slice(
        i * chunkSize, Math.min(i * chunkSize + chunkSize, fileContent.size), fileContent.type
      ));
    }

    if (chunks.length === 0) {
      chunks.push(new File([], 'blob'));
    }

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
        console.error(err);
        onError();
      }
    }

    console.error('No chunks');

    return null;
  }

  async rename(request: IRequestRename) {
    const response = await this.axios.post(
      'rename',
      request
    );

    return new NodeModel(response.data.data);
  }

  async saveContent(request: IRequestSaveContent) {
    const response = await this.axios.post(
      'save-content',
      request
    );
    return new NodeModel(response.data.data);
  }

  async saveComment(request: IRequestSaveComment) {
    const response = await this.axios.post(
      'save-comment',
      request
    );
    return new NodeModel(response.data.data);
  }

  async saveAccess(request: IRequestSaveAccess) {
    const response = await this.axios.post(
      'save-access',
      request
    );
    return new NodeModel(response.data.data);
  }

  async create(request: IRequestCreate) {
    const response = await this.axios.post(
      'create',
      request
    );

    return new NodeModel(response.data.data);
  }

  async trash(request: IRequestTrash) {
    const response = await this.axios.post(
      'trash',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async delete(request: IRequestTrash) {
    const response = await this.axios.post(
      'delete',
      request
    );

    return !!response;
  }

  async untrash(request: IRequestUntrash) {
    const response = await this.axios.post(
      'untrash',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async move(request: IRequestMove) {
    const response = await this.axios.post(
      'move',
      request
    );

    return NodeModel.collection(response.data.data);
  }

  async paste(request: IRequestPaste) {
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

  async log(request: IRequestLog) {
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
