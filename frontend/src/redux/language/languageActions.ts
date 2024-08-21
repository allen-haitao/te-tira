export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "en" | "mi" | "zh_cn" | "zh_tw";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (
  languageCode: "en" | "mi" | "zh_cn" | "zh_tw"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};

export const addLanguageActionCreator = (
  name: string,
  code: string
): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};