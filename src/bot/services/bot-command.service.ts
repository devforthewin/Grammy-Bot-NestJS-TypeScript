import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';

@Injectable()
export class BotCommandService {
  // Persistent keyboard layout
  private readonly keyboard = {
    reply_markup: {
      keyboard: [[{ text: 'Todo' }, { text: 'Subscribe' }]],
      resize_keyboard: true,
      one_time_keyboard: false,
      input_field_placeholder: 'Select an action',
    },
  };

  register(bot: Bot) {
    // Register bot commands for the Menu button in Telegram
    bot.api.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'menu', description: 'Show the main menu' },
    ]);

    // Handle /start command
    bot.command('start', async (ctx) => {
      await ctx.reply('Welcome! Use the menu below 👇', this.keyboard);
    });

    // Handle /menu command
    bot.command('menu', async (ctx) => {
      await ctx.reply('Opening main menu:', this.keyboard);
    });

    // Handle To-do button click
    bot.hears('Todo', async (ctx) => {
      await ctx.reply('Your to-do list is empty.');
    });

    // Handle Subscribe button click
    bot.hears('Subscribe', async (ctx) => {
      await ctx.reply('You are now subscribed to updates.');
    });
  }
}
