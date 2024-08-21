import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
  language: "en" | "mi" | "zh_cn" | "zh_tw"
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "en",
  languageList: [
    { name: "English", code: "en" },
    { name: "Māori", code: "mi" },
    { name: "简体中文", code: "zh_cn" },
    { name: "繁體中文", code: "zh_tw" },
  ],
};

export default (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload); // 这样处理是不标准的，有副作用
      return { ...state, language: action.payload };
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};