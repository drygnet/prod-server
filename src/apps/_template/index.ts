import { IApp } from './../../models/IApp';
import { templateItem } from './schemas';

const templateApp: IApp = {
  collections: [
    {
      name: 'templateCollection',
      schema: templateItem,
      index: []
    }
  ]
};

export default templateApp;
