import { usePromptStore } from "@/store/prompt";
import isValidFilename from "valid-filename";

export function useMakeFileAction() {
  const promptStore = usePromptStore();

  return {
    show() {

      promptStore.reset();

      promptStore.header = 'Введите название файла';
      promptStore.oldValue = '';
      promptStore.newValue = 'Новый текстовый документ';
      promptStore.show = true;
      promptStore.addon = 'txt';

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

      return promptStore.promiseOnAction();
    }
  };
}
