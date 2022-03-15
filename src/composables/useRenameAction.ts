import { Node } from "@/types/Node";
import { usePromptStore } from "@/store/prompt";
import isValidFilename from "valid-filename";
import { INodeClass } from "@/types/INodeClass";

export function useRenameAction() {
  const promptStore = usePromptStore();

  return {
    show(node: INodeClass) {

      promptStore.errors = [];
      promptStore.header = 'Введите новое название';
      promptStore.oldValue = node.name;
      promptStore.newValue = node.name;
      promptStore.show = true;

      if (node.extension) {
        promptStore.addon = `.${node.extension}`;
      } else {
        promptStore.addon = null;
      }

      /*if (nodes.length > 1) {
        confirmStore.content = 'Удалить файлы/папки?';

        confirmStore.list = nodes.map(item => {
          return item.extension ? `${item.name}.${item.extension}` : item.name;
        });
      } else {
        confirmStore.content =
          (nodes[0].isFolder ? `Удалить папку ` : `Удалить файл `)
          + `«` + (nodes[0].extension ? `${nodes[0].name}.${nodes[0].extension}` : nodes[0].name) + `»?`;

        confirmStore.list = [];
      }

      confirmStore.show = true;*/

      promptStore.validateCallback = () => {
        promptStore.errors = [];

        if (promptStore.newValue.length <= 0) {
          promptStore.errors.push('Название обязательно');
          return false;
        }

        if (!isValidFilename(promptStore.newValue)) {
          promptStore.errors.push('Название должно быть настоящим названием файла');
        }

        return promptStore.errors.length <= 0;
      };

      return new Promise<string | false>((resolve) => {
        const unsubscribe = promptStore.$onAction(({ name, after }) => {
          after(() => {
            if (name === 'cancel') {
              resolve(false);
              unsubscribe();
            }

            if (name === 'save') {
              resolve(promptStore.newValue);
              unsubscribe();
            }
          });
        });
      });
    }
  };
}
