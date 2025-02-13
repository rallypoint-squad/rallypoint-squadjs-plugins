import DiscordSeedCall from '../plugins/discord-seed-call.js';

describe('discord-seed-call.js', () => {

  function createPlugin(playerCount) {
    return new DiscordSeedCall({
      playerCount,
    }, {
      channelID: '42',
      time: '???',
      message: 'SEEDED MESSAGE'
    }, {
      discord: {
        channels: {
          fetch: () => 'FOOBAR',
        }
      }
    })
  }


  it('sends message when not yet seeded', () => {

  });

  it('does not send message when already seeded', () => {

  });

});
