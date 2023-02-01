import { Markup } from "telegraf";

export function startingButtions() {
  return Markup.keyboard(
    [
      Markup.button.callback('Начать запись', 'startSurvey'),
      Markup.button.callback('Где посмотреть твои фото?', 'showLinks'),
    ],
    {
      columns: 2,
    }
  ).resize()
}

export function clearStartingButtons() {
  return Markup.removeKeyboard()
}