const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

async function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));

        if (command.data instanceof SlashCommandBuilder) {
            try {
                // Register the command dynamically
                const registeredCommand = await client.application.commands.create(command.data);
                console.log(`Registered command: ${registeredCommand.name}`);  // Debugging line
            } catch (error) {
                console.error(`Error registering command ${command.data.name}:`, error);
            }
        } else {
            console.warn(`Invalid command format: ${file}`);
        }
    }
}

module.exports = { loadCommands };
