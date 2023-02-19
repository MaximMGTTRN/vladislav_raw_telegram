export const BUTTONS_TEXT = {
  START_SURVEY: 'Начать запись',
  SHOW_LINKS: 'Где посмотреть твои фото?',
  CONTINUE_SURVEY: 'Да, давай продолжим!',
  RELOAD_SURVEY: 'Нет, начнем с чистого листа!',
  LEVAE_SURVEY: 'Думаю мне надо еще подумать над заявкой...',
  FINISH_SURVEY: 'Отлично, это все про меня!',
  FINISH_RELOAD_SURVEY: 'Что то все перепуталось, попробуем еще раз',
  GET_SURVEYS_ADMIN: 'Получить анкеты',
  SEND_MESSAGE_ADMIN: 'Отправить всем собщение',
  TO_MAIN_MENU_ADMIN: 'Вернуться',

};

export const SURVEY_SCENE_REPLIES = {
  START_NEW_SURVEY_REPLY: 'Давай начнем! Как к тебе обращаться?',
  DO_YOU_LIKE_CONTINUE_SURVEY_REPLY: 'Вижу ты уже начинал заполнять анкету, хочешь продолжить?',
  SEE_YOU_LATER: 'Надеюсь еще увидимся!',
  FINISH_SURVEY_REPLY: 'Ну вот и славно, совсем скоро я увижу твою анкету и обязательно дам обратную связь! А пока можешь глянуть чем я занимался в последнее время',
  SURVEY_PROBLEM_REPLY: 'Возникли трудности, попробуйте начать заново...',
  STAGE_1_REPLY: (userName) => `${userName}, приятно познакомиться, сколько тебе лет?`,
  STAGE_2_REPLY: 'Супер, что на счет локации? В каком городе хочешь пофоткаться?',
  STAGE_2_WARNING_REPLY: 'Пожалуйста напиши свой реальный возраст числом',
  STAGE_3_REPLY: 'Крутое местечко! Может у тебя есть предпочтения по стилистке фотосъемки?',
  STAGE_4_REPLY: 'Слушай, а у тебя крутые идеи! Может оставшь ссылку на свои соцсети?',
  STAGE_5_REPLY: 'Обязательно к тебе загляну, если хочешь что то уточнить, самое время:',
  STAGE_6_REPLY: 'Примем к сведению. А пока давай глянем на результат:',
  CONTINUE_CHECK_REPLY: (userName) => `${userName},на чем мы там остановились, дай проверю...`,
  STAGE_2_CONTINUE_REPLY: 'Сколько тебе лет?',
  STAGE_3_CONTINUE_REPLY: 'Что на счет твоего местоположеня?',
  STAGE_4_CONTINUE_REPLY: 'Есть ли у тебя предпочтения по фотосъемке?',
  STAGE_5_CONTINUE_REPLY: 'Может оставшь ссылку на свои соцсети?',
  STAGE_6_CONTINUE_REPLY: 'Если есть что добавить, то cамое время:',
  STAGE_7_CONTINUE_REPLY: 'У тебя уже все заполненно! Проверяй:',
};

export const STARTING_REPLIES = {
  GREET_NEW_USER: (userName) => `${userName}, рад приветствовать тебя!`,
  GREET_OLD_USER: (userName) => `${userName}, давно не виделись, рад снова тебя приветствовать!`,
};

export const ADMIN_COMMAND = {
  EXPORT_FILE_NAME: (dateToday) => `Анкеты_за_${dateToday}.xlsx`,
};
