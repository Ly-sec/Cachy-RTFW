const { Client, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('./handlers/commandHandler');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', async () => {
    try {
        await loadCommands(client);
    } catch (error) {
        console.error('Error loading commands:', error);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    try {
        const command = require(`./commands/${commandName}.js`);
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error handling command ${commandName}:`, error);
        await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);