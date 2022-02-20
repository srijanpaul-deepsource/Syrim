/**
 * @file Mute
 * @description Mute a user in the guild
 * @author Spencer-0003
 */

// Import classes & types
import type { User } from 'eris';
import { Constants, Message } from 'eris';
import type { SyrimClient } from '@core/Client';
import type { CommandContext } from '@typings/command';
import { COLORS } from '@utilities/Constants';
import { isSuperior } from '@utilities/ModerationUtilities';
import { Command } from '@core/Command';

// Export class
export class Mute extends Command {
  constructor(client: SyrimClient) {
    super(client, {
      name: 'mute',
      description: 'Mute a user in the guild.',
      category: 'moderation',
      guildOnly: true,
      userPermissions: ['moderateMembers'],
      clientPermissions: ['moderateMembers'],
      options: [
        {
          name: 'user',
          description: 'The user to mute.',
          type: Constants.ApplicationCommandOptionTypes.USER,
          required: true
        },
        {
          name: 'time',
          description: 'The time to mute the user for.',
          type: Constants.ApplicationCommandOptionTypes.NUMBER,
          choices: [
            {
              name: '60 seconds',
              value: 60000
            },
            {
              name: '5 minutes',
              value: 300000
            },
            {
              name: '10 minutes',
              value: 600000
            },
            {
              name: '1 hour',
              value: 3600000
            },
            {
              name: '1 day',
              value: 86400000
            },
            {
              name: '1 week',
              value: 604800000
            }
          ],
          required: true
        },
        {
          name: 'reason',
          description: 'The reason for the mute.',
          type: Constants.ApplicationCommandOptionTypes.STRING
        }
      ]
    });
  }

  validate({ args, data }: CommandContext): [boolean, string] {
    return [args.user !== this.client.user, this.client.locale.translate(data.locale, 'moderation.self.MUTE')];
  }

  async run({ interaction, args, data }: CommandContext): Promise<Message> {
    let guildMember;
    try {
      guildMember = await this.client.getRESTGuildMember(interaction.guildID!, (args.user as User).id);
    } catch {
      return interaction.createFollowup({
        embed: {
          title: this.client.locale.translate(data.locale, 'global.ERROR'),
          description: this.client.locale.translate(data.locale, 'moderation.MEMBER_NOT_IN_GUILD'),
          color: COLORS.RED
        }
      });
    }

    const superior = isSuperior(interaction.member!, guildMember);
    const reason = (args.reason as string) ?? this.client.locale.translate(data.locale, 'moderation.NO_REASON_PROVIDED');

    if (superior) await this.client.editGuildMember(interaction.guildID!, (args.user as User).id, { communicationDisabledUntil: new Date(Date.now() + (args.time as number)) }, reason);
    return interaction.createFollowup({
      embed: {
        title: this.client.locale.translate(data.locale, superior ? 'moderation.SUCCESSFULLY_MUTED' : 'global.ERROR'),
        description: this.client.locale.translate(data.locale, superior ? 'moderation.SUCCESSFULLY_MUTED_DESCRIPTION' : 'moderation.NOT_SUPERIOR').replace('USER', (args.user as User).id),
        color: superior ? COLORS.GREEN : COLORS.RED,
        thumbnail: { url: (args.user as User).avatarURL },
        fields: !superior ? [] : [{ name: this.client.locale.translate(data.locale, 'moderation.REASON'), value: reason }]
      }
    });
  }
}
