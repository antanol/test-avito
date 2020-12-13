import {canvas_layer, ctx, system, textStyle} from './variables.js'

function clearLayer(evt) {
    // Функция, очищающая нужный слой
    let currentLayer = Number(evt.target.dataset.id);
    
    ctx[currentLayer].clearRect(0, 0, system.width, system.height);
    switch (currentLayer){
        case 1:
            system.currentImgSrc = false;
            system.existanseLayer["imgLayer"] = false;
            break;
        case 2:
            system.existanseLayer["fillLayer"] = false;
            system.currentFill = false;
            break;
        case 1:
            system.existanseLayer["textLayer"] = false;
            break;
    }
}

export default clearLayer;