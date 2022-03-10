import axios from 'axios';
import { ApiServiceInterface } from './ApiServiceInterface';

export default class ApiServiceDemo implements ApiServiceInterface {

  async getNavigator() {
    const result = await axios.get('/data/navigator.json');

    return result.data.data;
  }

  async getNodes() {
    const result = await axios.get('/data/nodes.json');
    return result.data.data;
  }

}
