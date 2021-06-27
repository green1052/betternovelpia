const texts = ``;

const list: string[] = [];

texts.split("\n").forEach(text => {
    if (text.startsWith("https"))
        list.push(text);
});

console.dir(list, {"maxArrayLength": undefined});