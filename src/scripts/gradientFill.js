import {canvas_layer, ctx, system, textStyle} from './variables.js'

function gradientFill(){
    // Функция, ставящая заливкой градиент, по заданным пользователям параметрам.
    
    ctx[2].clearRect(0, 0, system.width, system.height);
    let color1 =  document.querySelector("input[name='color-grade1']").value,
        color2 =  document.querySelector("input[name='color-grade2']").value,
        typeGradient = document.querySelector("select[name='gradient-type']").value;
    
    let directionLinear = document.querySelector(".direction-linear"),
        directionRadial = document.querySelector(".direction-radial");

    switch (typeGradient){
        case 'linear':
            gradientLinear(color1, color2, directionLinear, directionRadial);
            break;
        case 'radial':
            gradientRadial(color1, color2, directionLinear, directionRadial)
            break;
    }
    system.existanseLayer["fillLayer"] = true;
}

function gradientLinear(color1, color2, directionLinear, directionRadial){
    let directionGradient = document.querySelector("select[name='gradient-direction']").value;
    let gradient;
    system["currentFill"] = "linear";

    system.currentFill = "linear";
    if (directionLinear.classList.contains("direction-hidden")){
        directionLinear.classList.remove("direction-hidden");
        directionRadial.classList.add("direction-hidden");
    }

    let x1,y1,x2,y2;
    if (directionGradient=="top"){
        x1 = 0;
        y1 = system.height;
        x2 = 0;
        y2 = 0;
    }else if (directionGradient=="left"){
        x1 = system.width;
        y1 = 0;
        x2 = 0;
        y2 = 0;
    }else if (directionGradient=="bottom"){
        x1 = 0;
        y1 = 0;
        x2 = 0;
        y2 = system.height;
    }else if (directionGradient=="right"){
        x1 = 0;
        y1 = 0;
        x2 = system.width;
        y2 = 0;
    }else if (directionGradient=="top left"){
        x1 = system.width;
        y1 = system.height;
        x2 = 0;
        y2 = 0;
    }else if (directionGradient=="top right"){
        x1 = 0;
        y1 = system.height;
        x2 = system.width;
        y2 = 0;
    }else if (directionGradient=="bottom left"){
        x1 = system.width;
        y1 = 0;
        x2 = 0;
        y2 = system.height;
    }else if (directionGradient=="bottom right"){
        x1 = 0;
        y1 =  0;
        x2 = system.width;
        y2 = system.height;
    }

    gradient = ctx[2].createLinearGradient(x1,y1, x2,y2);
    system.coordsGradient = [x1, y1, x2, y2];

    // Добавление контрольных точек
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    system.currentColor = [color1, color2];

    // Установка стиля заливки и отрисовка прямоугольника градиента
    ctx[2].fillStyle = gradient;
    ctx[2].fillRect(0, 0, system.width, system.height);
}

function gradientRadial(color1, color2, directionLinear, directionRadial){
    let gradient;
    system["currentFill"] = "radial";

    if (directionRadial.classList.contains("direction-hidden")){
        directionRadial.classList.remove("direction-hidden");
        directionLinear.classList.add("direction-hidden");
    }
    gradient = ctx[2].createRadialGradient(120,100,system.height, 0,0,30);
    
    // Добавление контрольных точек
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    system.currentColor = [color1, color2];
    
    // Установка стиля заливки и отрисовка прямоугольника градиента
    ctx[2].fillStyle = gradient;
    ctx[2].fillRect(0, 0, system.width, system.height);

}

function radialPosition(){
    let varX = document.querySelector("#direction-x").value,
        insertX = document.querySelector(".insert-x"),
        varY = document.querySelector("#direction-y").value,
        insertY = document.querySelector(".insert-y");
        
    let color1 =  document.querySelector("input[name='color-grade1']").value,
       color2 =  document.querySelector("input[name='color-grade2']").value;
    
    insertX.innerText = Math.floor(varX*100/system.width) +"%";
    insertY.innerText = Math.floor(varY*100/system.height) +"%";

    ctx[2].clearRect(0, 0, system.width, system.height);

    let gradient = ctx[2].createRadialGradient(120,100,system.height, varX,varY,30);
    system.coordsGradient = [120,100,system.height, varX,varY,30];
    
    // Добавление контрольных точек
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    // Установка стиля заливки и отрисовка прямоугольника градиента
    ctx[2].fillStyle = gradient;
    ctx[2].fillRect(0, 0, system.width, system.height);
}

function editAlphaGradient(evt){
    ctx[2].globalAlpha = evt.target.value/100;
    system.currentAlpha = evt.target.value/100;

    document.querySelector("input[name='alpha-mono']").value = evt.target.value;
    gradientFill();
}

export {gradientFill, radialPosition, editAlphaGradient}