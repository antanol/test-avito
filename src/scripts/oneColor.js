import {canvas_layer, ctx, system, textStyle} from './variables.js'

function oneColor(evt){
    // Функция, ставящая фоном баннера сплошную заливку
    system["currentFill"] = "mono";

    // если функция перерисовки вызывается из editAlpha, то цвет не меняется
    if (evt){
        system.currentColor = evt.target.value;
    }

    ctx[2].clearRect(0, 0, system.width, system.height);
    ctx[2].fillStyle = system.currentColor;
    ctx[2].globalAlpha = system.currentAlpha["mono"];
    ctx[2].fillRect(0, 0, system.width, system.height);
    
    system.existanseLayer["fillLayer"] = true;
}

function editAlphaMono(evt){
    ctx[2].globalAlpha = evt.target.value/100;
    system.currentAlpha["mono"] = evt.target.value/100;
    oneColor();
}

export {oneColor, editAlphaMono}