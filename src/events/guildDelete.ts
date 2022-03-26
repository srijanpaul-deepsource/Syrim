/**
 * @file GuildDelete
 * @description Log guild laves
 * @author Spencer-0003
 */

// Import classes, types & constants
import type { Guild } from 'eris';
import { Event } from '@core/Event';
import { COLORS } from '@utilities/Constants';

// Export class
export class GuildDelete extends Event {
  async run(guild: Guild): Promise<void> {
    if (await this.client.database.getBlacklist(guild.id)) return;

    const webhook = await this.client.getOrCreateWebhook(process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_LOGS : process.env.LEFT_GUILD_LOGS);
    this.client.executeWebhook(webhook.id, webhook.token!, {
      embed: {
        title: 'Left a Guild',
        color: COLORS.RED,
        thumbnail: { url: guild.iconURL ?? 'https://better-default-discord.netlify.app/Icons/Gradient-Red.png' },
        fields: [
          { name: 'Name', value: guild.name, inline: true },
          { name: 'ID', value: guild.id, inline: true },
          { name: 'Owner', value: `<@${guild.ownerID}>`, inline: true }
        ],
        footer: { text: `Total guilds: ${(await this.client.getRESTGuilds()).length}` }
      }
    });
  }
}
