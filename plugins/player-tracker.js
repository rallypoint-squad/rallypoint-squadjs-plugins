import Sequelize from 'sequelize';
import moment from 'moment';

import DiscordBasePlugin from './discord-base-plugin.js';

const { DataTypes, QueryTypes } = Sequelize;

export default class PlayerTracker extends DiscordBasePlugin {
  static get description() {
    return 'The <code>PlayerTracker</code> plugin tracks hours played by players in a period of time and reports the data in a Discord channel.
  }

  static get defaultEnabled() {
    return false;
  }

  static get optionsSpecification() {
    return {
      ...DiscordBasePlugin.optionsSpecification,
      channelID: {
        required: true,
        description: 'The ID of the channel to send the data message to.',
        default: '',
        example: '667741905228136459'
      },
      database: {
        required: true,
        connector: 'sequelize',
        description: 'The Sequelize connector to log player information to.',
        default: 'mysql'
      },
    }
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);

    this.models = {};
    
    this.createModel(
      'Player',
      {
        steamID: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        clanCode: {
          type: DataTypes.STRING
        }
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );

    this.createModel(
      'Playtime',
      {
        date: {
          type: DataTypes.DATEONLY
        },
        minutesPlayed: {
          type: DataTypes.INTEGER
        },
        minutesSeeded: {
          type: DataTypes.INTEGER
        }
      }
    );

    this.updatePlaytime = this.updatePlaytime.bind(this);
  }

  createModel(name, schema) {
    this.models[name] = this.options.database.define(`PlayerTracker_${name}`, schema, {
      timestamps: false
    });
  }

  async prepareToMount() {
    await this.models.Server.sync();
  }

  async mount() {
    // sync whitelister database with `Player` table
    this.interval = setInterval(this.updatePlaytime, 60_000);
  }

  async unmount() {
    clearInterval(this.interval);
  }

  async updatePlaytime() {
    // get list of players on the server and for each try to update `Playtime` table
  }
}