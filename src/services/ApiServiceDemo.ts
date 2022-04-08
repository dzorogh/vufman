import { IApiService } from '@/types/IApiService';
import { IRequestNodes } from "@/types/IRequestNodes";
import { IRequestFolder } from "@/types/IRequestFolder";
import { INode } from "@/types/INode";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { promiseTimeout } from '@vueuse/core';
import { IRequestFile } from "@/types/IRequestFile";
import { NodeModel } from "@/models/NodeModel";
import { IRequestUpload } from "@/types/IRequestUpload";
import { IRequestCreate } from "@/types/IRequestCreate";
import { IRequestRename } from "@/types/IRequestRename";
import { IRequestDelete } from "@/types/IRequestDelete";
import { IRequestTrash } from "@/types/IRequestTrash";
import { IRequestUntrash } from "@/types/IRequestUntrash";
import { IRequestPaste } from "@/types/IRequestPaste";
import { IRequestMove } from "@/types/IRequestMove";
import { ApiService } from "@/services/ApiService";
import { generateUUID } from "@/services/generateUUID";
import { IUser } from "@/types/IUser";
import { IRequestLog } from "@/types/IRequestLog";
import { ILogRow } from "@/types/ILogRow";
import { actions } from "@/formatters/actions";
import { isSameDay } from 'date-fns';
import { IRequestSaveContent } from "@/types/IRequestSaveContent";
import { IRequestSaveComment } from "@/types/IRequestSaveComment";
import { IRequestSaveAccess } from "@/types/IRequestSaveAccess";
import { UploadCustomRequestOptions } from "naive-ui";
import { AxiosRequestConfig } from "axios";
import { INodeModel } from "@/types/INodeModel";
import { useAxios } from "@/composables/useAxios";

const getAncestors = (currentNode: INode, allNodes: INode[]): NodeModel[] => {
  let ancestors = [] as NodeModel[];

  if (currentNode.folderId) {
    const parent = allNodes.find((node) => node.id === currentNode.folderId);

    if (parent) {
      ancestors = [ new NodeModel(parent), ...getAncestors(parent, allNodes) ];
    }
  }

  return ancestors;
};

const users: IUser[] = [
  {
    id: 1,
    firstName: 'Super',
    lastName: 'Admin',
    isAdmin: true,
  },
  {
    id: 2,
    firstName: 'User',
    lastName: 'Operator',
    isAdmin: false,
    role: {
      name: 'Оператор',
      id: 'operator'
    }
  },
  {
    id: 3,
    firstName: 'Content',
    lastName: 'Manager',
    isAdmin: false,
    role: {
      name: 'Контент-менеджер',
      id: 'contentManager'
    }
  }
];

const roles = [
  {
    name: 'Контент-менеджер',
    id: 'contentManager'
  },
  {
    name: 'Оператор',
    id: 'operator'
  },
  {
    name: 'Аналитик',
    id: 'analyst'
  }
];

const nodes = [
  {
    "name": "Folder 1",
    "id": "665eba1f-8011-4811-80da-c552df23d3a4",
    "isFolder": true,
    "size": 123,
    "length": 20,
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null,
    "author": {
      "fullName": "Иванов Иван"
    },
    "comment": "http://my-globaldrive.test/fm/folder/665eba1f-8011-4811-80da-c552df23d3a4 \n All sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. "
  },
  {
    "name": "Folder 1-1",
    "id": "89c92111-1872-4c6d-86b7-7593138c9a42",
    "isFolder": true,
    "size": 0,
    "length": 1,
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "665eba1f-8011-4811-80da-c552df23d3a4"
  },
  {
    "name": "Folder 1-1-1",
    "id": "0144d28a-6241-4ace-b5b1-ddad1e0d65d2",
    "isFolder": true,
    "size": 0,
    "length": 0,
    "createdAt": "2019-02-02T03:45:27+00:00",
    "folderId": "89c92111-1872-4c6d-86b7-7593138c9a42"
  },
  {
    "name": "All children like cooked melons in kefir and marmalade",
    "id": "121021fa-b42a-4bdb-b68a-ca5343624b7c",
    "isFolder": true,
    "size": 123412,
    "createdAt": "2019-02-03T03:45:27+00:00",
    "folderId": "665eba1f-8011-4811-80da-c552df23d3a4"
  },
  {
    "name": "Trashed folder 1",
    "id": "0d23e585-c133-4777-8445-d3d77ef18f7a",
    "isFolder": true,
    "size": 123412,
    "createdAt": "2019-02-04T03:45:27+00:00",
    "folderId": null,
    "isTrashed": true
  },
  {
    "name": "Trashed folder 1-1",
    "id": "a992b14b-f181-4d1f-bbc2-db0b9436f73b",
    "isFolder": true,
    "size": 123412,
    "createdAt": "2019-02-05T03:45:27+00:00",
    "folderId": null,
    "isTrashed": true
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "265982ab-a0fc-4d85-9117-93f2bdafa85b",
    "name": "Trashed File 1",
    "extension": "png",
    "size": 1231823019823901,
    "thumbnail": "https://placekitten.com/10/10",
    "src": "https://placekitten.com/1000/300",
    "createdAt": "2019-02-06T03:45:27+00:00",
    "folderId": null,
    "isTrashed": true
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "1b407d6a-4118-4425-b25e-5186790af166",
    "name": "Trashed File in trashed folder 1-1",
    "extension": "png",
    "size": 123313131,
    "thumbnail": "https://placekitten.com/10/10",
    "src": "https://placekitten.com/1000/300",
    "createdAt": "2019-02-07T03:45:27+00:00",
    "folderId": "a992b14b-f181-4d1f-bbc2-db0b9436f73b",
    "isTrashed": true
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "0a914bc0-24e4-4a35-9f06-2ababf911964",
    "name": "Active file is trashed folder 1-1",
    "extension": "png",
    "size": 23123123,
    "thumbnail": "https://placekitten.com/10/10",
    "src": "https://placekitten.com/1000/300",
    "createdAt": "2019-02-08T03:45:27+00:00",
    "folderId": "a992b14b-f181-4d1f-bbc2-db0b9436f73b",
    "isTrashed": true
  },
  {
    "name": "The light of emerging suns is honorable",
    "id": "1df9683b-52f5-4f3a-8e84-eaf8392cccae",
    "isFolder": true,
    "size": 0,
    "createdAt": "2019-02-09T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "text/plain",
    "isFolder": false,
    "id": "580c51b4-3087-475c-b5d8-9d0ff4bb831f",
    "name": "Demo text 1",
    "extension": "txt",
    "size": 100,
    "content": "All sea-dogs endure clear, \nshiny gibbets. All sea-dogs endure clear, shiny gibbets. \nAll sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. ",
    "createdAt": "2019-02-10T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "3bcfbfe9-2bb8-41fc-a16d-169a99084323",
    "name": "Grandis cotta",
    "extension": "png",
    "size": 123182301982390180,
    "thumbnail": "https://placekitten.com/10/10",
    "src": "https://placekitten.com/1000/300",
    "createdAt": "2019-02-11T03:45:27+00:00",
    "folderId": null,
    "comment": "http://my-globaldrive.test/fm/folder/665eba1f-8011-4811-80da-c552df23d3a4 \n All sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. All sea-dogs endure clear, shiny gibbets. "
  },
  {
    "mimetype": "application/pdf",
    "isFolder": false,
    "id": "0a7fabde-5a6e-423d-b8f5-fdf956dc9f36",
    "name": "Sample pdf",
    "extension": "pdf",
    "size": 100,
    "src": "https://filesamples.com/samples/document/pdf/sample3.pdf",
    "createdAt": "2019-02-12T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "application/octet-stream",
    "isFolder": false,
    "id": "7f261095-f48c-4378-9b6f-24ebcf88e0c7",
    "name": "Sample 3gp",
    "extension": "3gp",
    "size": 100,
    "src": "https://filesamples.com/samples/video/3gp/sample_1920x1080.3gp",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "application/octet-stream",
    "isFolder": false,
    "id": "c4484553-7fb5-45d4-b8e5-251fe4e63125",
    "name": "Sample hevc",
    "extension": "hevc",
    "size": 100,
    "src": "https://filesamples.com/samples/video/hevc/sample_3840x2160.hevc",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "video/x-matroska",
    "isFolder": false,
    "id": "77918fce-032d-4d76-a727-270134b24852",
    "name": "Sample mkv",
    "extension": "mkv",
    "size": 100,
    "src": "https://filesamples.com/samples/video/mkv/sample_3840x2160.mkv",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "video/x-msvideo",
    "isFolder": false,
    "id": "23ff5abe-fb19-4b0b-bb8e-90aab41f3015",
    "name": "Sample avi",
    "extension": "avi",
    "size": 100,
    "src": "https://filesamples.com/samples/video/avi/sample_640x360.avi",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null,
    "access": {
      "global": "denied",
      "special": [
        {
          "type": "user",
          "id": 2,
          "access": "write"
        },
        {
          "type": "role",
          "id": "operator",
          "access": "read"
        },
        {
          "type": "role",
          "id": "analyst",
          "access": "denied"
        }
      ]
    }
  },
  {
    "createdAt": "2019-02-01T03:45:27+00:00",
    "extension": "mp4",
    "id": "9ee86aec-0739-422a-9b9e-6f14b470d75f",
    "isFolder": false,
    "mimetype": "video/mp4",
    "name": "Sample mp4 video",
    "size": 5645643456636,
    "src": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "folderId": null
  },
  {
    "mimetype": "application/msword",
    "isFolder": false,
    "id": "0932b73a-57e9-4970-b389-582d2fa52e57",
    "name": "Sample doc file",
    "extension": "doc",
    "size": 593049539,
    "createdAt": "2019-02-01T03:45:27+00:00",
    "src": "https://filesamples.com/samples/document/doc/sample2.doc",
    "folderId": null
  },
  {
    "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "isFolder": false,
    "id": "aba94d14-75aa-402f-b1d3-6983880f0978",
    "name": "Sample docx file",
    "extension": "docx",
    "size": 9040539845093,
    "createdAt": "2019-02-01T03:45:27+00:00",
    "src": "https://filesamples.com/samples/document/docx/sample4.docx",
    "folderId": null
  },
  {
    "mimetype": "audio/mpeg",
    "isFolder": false,
    "id": "3717d273-ca7b-4c18-9089-11f6b3610373",
    "name": "Sample mp3",
    "extension": "mp3",
    "size": 5435,
    "src": "https://download.samplelib.com/mp3/sample-15s.mp3",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "application/epub+zip",
    "isFolder": false,
    "id": "2ce007e2-6c3a-4d31-b953-6e5617c605cf",
    "name": "Sample epub",
    "extension": "epub",
    "size": 5435,
    "src": "https://filesamples.com/samples/ebook/epub/Around%20the%20World%20in%2028%20Languages.epub",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "audio/x-flac",
    "isFolder": false,
    "id": "433355fe-4d9f-4398-a393-cc3c5702a670",
    "name": "Sample flac",
    "extension": "flac",
    "size": 5435,
    "src": "https://filesamples.com/samples/audio/flac/sample3.flac",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "application/x-font-ttf",
    "isFolder": false,
    "id": "28ec07e7-edbe-413c-b586-e8374aaf2344",
    "name": "Sample ttf",
    "extension": "ttf",
    "size": 5435,
    "src": "https://filesamples.com/samples/font/ttf/OpenSans-Regular.ttf",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "text/html",
    "isFolder": false,
    "id": "d087f1ce-0938-41ba-9ae1-d1ae07da1cd7",
    "name": "Sample html",
    "extension": "html",
    "size": 5435,
    "src": "https://filesamples.com/samples/code/html/sample1.html",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/tiff",
    "isFolder": false,
    "id": "8e225f03-5589-4714-8b54-c45ecccb3776",
    "name": "Sample tiff",
    "extension": "tiff",
    "size": 5435,
    "src": "https://filesamples.com/samples/image/tiff/sample_1920%C3%971280.tiff",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "b56363b1-9001-4ef2-abca-5ebc410dcffd",
    "name": "IMAGE 600",
    "extension": "png",
    "size": 4353636,
    "thumbnail": "https://placekitten.com/1000/10",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "src": "https://placekitten.com/600/600",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "589508c4-2da9-4cb6-9097-e6877a19cc09",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "0869af07-6c2d-42c3-9619-d401520039d5",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/1000/1000",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "55a44030-2f48-483a-8255-767c078e46a6",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "b851746f-8727-4807-830a-ee5f23c0176d",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "384b4d08-5330-4fb4-8ef9-2d7db076e1ce",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": null
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "1cf9a9ae-6d7a-40e1-a65a-6d0b721d8f2d",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "86dffa8d-ce40-41db-9a76-ffba1808416a",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "dea3c3ba-d3ee-4f56-b7b6-dc0a2fd2dd46",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "b3240e52-876b-44b8-af78-5ed3b04635ca",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "ac21f820-033b-44c9-bedd-8abbefb67494",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "579b5fcd-d366-4d67-8fb0-97645b884bd2",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  },
  {
    "mimetype": "image/png",
    "isFolder": false,
    "id": "4aa3f7e6-8bf6-47a9-84d8-686bea867c79",
    "name": "demo 2",
    "extension": "png",
    "size": 100000000,
    "thumbnail": "https://placekitten.com/100/100",
    "src": "https://placekitten.com/100/100",
    "createdAt": "2019-02-01T03:45:27+00:00",
    "folderId": "121021fa-b42a-4bdb-b68a-ca5343624b7c"
  }
];

export class ApiServiceDemo extends ApiService implements IApiService {

  private async getNodes() {
    return nodes as unknown as INode[];
  }

  // private getNodesController: AbortController | undefined;

  async nodes(request: IRequestNodes, cancelable?: boolean) {
    console.log('getNodes', request, cancelable);

    // if (this.getNodesController && cancelable) {
    //   this.getNodesController.abort();
    // }

    // this.getNodesController = new AbortController();

    // const nodes = await this.axios.get(
    //   '/data/nodes.json', {
    //     signal: cancelable ? this.getNodesController.signal : undefined
    //   });


    await promiseTimeout(Math.random() * 1000 + 100);

    let data = await this.getNodes();

    if (!data) {
      return [];
    }

    data.map(item => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.ancestors = getAncestors(item, data);
      return item;
    });

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

    return NodeModel.collection(data);
  }

  async folder(request: IRequestFolder) {
    await promiseTimeout(Math.random() * 1000 + 100);

    let data = await this.getNodes();

    data.map(item => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.ancestors = getAncestors(item, data);
    });

    data = data.filter((node) => node.isFolder);
    data = data.filter((node) => node.id === request.id);

    if (data.length) {
      return new NodeModel(data[0]);
    }

    return null;
  }

  async file(request: IRequestFile) {
    await promiseTimeout(Math.random() * 1000 + 100);
    const data = await this.getNodes();

    const files = data.filter((node) => !node.isFolder);
    const filesFiltered = files.filter((node) => node.id === request.id);

    if (filesFiltered.length === 1) {
      const file = filesFiltered[0];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      file.ancestors = getAncestors(file, data);

      return new NodeModel(file);
    }

    return null;
  }

  upload({
           file,
           data,
           headers,
           withCredentials,
           action,
           onFinish,
           onError,
           onProgress
         }: UploadCustomRequestOptions) {

    return new Promise<INodeModel>((resolve, reject) => {
      const formData = new FormData();

      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key as keyof UploadCustomRequestOptions['data']]
          );
        });
      }

      formData.append(file.name, file.file as File);

      console.log('FileUpload FormData', data, formData);

      this.axios
        .post(
          // action as string,
          '/',
          formData,
          {
            withCredentials,
            headers,
            onUploadProgress: ({ loaded, total }) => {
              onProgress({ percent: Math.ceil((loaded / total) * 100) });
            }
          } as AxiosRequestConfig)
        .then((e) => {
          onFinish();
          resolve(this.create({ name: file.name, folderId: null, type: 'file' }));
        })
        .catch((error) => {
          onError();
          reject();
        });
    });

  }

  async rename(request: IRequestRename) {
    await promiseTimeout(Math.random() * 1000 + 100);
    const nodes = await this.getNodes();

    const node = nodes.find(item => item.id === request.id);

    if (node) {
      node.name = request.name;
      return new NodeModel(node);
    }

    return null;
  }

  async saveContent(request: IRequestSaveContent) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = await this.getNodes();

    const node = nodes.find((node) => {
      return node.id === request.id;
    });

    if (node) {
      node.content = request.content;

      return new NodeModel(node);
    }

    return null;
  }

  async saveComment(request: IRequestSaveComment) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = await this.getNodes();

    const node = nodes.find((node) => {
      return node.id === request.id;
    });

    if (node) {
      node.comment = request.comment;

      return new NodeModel(node);
    }

    return null;
  }

  async saveAccess(request: IRequestSaveAccess) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = await this.getNodes();

    const node = nodes.find((node) => {
      return node.id === request.id;
    });

    if (node) {
      node.access = request.access;

      return new NodeModel(node);
    }

    return null;
  }

  async create(request: IRequestCreate) {
    return new NodeModel({
      name: request.name as string,
      ancestors: [],
      isTrashed: false,
      isDeleted: false,
      isFolder: request.type === 'folder',
      mimetype: request.type === 'file' ? 'text/plain' : undefined,
      extension: request.type === 'file' ? 'txt' : undefined,
      size: 0,
      folderId: request.folderId as string,
      createdAt: +(new Date()),
      updatedAt: +(new Date()),
      deletedAt: null,
      trashedAt: null,
      authorId: 1,
      id: generateUUID(),
      canRead: true,
      canWrite: true
    });
  }

  async trash(request: IRequestTrash) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = (await this.getNodes())
      .filter(node => {
        return request.ids.includes(node.id);
      })
      .map(node => {
        node.isTrashed = true;
        return node;
      });

    return NodeModel.collection(nodes);
  }

  async delete(request: IRequestTrash) {
    await promiseTimeout(Math.random() * 1000 + 100);
    return true;
  }

  async untrash(request: IRequestUntrash) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = (await this.getNodes())
      .filter(node => {
        return request.ids.includes(node.id);
      })
      .map(node => {
        node.isTrashed = false;
        return node;
      });

    return NodeModel.collection(nodes);
  }

  async move(request: IRequestMove) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = (await this.getNodes())
      .filter(node => {
        return request.ids.includes(node.id);
      })
      .map(node => {
        node.folderId = request.destinationId || null;
        return node;
      });

    return NodeModel.collection(nodes);
  }

  async paste(request: IRequestPaste) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const nodes = (await this.getNodes())
      .filter(node => {
        return request.ids.includes(node.id);
      })
      .map(node => {
        node.folderId = request.destinationId || null;
        node.id = generateUUID();
        return node;
      });

    return NodeModel.collection(nodes);
  }

  async log(request: IRequestLog) {
    await promiseTimeout(Math.random() * 1000 + 100);

    const node = await this.create({ name: 'тест ', folderId: null, type: 'file' });

    const data = Array(200).fill({}).map((item, index) => {
      const actionsTypes = Object.keys(actions);

      return {
        id: index,
        createdAt: +new Date(+new Date() - index * 10000000),
        user: users[index % users.length],
        node: node,
        action: actionsTypes[index % actionsTypes.length],
      } as ILogRow;
    });

    const filteredData = data.filter((item) => {
      let filtered = true;

      if (request.date) {
        if (!isSameDay(item.createdAt, request.date)) {
          filtered = false;
        }
      }

      if (request.userId) {
        if (request.userId !== item.user.id) {
          filtered = false;
        }
      }

      if (request.action) {
        if (request.action !== item.action) {
          filtered = false;
        }
      }

      if (request.nodeName && item.node && item.node.name) {
        if (item.node.name.search(request.nodeName) < 0) {
          filtered = false;
        }
      }

      return filtered;
    });

    const pagedData = filteredData.slice((request.page - 1) * request.perPage, request.page * request.perPage);

    return {
      data: pagedData,
      meta: {
        current_page: request.page,
        per_page: request.perPage,
        total: filteredData.length
      }
    };
  }

  async emptyTrash() {
    await promiseTimeout(Math.random() * 1000 + 100);
    return true;
  }

  async currentUser() {
    await promiseTimeout(Math.random() * 1000 + 100);

    return {
      id: 1,
      firstName: 'Super',
      lastName: 'Admin',
      isAdmin: true,
    };
  }

  async users() {
    await promiseTimeout(Math.random() * 1000 + 100);

    return users;
  }

  async roles() {
    return roles;
  }
}
