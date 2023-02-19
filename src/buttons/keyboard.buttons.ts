import { BUTTONS_TEXT } from 'src/consts/dictionary.const';
import { Markup } from 'telegraf';


const {
  START_SURVEY,
  SHOW_LINKS,
  CONTINUE_SURVEY,
  RELOAD_SURVEY,
  LEVAE_SURVEY,
  FINISH_SURVEY,
  FINISH_RELOAD_SURVEY,
  GET_SURVEYS_ADMIN,
  SEND_MESSAGE_ADMIN,
  TO_MAIN_MENU_ADMIN,
} = BUTTONS_TEXT;

export function startingButtions() {
  return Markup.keyboard(
    [
      Markup.button.callback(START_SURVEY, 'startSurvey'),
      Markup.button.callback(SHOW_LINKS, 'showLinks'),
    ],
    {
      columns: 2,
    },
  ).resize();
}

export function surveyStartButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(CONTINUE_SURVEY, 'continueSurvey'),
      Markup.button.callback(RELOAD_SURVEY, 'reloadSurvey'),
    ],
    {
      columns: 2,
    },
  ).resize();
}

export function surveyStageButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(LEVAE_SURVEY, 'leaveSurvey'),
    ],
    {
      columns: 2,
    },
  ).resize();
}

export function surveyFinalButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(FINISH_SURVEY, 'finishSurvey'),
      Markup.button.callback(FINISH_RELOAD_SURVEY, 'finishReloadSurvey'),
      Markup.button.callback(LEVAE_SURVEY, 'leaveSurvey'),
    ],
  ).resize();
}

export function adminButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(GET_SURVEYS_ADMIN, 'getSurveysAdmin'),
      Markup.button.callback(SEND_MESSAGE_ADMIN, 'sendMessageAdmin'),
      Markup.button.callback(TO_MAIN_MENU_ADMIN, 'leaveAdmin'),
    ],
    {
      columns: 2,
    },
  ).resize();
}


export function clearButtons() {
  return Markup.removeKeyboard();
}
