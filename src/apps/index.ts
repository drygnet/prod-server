import { IApp } from './../models/IApp';
import interntransport from './interntransport';
import tvinnaren from './tvinnaren';

interface IApps { [name: string]: IApp; }

const apps: IApps = {
  interntransport,
  tvinnaren
};

export default apps;
