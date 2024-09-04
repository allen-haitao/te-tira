import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../i18n/configs";

// 定义语言代码类型
type LanguageCode = "en" | "mi" | "zh_cn" | "zh_tw";

// 定义语言状态接口
interface LanguageState {
  language: LanguageCode;
  languageList: { name: string; code: string }[];
}

// 初始化语言状态
const initialState: LanguageState = {
  language: "en",
  languageList: [
    { name: "English", code: "en" },
    { name: "Māori", code: "mi" },
    { name: "简体中文", code: "zh_cn" },
    { name: "繁體中文", code: "zh_tw" },
  ],
};

// 创建切片
export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // 更改语言的reducer
    changeLanguage(state, action: PayloadAction<LanguageCode>) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);  
    },
  },
});

// 导出actions
export const { changeLanguage } = languageSlice.actions;

// 导出reducer
export default languageSlice.reducer;