import BasePlugin from './base-plugin.js';
import { Channel } from 'discord.js';

export default class DiscordBasePlugin extends BasePlugin {
    
    channel: Channel;

    sendDiscordMessage(message: unknown): Promise<void>;

}
