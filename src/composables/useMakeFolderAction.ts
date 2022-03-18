import { usePromptStore } from "@/store/prompt";
import isValidFilename from "valid-filename";
import { INodeModel } from "@/types/INodeModel";

export function useRenameAction() {
  const promptStore = usePromptStore();

  return {
    show() {

      promptStore.reset();

      promptStore.header = 'Введите название папки';
      promptStore.oldValue = '';
      promptStore.newValue = 'Новая папка';
      promptStore.show = true;

      promptStore.validateCallback = () => {
        promptStore.errors = [];

        if (promptStore.newValue.length <= 0) {
          promptStore.errors.push('Название обязательно');
          return false;
        }

        if (!isValidFilename(promptStore.newValue)) {
          promptStore.errors.push('Название должно быть настоящим названием папки');
        }

        return promptStore.errors.length <= 0;
      };

      return promptStore.promiseOnAction();
    }
  };
}
