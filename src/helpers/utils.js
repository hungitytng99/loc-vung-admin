export function convertHtmlToMention(str = '') {
    return str.replace(
        /<span class="mention" (.*?)>@(.*?)<\/span>/g,
        '{*mention-$2-mention*}',
    );
}

export function converMentionToHTML(str = '') {
    return str.replace(
        /{\*mention-(.*?)-mention\*}/g,
        '<span class="mention" data-mention="@$1">@$1</span>',
    );
}
