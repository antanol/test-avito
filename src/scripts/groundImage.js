import {canvas_layer, ctx, system, textStyle} from './variables.js'

function groundImage(evt) {
    // Функция, ставящая фоном баннера картинку, которую подгрузит юзер
    
    let input = evt.target;
    if (input.files.length > 1){
        // если кто-то решит через devTools проставить мультипл в input с загрузкой изображений
        document.querySelector(".error-field").innerText = "Пожалуйста, выберите для баннера только одно изображение!";
    }else{
        // убираем предыдущее изображение + убираем текст, если это "пример баннера"
        ctx[1].clearRect(0, 0, system.width, system.height);

        let file = input.files[0],
            src = URL.createObjectURL(file);

        let img = new Image();
        img.src = src;
        
        img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
            // Рисуем изображение от точки с координатами 0, 0
            // подстраиваем картинку под размеры поля, для этого задаём ширину под ширину канваса, а высоту высчитываем по формуле
            ctx[1].drawImage(img, 0, 0, system.width, system.width*img.height/img.width);

            system.currentImgSrc = src;
        }
        system.existanseLayer["imgLayer"] = true;
    }
}

export default groundImage;