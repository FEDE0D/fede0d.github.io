$(document).ready(() => {
    $("#form").on('submit', () => {
        let domain = parseDomain($("#in-domain").val());
        let set = parseSet($("#in-set").val());

        let isReflexiva = checkReflexividad(domain, set);
        let isSimetrica = checkSimetria(domain, set);
        let isAntisimetrica = checkAntisimetria(domain, set);
        let isTransitiva = checkTransitividad(domain, set);

        $("#out-set").text(printSet(set));
        $("#out-domain").text(printDomain(domain));
        $("#out-reflexividad").text(isReflexiva ? "Es reflexiva" : "No es reflexiva");
        $("#out-simetria").text(isSimetrica ? "Es simétrica" : "No es simétrica");
        $("#out-antisimetria").text(isAntisimetrica ? "Es antisimétrica" : "No es antisimétrica");
        $("#out-transitividad").text(isTransitiva ? "Es transitiva" : "No es transitiva");
        $("#out-tipo").text(checkTipo(isReflexiva, isSimetrica, isAntisimetrica, isTransitiva));
    });
    $("#btn-identidad").click(() => {
        $("#in-domain").val("a, b, c");
        $("#in-set").val("(a, a); (b, b); (c, c)");
        $("#form").submit();
    });
    $("#btn-equivalencia").click(() => {
        $("#in-domain").val("a, b");
        $("#in-set").val("(a, a); (b, b); (a,b); (b,a)");
        $("#form").submit();
    });
    $("#form").submit();
});

const parseSet = (input) => {
    return input.split(";").map(p => p.trim()).map(p => p.slice(1, -1)).map(p => p.split(",").map(c => c.trim()));
}

const parseDomain = (input) => {
    return input.split(",").map(d => d.trim());
}

const printSet = (set) => {
    return `R = {${set.map(p => `(${p.join(", ")})`).join("; ")}}`;
}

const printDomain = (domain) => {
    return `A = {${domain.join(", ")}}`;
}

const checkReflexividad = (domain, set) => {
    return domain.every(x => set.some(p => p[0] == p[1] && p[0] == x));
}

const checkSimetria = (domain, set) => {
    return set.every(p => set.some(t => t[0] == p[1] && t[1] == p[0]));
}

const checkAntisimetria = (domain, set) => {
    let simetric = set.filter(p => set.some(t => t[0] == p[1] && t[1] == p[0]));
    return simetric.every(p => p[0] == p[1]);
}

const checkTransitividad = (domain, set) => {
    let map = {};
    set.forEach(p => {
        map[p[0]] = map[p[0]] || [];
        map[p[0]].push(p);
    });

    let transitions = [];
    for (let pair of set) {
        if (map[pair[1]]?.length > 0) {
            for (let match of map[pair[1]]) {
                transitions.push([pair[0], match[1]]);
            }
        }
    }
    return transitions.every(t => set.some(p => p[0] == t[0] && p[1] == t[1]))
}

const checkTipo = (isReflexiva, isSimetrica, isAntisimetrica, isTransitiva) => {
    if (isReflexiva && isAntisimetrica && isTransitiva) {
        return "Es una relación de orden";
    } else if (isReflexiva && isSimetrica && isTransitiva) {
        return "Es una relación de equivalencia";
    } else {
        return "No es ni relación de orden ni de equivalencia";
    }
}