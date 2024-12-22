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

    this.changeLayer = this.changeLayer.bind(this);
    this.setNextLayer = this.setNextLayer.bind(this);
  }

  async mount() {
    this.server.on('PLAYER_CONNECTED', this.changeLayer);
  }

  async unmount() {
    this.server.removeEventListener('PLAYER_CONNECTED', this.changeLayer);

    clearTimeout(this.setNextLayerTimeout);
  }

  async changeLayer() {
    let newSeedingLayer = this.getRandom(this.options.seedingLayers);
    
    if (newSeedingLayer && this.isGameModeSeed() && this.isOnlyOnePlayerOnTheServer()) {
      this.verbose(1, 'Setting current layer to ' + newSeedingLayer);
      await this.server.rcon.execute(`AdminChangeLayer ${newSeedingLayer}`);
      
      this.setNextLayerTimeout = setTimeout(this.setNextLayer, 5 * 60 * 1000);

      this.server.removeEventListener('PLAYER_CONNECTED', this.changeLayer);
    }
  }

  async setNextLayer() {
    let newAfterSeedingLayer = this.getRandom(this.options.afterSeedingLayers);
      
    if (this.isGameModeSeed() && newAfterSeedingLayer) {
      this.verbose(1, 'Setting next layer to ' + newAfterSeedingLayer);
      await this.server.rcon.execute(`AdminSetNextLayer ${newAfterSeedingLayer}`);
    }
  }

  getRandom(array) {
    return Array.isArray(array)
      ? array[Math.floor(Math.random() * array.length)]
      : undefined;
  }
    
  isGameModeSeed() {
    if (this.server.currentLayer?.gamemode !== "Seed") {
      this.verbose(1, 'Current layer is not seed');
      return false;
    }
      
    return true;
  }
    
  isOnlyOnePlayerOnTheServer() {
    if (this.server.playerCount <= 1) {
      this.verbose(1, 'There are multiple players on the server');
      return false;
    }
      
    return true;
  }
}