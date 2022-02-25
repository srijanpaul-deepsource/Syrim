/**
 * @file Divorce
 * @description Divorce your spouse
 * @author Spencer-0003
 */

// Import classes, types & constants
import type { Message } from 'eris';
import type { SyrimClient } from '@core/Client';
import type { CommandContext } from '@typings/command';
import { COLORS } from '@utilities/Constants';
import { Command } from '@core/Command';

export class Divorce extends Command {
  constructor(client: SyrimClient) {
    super(client, {
      name: 'divorce',
      description: 'Divorce your spouse.',
      category: 'economy',
      guildOnly: true
    });
  }

  async run({ interaction, data }: CommandContext): Promise<Message> {
    const userData = await this.client.database.getUser(interaction.member!.id);

    if (userData.lover) await this.client.database.updateUser(interaction.member!.id, { lover: null });
    return interaction.createFollowup({
      embed: {
        title: this.client.locale.translate(data.locale, userData.lover ? 'economy.DIVORCE' : 'global.ERROR'),
        description: this.client.locale.translate(data.locale, userData.lover ? 'economy.SUCCESSFULLY_DIVORCED' : 'economy.NOT_MARRIED').replace('SPOUSE', userData.lover as string),
        color: userData.lover ? COLORS.GREEN : COLORS.RED
      }
    });
  }
}
