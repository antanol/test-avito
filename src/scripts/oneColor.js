import {canvas_layer, ctx, system, textStyle} from './variables.js'

function oneColor(evt){
    // Функция, ставящая фоном баннера сплошную заливку
    let userColor = evt.target.value;

    ctx[2].clearRect(0, 0, system.width, system.height);
    ctx[2].fillStyle = userColor;
    system.currentColor = userColor;
    ctx[2].fillRect(0, 0, system.width, system.height);
}

export default oneColor