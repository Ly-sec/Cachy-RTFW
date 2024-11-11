const { SlashCommandBuilder } = require('discord.js');
const { scrapeFirstSearchResult } = require('../scrapers/wikiScraper');
const { createEmbed } = require('../utils/embedUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Search the CachyOS Wiki')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('The search term')
                .setRequired(true)
        ),
    async execute(interaction) {
        const searchTerm = interaction.options.getString('search');
        const result = await scrapeFirstSearchResult(searchTerm);

        if (result) {
            const embed = createEmbed({
                title: result.title,
                url: `https://wiki.cachyos.org${result.link}`,
                description: result.excerpt || 'No excerpt available.',
                color: '#3498db',
                footer: 'CachyOS Wiki Search'
            });
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply('No valid result found for that search term.');
        }
    }
};
