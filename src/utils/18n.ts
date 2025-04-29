import { createI18n } from "vue-i18n";

export const i18n = createI18n({
    legacy: false,
    locale: "en", // 默认语言为英文
    messages: {
        en: {
            projects: "PROJECTS", // 英文
        },
        zh: {
            projects: "项目", // 中文
        },
        ja: {
            projects: "こんにちは", // 日文
        },
    },
});