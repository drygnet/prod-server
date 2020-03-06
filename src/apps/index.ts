import { IApp } from './../models/IApp';
import interntransport from './interntransport';


interface IApps { [name: string]: IApp; }

const apps: IApps = {
  interntransport
};

export default apps;
