import { usePromptStore } from "@/store/prompt";
import { INodeModel } from "@/types/INodeModel";
import { useApi } from "@/composables/useApi";
import { ITreeNode, makeNavigatorTree } from "@/services/makeNavigatorTree";
import { Home16Filled as IconHome } from "@vicons/fluent";

export function useMoveInteraction() {
  const promptStore = usePromptStore();
  const api = useApi();

  return {
    async show(nodes: INodeModel[]) {
      if (nodes.length < 1) {
        return false;
      }

      promptStore.$reset();

      if (nodes.length > 1) {
        promptStore.header = 'В какую папку переместить файлы/папки?';
      } else if (nodes[0].isFolder) {
        promptStore.header = 'В какую папку переместить папку?';
      } else {
        promptStore.header = 'В какую папку переместить файл?';
      }

      promptStore.type = 'tree';
      promptStore.isLoading = true;
      promptStore.show = true;

      const tree: ITreeNode[] = [
        {
          label: 'Диск',
          key: 'root',
          icon: IconHome
        },
      ];


      const folders = await api.nodes({ isFolder: true });
      tree[0].children = makeNavigatorTree(folders, null);
      promptStore.isLoading = false;

      promptStore.treeNodes = tree;

      promptStore.validateCallback = () => {
        promptStore.errors = [];

        const destinationId = promptStore.newValue;

        if (!destinationId) {
          promptStore.errors.push('Папка не выбрана');
          return false;
        }

        if (destinationId !== 'root') {
          const destinationFolder = folders.find(folder => folder.id === destinationId);

          if (destinationFolder) {
            // console.log('destinationFolder', destinationFolder);

            nodes.forEach((node) => {
              if (node.isFolder) {
                if (destinationFolder.id === node.id) {
                  promptStore.errors.push(`Нельзя поместить папку ${node.name} саму в себя`);
                }

                if (destinationFolder.ancestors) {
                  destinationFolder.ancestors.forEach((destinationAncestor) => {
                    if (destinationAncestor.id === node.id) {
                      promptStore.errors.push(`Нельзя поместить папку ${node.name} в свою под-папку`);
                    }
                  });
                }
              }
            });
          }
        }

        return promptStore.errors.length <= 0;
      };

      return promptStore.promiseOnAction();
    }
  };
}
