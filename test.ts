import fs from "fs";

const str = ``;

str.split("\n").forEach(str2 => {
    if (!str2.includes("\t"))
        return;

    const ip = str2.split(" \t")[0];
    fs.appendFileSync("output.txt", `iptables -t nat -A PREROUTING -d ${ip} -j DNAT --to-destination 1.1.1.1\n`);
});