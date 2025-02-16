import { SquadServer } from '../SquadJS.js';

export interface PluginOptionSpec {
  required: boolean;
  description: string;
  connector?: string;
  default?: any;
  example?: any;
}

export type PluginOptionsSpec = Record<string, PluginOptionSpec>;

export type PluginOptions = Record<string, any>;

export default class BasePlugin<PluginOptions = {}> {

  static description: string;

  static defaultEnabled: boolean;

  static optionsSpecification: PluginOptionsSpec;

  server: SquadServer;

  options: PluginOptions;

  constructor(server: SquadServer, options: PluginOptions, connectors: Record<string, unknown>);

  prepareToMount(): Promise<void>;

  mount(): Promise<void>;

  unmount(): Promise<void>;

  verbose(...args: any[]): void;

}
