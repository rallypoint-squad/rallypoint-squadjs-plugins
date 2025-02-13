import Logger from 'core/logger';
import { OptionsSpec, PluginClass } from '../types.js';

export default class BasePlugin {

  server: any;

  options: Record<string, any>;

  rawOptions: Record<string, any>;

  constructor(server, options, connectors) {
    this.server = server;
    this.options = {};
    this.rawOptions = options;

    const pluginClass = this.constructor as unknown as PluginClass;

    for (const [optionName, option] of Object.entries(pluginClass.optionsSpecification)) {
      if (option.connector) {
        this.options[optionName] = connectors[this.rawOptions[optionName]];
      } else {
        if (option.required) {
          if (!(optionName in this.rawOptions))
            throw new Error(`${this.constructor.name}: ${optionName} is required but missing.`);
          if (option.default === this.rawOptions[optionName])
            throw new Error(
              `${this.constructor.name}: ${optionName} is required but is the default value.`
            );
        }

        this.options[optionName] =
          typeof this.rawOptions[optionName] !== 'undefined'
            ? this.rawOptions[optionName]
            : option.default;
      }
    }
  }

  async prepareToMount() {}

  async mount() {}

  async unmount() {}

  static get description(): string {
    throw new Error('Plugin missing "static get description()" method.');
  }

  static get defaultEnabled(): boolean {
    throw new Error('Plugin missing "static get defaultEnabled()" method.');
  }

  static get optionsSpecification(): OptionsSpec {
    throw new Error('Plugin missing "static get optionSpecification()" method.');
  }

  verbose(...args) {
    Logger.verbose(this.constructor.name, ...args);
  }
}
