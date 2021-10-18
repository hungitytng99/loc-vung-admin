import M from 'moment';
import viLocalization from 'moment/locale/vi';
import i18 from 'languages/index';

export const getLanguage = () => i18.language ?? window.localStorage.i18nextLng;

export function momentLocale(time) {
    const lang = getLanguage();
    switch (lang) {
        case 'vi':
            return M(time).locale('vi', viLocalization);
        default:
            return M(time);
    }
}

export function calculateTextSize(text = 'x', style = { fontSize: '14px', fontWeight: 'normal' }) {
    const container = document.getElementById('calculate-size-text');
    if (container) {
        container.innerText = text;
        for (const key in style) {
            container.style[key] = style[key];
        }
        const height = container.clientHeight + 1;
        const width = container.clientWidth + 1;
        return {
            height,
            width,
        };
    }
    return {
        height: 0,
        width: 0,
    };
}

export function addMonths(date, months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

export function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
}

export function addDays(date, days) {
    date.setDate(date.getDate() + days);
    console.log(date);
    return date;
}

export function toLowerCaseFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toLowerCase() + string.slice(1);
}
