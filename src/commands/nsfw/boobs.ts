/**
 * @file Boobs
 * @description Returns an image of boobs
 * @author Spencer-0003
 */

// Import classes & types
import type { CommandInteraction, Message } from 'eris';
import type { SyrimClient } from '@core/Client';
import { COLORS } from '@utilities/Constants';
import { Command } from '@core/Command';

// Export class
export class Boobs extends Command {
  constructor(client: SyrimClient) {
    super(client, {
      name: 'boobs',
      description: 'Returns an image of boobs.',
      category: 'nsfw'
    });
  }

  async run(interaction: CommandInteraction): Promise<Message> {
    return interaction.createFollowup({
      embeds: [
        {
          color: COLORS.GREEN,
          image: { url: await this.client.nekoBot.get('boobs') }
        }
      ]
    });
  }
}
