$(document).ready(() => {
    $("#form").on('submit', () => {
        let modulo = Number($("#in-modulo").val());
        let tableroSuma = initGrid(modulo, suma);
        let tableroProducto = initGrid(modulo, producto);

        drGrid(tableroSuma, $("#tablero-suma"), '+');
        drGrid(tableroProducto, $("#tablero-producto"), '*');
        $("#z-set").empty().append(drZSet(modulo));
    });

    $("#btn-calcular").click();
});

const initGrid = (modulo, fn) => {
    let tablero = [];
    for (let x = 0; x < modulo; x++) {
        tablero[x] = [];
        for (let y = 0; y < modulo; y++) {
            tablero[x][y] = fn(x, y, modulo);
        }
    }
    return tablero;
}

const suma = (x, y, modulo) => {
    return (x + y) % modulo;
}

const producto = (x, y, modulo) => {
    return (x * y) % modulo;
}

const drBox = (valor, clazz) => {
    return $(`<div class="${clazz}">${valor}</div>`);
}

const drGrid = (tablero, element, opSymbol) => {
    element.empty();
    let cols = [];

    let headersX = $("<div style='display:flex'>");
    
    headersX.append(drBox(opSymbol, 'box operation'));
    
    for (let x = 0; x < tablero.length; x++) {
        headersX.append(drBox(x, 'box header'));
    }
    
    cols.push(headersX);
    for (let x = 0; x < tablero.length; x++) {
        let row = $("<div style='display:flex'>");
        row.append(drBox(x, 'box header'));
        for (let y = 0; y < tablero.length; y++) {
            row.append(drBox(tablero[x][y], 'box data'));
        }
        cols.push(row);
    }

    element.append(cols);
}

const drZSet = (modulo) => {
    let set = $('<div>');

    set.append(`<span>Z${modulo} = {</span>`);

    for (let i = 0; i < modulo; i ++) {
        set.append($(`<span class="set-data">${i}</span>`));
        if (i < modulo - 1) {
            set.append(`<span>, </span>`);
        }
    }

    
    
    set.append(`}`);
    
    return set;
}