import { INode } from "@/types/INode";
import { FileTypes } from "@/config/FileTypes";
import { INodeClass } from "@/types/INodeClass";

export class Node implements INodeClass {

  private node: INode;

  public constructor(node: INode) {
    this.node = node;

    return new Proxy<Node>(this, {
      get: (model, field: keyof INode & keyof Node) => {
        if (field in node) return model.node[field];
        if (field in model) return model[field];
      }
    });
  }

  public static collection(nodes: INode[]) {
    return nodes.map(node => {
      return new Node(node);
    });
  }

  public getFullName() {
    if (this.node.extension) {
      return `${this.node.name}.${this.node.extension}`;
    } else {
      return `${this.node.name}`;
    }
  }

  public getFileType(): keyof typeof FileTypes | null {
    if (!this.node.mimetype) {
      return null;
    }

    let result = null;

    for (const [ type, mimes ] of Object.entries(FileTypes)) {
      if (mimes.includes(this.node.mimetype)) {
        result = type as keyof typeof FileTypes;
      }
    }

    return result;
  }
}
