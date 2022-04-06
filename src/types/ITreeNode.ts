import { Component } from "vue";
import { makeNavigatorTree } from "@/services/makeNavigatorTree";
import { INodeModel } from "@/types/INodeModel";

export interface ITreeNode {
  label: INodeModel['name'];
  key: INodeModel['id'];
  children?: ReturnType<typeof makeNavigatorTree>;
  icon?: Component;
  ancestorsIds?: Array<INodeModel['id']>;
}
