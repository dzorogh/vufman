import { INode } from "@/types/INode";
import { fileTypes } from "@/config/fileTypes";
import { INodeModel } from "@/types/INodeModel";
import filesize from "filesize";
import { formatTimestamp } from "@/formatters/formatTimestamp";
import { useNodesActions } from "@/composables/useNodesActions";

export class NodeModel implements INodeModel {

  private node: INode;

  public constructor(node: INode) {
    this.node = node;

    if (typeof node !== 'object') {
      return node;
    }

    return new Proxy<NodeModel>(this, {
      get: (target, field: keyof INode & keyof NodeModel) => {
        if (field in node) return target.node[field];
        if (field in target) return target[field];

        if (field === 'ancestors') {
          return target.node.ancestors ? NodeModel.collection(target.node.ancestors) : [];
        }

        if (field === 'children') {
          return target.node.children ? NodeModel.collection(target.node.children) : [];
        }
      },
      set: (target, property: keyof INode, value: never) => {
        target.node[property] = value;

        return true;
      }
    });
  }

  public static collection(nodes: INode[]) {
    if (Array.isArray(nodes) && nodes.length > 0) {
      return nodes.map(node => {
        return new NodeModel(node);
      });
    } else {
      return [];
    }
  }

  public getFullName() {
    if (this.node.extension) {
      return `${this.node.name}.${this.node.extension}`;
    } else {
      return `${this.node.name}`;
    }
  }

  public getFileType(): keyof typeof fileTypes | null {
    if (!this.node.mimetype && !this.node.extension) {
      return null;
    }

    let result: keyof typeof fileTypes | null = null;

    for (const [ type, mimes ] of Object.entries(fileTypes)) {
      if (this.node.mimetype && mimes.includes(this.node.mimetype)) {
        result = type as keyof typeof fileTypes;
      }

      if (this.node.extension && mimes.includes(this.node.extension)) {
        result = type as keyof typeof fileTypes;
      }
    }

    return result;
  }

  public download() {
    const nodeActions = useNodesActions();

    nodeActions.download(this);
  }

  public getSize() {
    return filesize(this.node.size || 0, { locale: 'ru-RU' });
  }

  public getPath() {
    let path = '';
    path += 'Диск';

    if (this.node.ancestors) {
      this.node.ancestors.forEach((ancestor) => {
        path += '/' + ancestor.name;
      });
    }

    return path;
  }

  public getParentRoute() {
    if (this.node.folderId) {
      return { name: 'folder', params: { folderId: this.node.folderId } };
    } else {
      if (this.node.isTrashed) {
        return { name: 'trash' };
      } else {
        return { name: 'root' };
      }
    }
  }

  public getParentName() {
    if (this.node.folderId && this.node.ancestors && this.node.ancestors[this.node.ancestors.length - 1]) {
      return this.node.ancestors[this.node.ancestors.length - 1].name;
    } else {
      if (this.node.isTrashed) {
        return 'Корзина';
      } else {
        return 'Диск';
      }
    }
  }

  public getCreatedAt() {
    if (this.node.createdAt) {
      return formatTimestamp(this.node.createdAt);
    } else {
      return "";
    }
  }

  public getUpdatedAt() {
    if (this.node.updatedAt) {
      return formatTimestamp(this.node.updatedAt);
    } else {
      return "";
    }
  }

  public getTrashedAt() {
    if (this.node.trashedAt) {
      return formatTimestamp(this.node.trashedAt);
    } else {
      return "";
    }
  }

  public getDeletedAt() {
    if (this.node.deletedAt) {
      return formatTimestamp(this.node.deletedAt);
    } else {
      return "";
    }
  }
}
