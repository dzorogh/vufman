import { ApiServiceInterface } from '@/services/ApiServiceInterface';
import { INodesRequest } from "@/types/INodesRequest";
import { IFolderRequest } from "@/types/IFolderRequest";
import { INode } from "@/types/INode";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { promiseTimeout } from '@vueuse/core';
import { IFileRequest } from "@/types/IFileRequest";
import { NodeModel } from "@/models/NodeModel";
import { IUploadRequest } from "@/types/IUploadRequest";
import { IDownloadRequest } from "@/types/IDownloadRequest";
import { ICreateRequest } from "@/types/ICreateRequest";
import { INodeModel } from "@/types/INodeModel";
import { IRenameRequest } from "@/types/IRenameRequest";
import { IDeleteRequest } from "@/types/IDeleteRequest";
import { IDestroyRequest } from "@/types/IDestroyRequest";
import { IRestoreRequest } from "@/types/IRestoreRequest";
import { AxiosInstance } from "axios";
import { useAxios } from "@/services/api";

const generateUUID = () => {
  let
    d = new Date().getTime(),
    d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
};

const getAncestors = (currentNode: INode, allNodes: INode[]): NodeModel[] => {
  let ancestors = [] as NodeModel[];

  if (currentNode.folderId) {
    const parent = allNodes.find((node) => node.id === currentNode.folderId);

    if (parent) {
      ancestors = [ new NodeModel(parent), ...getAncestors(parent, allNodes) ];
    }
  }

  return ancestors;
};

export default class ApiServiceDemo implements ApiServiceInterface {
  axios;

  getNodes = async () => {
    const nodes = await this.axios.get('/data/nodes.json');
    const data = nodes.data.data as INode[];

    return data;
  };

  constructor() {
    this.axios = useAxios();
  }

  private getNodesController: AbortController | undefined;

  async nodes(request: INodesRequest, cancelable?: boolean) {
    console.log('getNodes', request, cancelable);

    if (this.getNodesController && cancelable) {
      this.getNodesController.abort();
    }

    this.getNodesController = new AbortController();

    const nodes = await this.axios.get(
      '/data/nodes.json', {
        signal: cancelable ? this.getNodesController.signal : undefined
      });

    await promiseTimeout(Math.random() * 1000 + 100);

    let data = nodes.data.data as INode[];

    if (!data) {
      return [];
    }

    data.map(item => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.ancestors = getAncestors(item, data);
      return item;
    });

    if (!request.isTrashed) {
      data = data.filter((node) => !node.isTrashed);
    } else {
      data = data.filter((node) => node.isTrashed);
    }

    if (request.isFolder !== undefined) {
      data = data.filter((node) => node.isFolder === request.isFolder);
    }

    if (request.folderId !== undefined) {
      data = data.filter((node) => node.folderId === request.folderId);
    }

    return NodeModel.collection(data);
    // todo: how to get trash
  }

  async folder(request: IFolderRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);

    let data = await this.getNodes();

    data.map(item => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.ancestors = getAncestors(item, data);
    });

    data = data.filter((node) => node.isFolder);
    data = data.filter((node) => node.id === request.id);

    if (data.length) {
      return new NodeModel(data[0]);
    }

    return null;
  }

  async file(request: IFileRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);
    const data = await this.getNodes();

    const files = data.filter((node) => !node.isFolder);
    const filesFiltered = files.filter((node) => node.id === request.id);

    if (filesFiltered.length === 1) {
      const file = filesFiltered[0];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      file.ancestors = getAncestors(file, data);

      return new NodeModel(file);
    }

    return null;
  }

  async upload(request: IUploadRequest) {
    console.log('api - upload', request);

    // const formData = new FormData();
    // if (data) {
    //   Object.keys(data).forEach((key) => {
    //     formData.append(
    //       key,
    //       data[key as keyof UploadCustomRequestOptions['data']]
    //     );
    //   });
    // }
    // formData.append(file.name, file.file as File);
    // axios
    //   .post(action as string, formData, {
    //     withCredentials,
    //     headers,
    //     onUploadProgress: ({ loaded, total }) => {
    //       onProgress({ percent: Math.ceil((loaded / total) * 100) });
    //     }
    //   } as AxiosRequestConfig)
    //   .then((e) => {
    //     message.success(e.data);
    //     onFinish();
    //   })
    //   .catch((error) => {
    //     message.success(error.message);
    //     onError();
    //   });

    return [];
  }

  async download(request: IDownloadRequest) {
    const nodes = await this.getNodes();

    const node = nodes.find((node) => {
      return node.id === request.id;
    });

    if (!node || !node.src) {
      return null;
    } else {
      const response = await this.axios.get(node.src, { responseType: 'blob' });
      return new Blob([ response.data ]);
    }
  }

  async rename(request: IRenameRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);
    const nodes = await this.getNodes();

    const node = nodes.find(item => item.id === request.id);

    if (node) {
      node.name = request.name;
      return new NodeModel(node);
    }

    return null;
  }

  async create(request: ICreateRequest) {
    return new NodeModel({
      name: request.name as string,
      ancestors: [],
      isTrashed: false,
      isFolder: request.type === 'folder',
      mimetype: request.type === 'file' ? 'text/plain' : undefined,
      extension: request.type === 'file' ? 'txt' : undefined,
      size: 0,
      folderId: request.folderId as string,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      authorId: 1,
      id: generateUUID()
    });
  }

  async delete(request: IDeleteRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);
    return true;
  }

  async destroy(request: IDestroyRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);
    return true;
  }

  async restore(request: IRestoreRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);
    return true;
  }

  async move(request: IRestoreRequest) {
    await promiseTimeout(Math.random() * 1000 + 100);
    return true;
  }
}
