import { createI18n } from "vue-i18n";

export const i18n = createI18n({
    legacy: false,
    locale: "en", // 默认语言为英文
    messages: {
        en: {
            hello: "Hello World", // 英文
        },
        zh: {
            hello: "你好", // 中文
        },
        ja: {
            hello: "こんにちは", // 日文
        },
    },
});