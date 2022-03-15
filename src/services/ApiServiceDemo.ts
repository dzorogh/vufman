import axios from 'axios';
import { ApiServiceInterface } from './ApiServiceInterface';
import { NodesRequest } from "@/types/NodesRequest";
import { FolderRequest } from "@/types/FolderRequest";
import { Node } from "@/types/Node";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { promiseTimeout } from '@vueuse/core';
import { FileRequest } from "@/types/FileRequest";

const getAncestors = (currentNode: Node, allNodes: Node[]): Node[] => {
  let ancestors = [] as Node[];

  if (currentNode.folderId) {
    const parents = allNodes.filter((node) => node.id === currentNode.folderId);

    if (parents.length === 1) {
      const parent = parents[0];

      ancestors = [ parent, ...getAncestors(parent, allNodes) ];
    }
  }

  return ancestors;
};

export default class ApiServiceDemo implements ApiServiceInterface {

  async getNodes(request: NodesRequest) {
    const nodes = await axios.get('/data/nodes.json');
    await promiseTimeout(Math.random() * 1000 + 100);

    let data = nodes.data.data as Node[];

    if (!data) {
      return [];
    }

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

    return data;
    // todo: how to get trash
  }

  async getFolder(request: FolderRequest) {
    const nodes = await axios.get('/data/nodes.json');
    await promiseTimeout(Math.random() * 1000 + 100);

    let data = nodes.data.data as Node[];

    data = data.filter((node) => node.isFolder);
    data = data.filter((node) => node.id === request.id);

    if (data.length) {
      return data[0];
    }

    return null;
  }

  async getFile(request: FileRequest) {
    const nodes = await axios.get('/data/nodes.json');
    await promiseTimeout(Math.random() * 1000 + 100);
    const data = nodes.data.data as Node[];

    const files = data.filter((node) => !node.isFolder);
    const filesFiltered = files.filter((node) => node.id === request.id);

    if (filesFiltered.length === 1) {
      const file = filesFiltered[0];

      file.ancestors = getAncestors(file, data);

      return file;
    }

    return null;
  }
}
