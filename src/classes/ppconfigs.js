import { leadreaktor } from "./pp/leadreaktor";
import { leadrock } from "./pp/leadrock";
import { lemonad } from "./pp/lemonad";
import { adcombo } from "./pp/adcombo";
import { trafficlight } from "./pp/trafficlight";
import { kma } from "./pp/kma";

export function getPPProps(name) {
    return getPPField(name, "props");
}

export function getPPTemplate(name) {
    return getPPField(name, "template");
}

export function getPPSubs(name) {
    return getPPField(name, "subs");
}

function getPPField(pp_name, field) {
    switch (pp_name) {
        case "adcombo":
            return adcombo[field];
        case "leadrock":
            return leadrock[field];
        case "lemonad":
            return lemonad[field];
        case "leadreaktor":
            return leadreaktor[field];
        case "trafficlight":
            return trafficlight[field];
        case "kma":
            return kma[field];
    }
}
