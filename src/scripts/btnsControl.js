import {canvas_layer, ctx, system, textStyle} from './variables.js';

function unblockedBtns(){
    ctx[0].clearRect(0, 0, system.width, system.height);

    let btns = document.querySelectorAll(".sub-btn");
    for (let btn of btns){
        btn.disabled = false;
    }

    if (system.currentImgSrc){
        let img = new Image();
        img.src = system.currentImgSrc;
        
        img.onload = function() {
            ctx[0].drawImage(img, 0, 0, system.width, system.width*img.height/img.width);
        }
    }

    if (system.currentFill=="mono"){
        ctx[0].fillStyle = system.currentColor;
        ctx[0].fillRect(0,0, system.width, system.height);
    }else if (system.currentFill=="linear"){
        let gradient = ctx[0].createLinearGradient(system.coordsGradient[0], 
            system.coordsGradient[1], 
            system.coordsGradient[2],
            system.coordsGradient[3]);

        // Добавление контрольных точек
        gradient.addColorStop(0, system.currentColor[0]);
        gradient.addColorStop(1, system.currentColor[1]);

        // Установка стиля заливки и отрисовка прямоугольника градиента
        ctx[0].fillStyle = gradient;
        ctx[0].fillRect(0, 0, system.width, system.height);
    }else if (system.currentFill=="radial"){
        let gradient;
        if (document.querySelector("#direction-x").value != 0 && document.querySelector("#direction-y").value !=0){
            gradient = ctx[0].createRadialGradient(system.coordsGradient[0],
                                                        system.coordsGradient[1],
                                                        system.coordsGradient[2],
                                                        system.coordsGradient[3],
                                                        system.coordsGradient[4],
                                                        system.coordsGradient[5]);
        }else{
            gradient = ctx[0].createRadialGradient(120,100,system.height, 0,0,30);
        }
        
        gradient.addColorStop(0, system.currentColor[0]);
        gradient.addColorStop(1, system.currentColor[1]);
        
        ctx[0].fillStyle = gradient;
        ctx[0].fillRect(0, 0, system.width, system.height);
    }

    if (system.currentText){
        ctx[0].fillStyle = textStyle.color;
        ctx[0].font = `${textStyle.fontSize} ${textStyle.fontFamily}`;
        
        if (typeof(system.currentText) == "string"){
            ctx[0].fillText(system.currentText, 10, textStyle.startHeight, textStyle.maxWidth);
        }else{
            let startHeight = textStyle.startHeight;
            for (let line of system.currentText){
                ctx[0].fillText(line, 10, startHeight, textStyle.maxWidth);
                startHeight += 20;
            }
        }
    }
}

function saveCanvasAsPNG(){
    let imageData = canvas_layer[0].toDataURL();
    let image = new Image();
    image.src = imageData;
    
    let link = document.createElement("a");
    link.setAttribute("href", image.src);

    link.setAttribute("download", "yourBanner");
    link.click();
}

function saveCanvasAsHTML(){
    let imageData = canvas_layer[0].toDataURL();
    let image = new Image();
    image.src = imageData;
    
    let html = `<img src = "${image.src}">`;

    //пытаемся скопировать текст в буфер обмена
    navigator.clipboard.writeText(html)
    .then(() => {
        // Получилось!
        console.log(`Вы скопировали ${html}`);
    })
    .catch(err => {
        console.log('Что-то пошло не так...', err);
    });
}

function saveCanvasAsJSON(){
    let imageData = canvas_layer[0].toDataURL();
    let json = JSON.stringify(imageData);

    //пытаемся скопировать текст в буфер обмена
    navigator.clipboard.writeText(json)
    .then(() => {
        // Получилось!
        console.log(`Вы скопировали ${json}`);
    })
    .catch(err => {
        console.log('Что-то пошло не так...', err);
    });
}

export {unblockedBtns, saveCanvasAsPNG, saveCanvasAsHTML, saveCanvasAsJSON}