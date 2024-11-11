const { EmbedBuilder } = require('discord.js');

function createEmbed({ title, description, url, color, footer }) {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setURL(url)
        .setColor(color || '#3498db') // Default color if none provided
        .setFooter({ text: footer || 'CachyOS Wiki Search' });
}

module.exports = { createEmbed };
