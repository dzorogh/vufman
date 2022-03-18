import axios from 'axios';
import { ApiServiceInterface } from './ApiServiceInterface';
import { INodesRequest } from "@/types/INodesRequest";
import { IFolderRequest } from "@/types/IFolderRequest";
import { INode } from "@/types/INode";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { promiseTimeout } from '@vueuse/core';
import { IFileRequest } from "@/types/IFileRequest";
import { NodeModel } from "@/models/NodeModel";

const getAncestors = (currentNode: INode, allNodes: INode[]): INode[] => {
  let ancestors = [] as INode[];

  if (currentNode.folderId) {
    const parent = allNodes.find((node) => node.id === currentNode.folderId);

    if (parent) {
      ancestors = [ parent, ...getAncestors(parent, allNodes) ];
    }
  }

  return ancestors;
};


export default class ApiServiceDemo implements ApiServiceInterface {

  private getNodesController: AbortController | undefined;

  async getNodes(request: INodesRequest, cancelable?: boolean) {
    console.log('getNodes', request, cancelable);

    if (this.getNodesController && cancelable) {
      this.getNodesController.abort();
    }

    this.getNodesController = new AbortController();

    const nodes = await axios.get(
      '/data/nodes.json', {
        signal: cancelable ? this.getNodesController.signal : undefined
      });

    await promiseTimeout(Math.random() * 1000 + 100);

    let data = nodes.data.data as INode[];

    if (!data) {
      return [];
    }

    data.map(item => {
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

  async getFolder(request: IFolderRequest) {
    const nodes = await axios.get('/data/nodes.json');
    await promiseTimeout(Math.random() * 1000 + 100);

    let data = nodes.data.data as INode[];

    data.map(item => {
      item.ancestors = getAncestors(item, data);
    });

    data = data.filter((node) => node.isFolder);
    data = data.filter((node) => node.id === request.id);

    if (data.length) {
      return new NodeModel(data[0]);
    }

    return null;
  }

  async getFile(request: IFileRequest) {
    const nodes = await axios.get('/data/nodes.json');
    await promiseTimeout(Math.random() * 1000 + 100);
    const data = nodes.data.data as INode[];

    const files = data.filter((node) => !node.isFolder);
    const filesFiltered = files.filter((node) => node.id === request.id);

    if (filesFiltered.length === 1) {
      const file = filesFiltered[0];

      file.ancestors = getAncestors(file, data);

      return new NodeModel(file);
    }

    return null;
  }
}
