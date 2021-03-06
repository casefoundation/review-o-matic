export const ACTION = {
  USER: {
    LOGIN: 'USER_LOGIN',
    LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    LOGOUT: 'USER_LOGOUT',
    DETAILS: 'USER_DETAILS',
    FAVORITES: 'USER_FAVORITES',
    ADD_FAVORITE: 'USER_ADD_FAVORITE',
    DELETE_FAVORITE: 'USER_DELETE_FAVORITE',
    SET_NEEDS_PASSWORD_RESET: 'USER_SET_NEEDS_PASSWORD_RESET'
  },
  USERS: {
    SET: 'USERS_SET',
    SET_USER_PROP: 'USERS_SET_PROP',
    SET_NOTIFICATION_PREFERENCE: 'USERS_SET_NOTIFICATION_PREFERENCE'
  },
  MESSAGE: {
    SET: 'MESSAGE_SET',
    CLEAR: 'MESSAGE_CLEAR'
  },
  SUBMISSIONS: {
    SET: 'SUBMISSIONS_SET',
    SET_SORT: 'SUBMISSIONS_SET_SORT',
    SET_SEARCH: 'SUBMISSIONS_SET_SEARCH',
    TOGGLE_FLAGGED: 'SUBMISSIONS_TOGGLE_FLAGGED',
    TOGGLE_PINNED: 'SUBMISSIONS_TOGGLE_PINNED',
    CLEAR_AUTO_FLAGGED: 'SUBMISSIONS_CLEAR_AUTO_FLAGGED'
  },
  REVIEWS: {
    SET: 'REVIEWS_SET',
    REMOVE: 'REVIEWS_REMOVE',
    SET_PROMPT_VALUE: 'REVIEWS_SET_PROMPT_VALUE',
    SET_CATEGORY_VALUE: 'REVIEWS_SET_CATEGORY_VALUE',
    SET_SCORE: 'REVIEWS_SET_SCORE',
    SET_FLAGGED: 'REVIEWS_SET_FLAGGED',
    INVALIDATE: 'REVIEWS_INVALIDATE',
    VALIDATE: 'REVIEWS_VALIDATE'
  },
  CONFIG: {
    'SET': 'CONFIG_SET',
    'SET_TEMP': 'CONFIG_SET_TEMP',
    'ADD_TEMP_CONFIG_PROMPT': 'CONFIG_ADD_TEMP_CONFIG_PROMPT',
    'ADD_TEMP_CONFIG_PROMPT_LABEL': 'CONFIG_ADD_TEMP_CONFIG_PROMPT_LABEL',
    'REMOVE_TEMP_CONFIG_PROMPT': 'CONFIG_REMOVE_TEMP_CONFIG_PROMPT',
    'REMOVE_TEMP_CONFIG_PROMPT_LABEL': 'CONFIG_REMOVE_TEMP_CONFIG_PROMPT_LABEL',
    'SET_TEMP_CONFIG_PROMPT_TEXT': 'CONFIG_SET_TEMP_CONFIG_PROMPT_TEXT',
    'SET_TEMP_CONFIG_PROMPT_LABEL_TEXT': 'CONFIG_SET_TEMP_CONFIG_PROMPT_LABEL_TEXT',
    'ADD_TEMP_CONFIG_CATEGORY': 'CONFIG_ADD_TEMP_CONFIG_CATEGORY',
    'ADD_TEMP_CONFIG_CATEGORY_LABEL': 'CONFIG_ADD_TEMP_CONFIG_CATEGORY_LABEL',
    'REMOVE_TEMP_CONFIG_CATEGORY': 'CONFIG_REMOVE_TEMP_CONFIG_CATEGORY',
    'REMOVE_TEMP_CONFIG_CATEGORY_LABEL': 'CONFIG_REMOVE_TEMP_CONFIG_CATEGORY_LABEL',
    'SET_TEMP_CONFIG_CATEGORY_TEXT': 'CONFIG_SET_TEMP_CONFIG_CATEGORY_TEXT',
    'SET_TEMP_CONFIG_CATEGORY_LABEL_TEXT': 'CONFIG_SET_TEMP_CONFIG_CATEGORY_LABEL_TEXT',
    'SET_TEMP_CONFIG_IMPORT_PAUSE_START': 'CONFIG_SET_TEMP_CONFIG_IMPORT_PAUSE_START',
    'SET_TEMP_CONFIG_IMPORT_PAUSE_LENGTH': 'CONFIG_SET_TEMP_CONFIG_IMPORT_PAUSE_LENGTH',
    'REMOVE_TEMP_CONFIG_IMPORT_PAUSE': 'CONFIG_SET_REMOVE_TEMP_CONFIG_IMPORT_PAUSE',
    'ADD_NEW_TEMP_CONFIG_IMPORT_PAUSE': 'CONFIG_SET_ADD_NEW_TEMP_CONFIG_IMPORT_PAUSE'
  },
  NOTIFICATIONS: {
    'SET': 'NOTIFICATIONS_SET'
  },
  IMPORTER: {
    'SET_EMBARGOED': 'IMPORTER_SET_EMBARGOED',
    'SET_IMPORTS': 'IMPORTER_SET_IMPORTS'
  }
}
