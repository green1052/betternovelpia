const texts = ``;

const emojiList = [];

for (const string of texts.split("\n")) {
    if (string.startsWith("https"))
        emojiList.push(string);
}

console.dir(emojiList, {"maxArrayLength": null});