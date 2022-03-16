import { INode } from "@/types/INode";
import { FileTypes } from "@/config/FileTypes";
import { INodeModel } from "@/types/INodeModel";
import filesize from "filesize";

export class NodeModel implements INodeModel {

  private node: INode;

  public constructor(node: INode) {
    this.node = node;

    return new Proxy<NodeModel>(this, {
      get: (model, field: keyof INode & keyof NodeModel) => {
        if (field in node) return model.node[field];
        if (field in model) return model[field];
      }
    });
  }

  public static collection(nodes: INode[]) {
    return nodes.map(node => {
      return new NodeModel(node);
    });
  }

  public getFullName() {
    if (this.node.extension) {
      return `${this.node.name}.${this.node.extension}`;
    } else {
      return `${this.node.name}`;
    }
  }

  public getFileType(): string {
    if (!this.node.mimetype && !this.node.extension) {
      return '';
    }

    let result = '';

    for (const [ type, mimes ] of Object.entries(FileTypes)) {
      if (this.node.mimetype && mimes.includes(this.node.mimetype)) {
        result = type;
      }

      if (this.node.extension && mimes.includes(this.node.extension)) {
        result = type;
      }
    }

    return result;
  }

  public download() {
    alert('download file');
  }

  public getSize() {
    return filesize(this.node.size || 0, { locale: 'ru-RU' });
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
    if (this.node.folderId && this.node.ancestors[0]) {
      return this.node.ancestors[0].name;
    } else {
      if (this.node.isTrashed) {
        return 'Корзина';
      } else {
        return 'Диск';
      }
    }
  }
}
