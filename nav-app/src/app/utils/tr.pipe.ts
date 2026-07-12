import { Pipe, PipeTransform } from '@angular/core';
import { I18N } from './i18n';

// Язык эндпоинта берётся из <html lang="...">: скрипт раскладки эндпоинтов
// (build-langs.sh) патчит его в копиях dist (/navigator/ -> ru, /en/, /uk/).
// Английский — язык исходных строк, для него словарь не нужен.
const LANG: string = (typeof document !== 'undefined' && document.documentElement.lang) || 'en';

/** Перевод строки интерфейса для использования из кода компонентов. */
export function tr(value: string): string {
    if (LANG === 'en' || !value) return value;
    const entry = I18N[value];
    return (entry && entry[LANG]) || value;
}

@Pipe({ name: 'tr', standalone: true })
export class TrPipe implements PipeTransform {
    transform(value: string): string {
        return tr(value);
    }
}
