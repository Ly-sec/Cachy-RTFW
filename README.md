# Cachy-RTFW Bot

A Discord bot for searching the CachyOS Wiki directly from Discord. This bot allows users to search for articles from the wiki and displays the search results in an embed.

## Features

    Slash command /wiki to search the CachyOS Wiki.
    Command responses are displayed as embeddable messages.
    Dynamically loads commands from the commands directory.
    Simple and modular architecture using discord.js and Puppeteer.

## Prerequisites

Before running the bot, make sure you have the following installed:

    Node.js (>= 16.6.0)
    npm (comes with Node.js)
    A Discord bot token

## Setup
Clone the repository:
    ``` git clone https://github.com/your-username/cachyos-wiki-bot.git cd cachyos-wiki-bot ```

Install the dependencies:
    ``` npm install ```

Create a .env file with the following content:
    ```DISCORD_TOKEN=TOKEN```

Run the bot:
    ``` npm start ```

Your bot should now be online and ready to use in your Discord server.

## Commands
`/wiki`

Search for a term in the CachyOS Wiki. The bot will return the title, an excerpt, and a link to the first result.
Parameters:

    search (required): The search term to look up in the wiki.

## File Structure

    index.js: Main entry point for the bot, starts the client and handles interactions.
    config.json: Configuration file containing your Discord bot token.
    handlers/commandHandler.js: Handles dynamic loading of commands.
    commands/: Folder containing individual command files like wiki.js, ping.js, etc.
    utils/embedUtils.js: Contains utilities for creating embed messages.
