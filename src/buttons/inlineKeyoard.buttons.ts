import { Markup } from 'telegraf';


export function linksInlineButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.url('VK', 'https://vk.com/prodbydisorderr'),
      Markup.button.url('Telegram', 'https://t.me/stockdisorderr'),
      Markup.button.url('Bechance', 'https://www.behance.net/vladislav_igorevich'),
      Markup.button.url('YouTube', 'https://www.youtube.com/channel/UCv1MjXwjZ-wPzOVWahrf7Uw'),
    ],
    {
      columns: 1,
    },
  );
}

export function messaeToAllInlineButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Все верно!', 'allIsGood'),
      Markup.button.callback('Лучше перепишу...', 'writeAgain'),
    ],
    {
      columns: 1,
    },
  );
}
