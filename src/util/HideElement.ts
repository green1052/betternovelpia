export function hideElement(jquery: JQuery<HTMLElement>) {
    jquery
        .removeAttr("class")
        .removeAttr("style")
        .css("margin", "15px")
        .empty();
}