import axios from 'axios';
import { ApiServiceInterface } from './ApiServiceInterface';
import { NodesRequest } from "@/types/NodesRequest";
import { FolderRequest } from "@/types/FolderRequest";
import { Node } from "@/types/Node";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { promiseTimeout } from '@vueuse/core';

export default class ApiServiceDemo implements ApiServiceInterface {

  async getNodes(request: NodesRequest) {
    const nodes = await axios.get('/data/nodes.json');
    await promiseTimeout(Math.random() * 1000 + 100);

    let data = nodes.data.data as Node[];

    if (!data) {
      return [];
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

    const data = nodes.data.data as Node[];

    const filtered = data.filter((node) => node.id === request.id);

    if (filtered.length) {
      return filtered[0];
    }

    return null;
  }

}
