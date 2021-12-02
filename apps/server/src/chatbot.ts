import tmi from 'tmi.js';

const initChatbot = () => {
  // Define configuration options
  const opts = {
    options: { debug: true },
    identity: {
      username: process.env.TWITCH_BOT_USERNAME,
      password: process.env.TWITCH_BOT_OAUTH_TOKEN,
    },
    channels: [process.env.TWITCH_BOT_USERNAME],
    connection: { reconnect: true, secure: true },
  } as tmi.Options;

  // Create a client with our options
  const client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);

  // Connect to Twitch:
  client.connect();

  return client;

  // Called every time a message comes in
  function onMessageHandler(channel: string, userState: any, message: string, self: any) {
    if (self || !message.startsWith('!')) {
      return;
    } // Ignore messages from the bot

    console.log('debug', userState);
    // Remove whitespace from chat message
    const commandName = message.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
      const num = rollDice();
      client.say(channel, `You rolled a ${num}`);
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
  }

  // Function called when the "dice" command is issued
  function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }

  // Called every time the bot connects to Twitch chat
  function onConnectedHandler(addr: any, port: any) {
    console.log(`* Connected to ${addr}:${port}`);
  }
};

export default initChatbot;
