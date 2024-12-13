import BasePlugin from './base-plugin.js';

export default class SeedMapSetter extends BasePlugin {
  static get description() {
    return 'The <code>SeedMapSetter</code> plugin can be used to automate setting seeding map and the map being played after the seeding ends.';
  }

  static get defaultEnabled() {
    return false;
  }

  static get optionsSpecification() {
    return {
      seedingLayers: {
        required: false,
        description: 'Seeding layers from which one will be set randomly with <AdminChangeLayer> command.',
        default: []
      },
      afterSeedingLayers: {
        required: false,
        description: 'Layers from which one will be set randomly with <AdminSetNextLayer> command.',
        default: []
      }
    };
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);
  }

  async mount() {
    if (!this.canSetCurrentAndNext()){
      return;
    }

    let newSeedingLayer = this.getRandom(this.options.seedingLayers);
    if (newSeedingLayer !== undefined) {
      await this.changeLayer(newSeedingLayer);
    }

    let newAfterSeedingLayer = this.getRandom(this.options.afterSeedingLayers);
    if (newAfterSeedingLayer !== undefined){
      await this.setNextLayer(newAfterSeedingLayer);
    }
  }

  async unmount() {
    ;
  }

  canSetCurrentAndNext() {
    return this.server.currentLayer !== null
      && this.server.currentLayer.gamemode
      && this.server.currentLayer.gamemode.localeCompare('seed', 'en', { sensitivity: 'base' })
      && this.server.nextLayer === null 
      && this.server.playerCount === 0;
  }

  getRandom(array) {
    return Array.isArray(array)
      ? array[Math.floor(Math.random() * array.length)]
      : undefined;
  }

  async changeLayer(layer) {
    await this.server.rcon.execute(`AdminChangeLayer ${layer}`);
  }

  async setNextLayer(layer) {
    await this.server.rcon.execute(`AdminSetNextLayer ${layer}`);
  }
}