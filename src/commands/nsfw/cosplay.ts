/**
 * @file Cosplay
 * @description Returns an image of an NSFW cosplay
 * @author Spencer-0003
 */

// Import classes & types
import type { CommandInteraction, Message } from 'eris';
import type { SyrimClient } from '@core/Client';
import type { Data } from '@typings/command';
import { COLORS } from '@utilities/Constants';
import { Command } from '@core/Command';

// Export class
export class Cosplay extends Command {
  constructor(client: SyrimClient) {
    super(client, {
      name: 'cosplay',
      description: 'Returns an image of an NSFW cosplay.',
      category: 'nsfw'
    });
  }

  async run(interaction: CommandInteraction, _args: Record<string, string>, data: Data): Promise<Message> {
    return interaction.createFollowup({
      embed: {
        color: COLORS.GREEN,
        image: { url: await this.client.nekoBot.get('cosplay') },
        footer: { icon_url: 'https://nekobot.xyz/favicon.ico', text: this.client.locale.translate(data.locale, 'misc.POWERED_BY_NEKOBOT') }
      }
    });
  }
}
