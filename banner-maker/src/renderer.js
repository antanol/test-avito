const canvas_layer1 = document.querySelector("#image-layer"),
    canvas_layer2 = document.querySelector("#fill-layer"),
    canvas_layer3 = document.querySelector("#text-layer");
const ctx1 = canvas_layer1.getContext("2d"),
    ctx2 = canvas_layer2.getContext("2d"),
    ctx3 = canvas_layer3.getContext("2d");

// Объявляем переменную, в которой будет храниться всё, происходящее с нашим канвасом
let system = {
    width: 150,
    height: 200,
    currentFill: false,
    currentColor: false,
    currentText: false
}

window.onload = ()=>{
    // функция подставляет в поле предупреждения размеры окна просмотра.
    // -2 пикселя для каждого значения, т.к. "пример баннера" опоясан рамкой в 1рх
    
    let widthOfBanner = canvas_layer1.offsetWidth-2,
        heightOfBanner = canvas_layer1.offsetHeight-2;
    document.querySelector(".example-area-size").innerText = `${widthOfBanner}*${heightOfBanner}`;
    
    // для корректного отображения, в атрибуте и css канваса должны быть одинаковые размеры
    canvas_layer1.setAttribute("height", heightOfBanner);
    canvas_layer1.setAttribute("width", widthOfBanner);
    canvas_layer2.setAttribute("height", heightOfBanner);
    canvas_layer2.setAttribute("width", widthOfBanner);
    canvas_layer3.setAttribute("height", heightOfBanner);
    canvas_layer3.setAttribute("width", widthOfBanner);
    
    document.querySelector("#direction-x").setAttribute("max", widthOfBanner);
    document.querySelector("#direction-y").setAttribute("max", heightOfBanner)

    // Вставка текста "Пример вашего баннера"
    let textBanner = "Пример вашего баннера";
    ctx3.fillStyle = "gray";
    ctx3.font = "16px BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    ctx3.fillText(textBanner, 10, heightOfBanner/2);

    system.width = widthOfBanner;
    system.height = heightOfBanner;
    system.currentText = textBanner;
};

// реагирует на выбор значений формы и их изменения, и обновляет данные объекта system в соответствии с действиями пользователя.
document.oninput = mouseActions;
function mouseActions(evt) {
	if (evt.target.classList.contains('banner-image')){
		reRenderSys(system, 'currentFill', "image");
	} else if (evt.target.name == 'color-plain'){
		reRenderSys(system, 'currentFill', "mono");
    } else if ((evt.target.name == 'color-grade1') ||
            (evt.target.name == 'color-grade2') ||
            (evt.target.name == 'gradient-type') ||
            (evt.target.name == 'gradient-direction')){
		reRenderSys(system, 'currentFill', "gradient");
	} else if (evt.target.name == "banner-text"){
		reRenderSys(system);
    }
}

function reRenderSys(obj, elem, action) {
    obj[elem] = action;
    
    if (system.currentText == 'Пример вашего баннера'){
        system.currentText = '';
        ctx3.clearRect(0, 0, system.width, system.height);
    }
}

function show_sub(index){
    // функция, открывающая подменю при выборе того или иного фона для баннера
    // При этом ранее открытые меню будут скрыты
    // (данная функция может быть изменена в дальнейшем, если будет реализовываться наложение фонов друг на друга)

    let allSubs = document.querySelectorAll(".sub");
    for (let i=0; i<allSubs.length; i++){
        if (!allSubs[i].classList.contains("hidden-sub")){
            allSubs[i].classList.add("hidden-sub");
        }
    };

    let currentSub = allSubs[Number(index)];
    currentSub.classList.remove("hidden-sub");

    // Возможность сразу же при выборе пункта с заливкой получить фон.
    // Отключено на случай, если юзер промахнется и случайно в уже готовом баннере откроет другую заливку. Ведь тогда всё "слетит")
    // switch(Number(index)){
    //     case 1:
    //         oneColor();
    //         break;
    //     case '2':
    //         gradientFill();
    //         break;
    // }
};

function groundImage() {
    // Функция, ставящая фоном баннера картинку, которую подгрузит юзер

    let input = document.querySelector(".banner-image");
    if (input.files.length > 1){
        // если кто-то решит через devTools проставить мультипл в input с загрузкой изображений
        document.querySelector(".error-field").innerText = "Пожалуйста, выберите для баннера только одно изображение!";
    }else{
        // убираем предыдущее изображение + убираем текст, если это "пример баннера"
        ctx1.clearRect(0, 0, system.width, system.height);

        let file = input.files[0],
            imgLayer = document.querySelector(".image-layer"),
            src = URL.createObjectURL(file);

        let img = new Image();
        img.src = src;
        
        img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
            // Рисуем изображение от точки с координатами 0, 0
            // подстраиваем картинку под размеры поля, для этого задаём ширину под ширину канваса, а высоту высчитываем по формуле
            ctx1.drawImage(img, 0, 0, system.width, system.width*img.height/img.width);
        }
    }
}

function oneColor(){
    // Функция, ставящая фоном баннера сплошную заливку

    ctx2.clearRect(0, 0, system.width, system.height);
    ctx2.fillStyle = document.querySelector("input[name='color-plain']").value;
    ctx2.fillRect(0, 0, system.width, system.height);
}

function gradientFill(){
    // Функция, ставящая заливкой градиент, по заданным пользователям параметрам.
    
    ctx2.clearRect(0, 0, system.width, system.height);
    let color1 =  document.querySelector("input[name='color-grade1']").value,
        color2 =  document.querySelector("input[name='color-grade2']").value,
        typeGradient = document.querySelector("select[name='gradient-type']").value,
        directionGradient = document.querySelector("select[name='gradient-direction']").value;
    
    let directionLinear = document.querySelector(".direction-linear"),
        directionRadial = document.querySelector(".direction-radial");

    let gradient;

    switch (typeGradient){
        case 'linear':
            if (directionLinear.classList.contains("direction-hidden")){
                directionLinear.classList.remove("direction-hidden");
                directionRadial.classList.add("direction-hidden");
            }
            if (directionGradient=="top"){
                gradient = ctx2.createLinearGradient(0,system.height, 0,0);
            }else if (directionGradient=="left"){
                gradient = ctx2.createLinearGradient(system.width,0, 0,0);
            }else if (directionGradient=="bottom"){
                gradient = ctx2.createLinearGradient(0,0, 0,system.height);
            }else if (directionGradient=="right"){
                gradient = ctx2.createLinearGradient(0,0, system.width,0);
            }else if (directionGradient=="top left"){
                gradient = ctx2.createLinearGradient(system.width,system.height, 0,0);
            }else if (directionGradient=="top right"){
                gradient = ctx2.createLinearGradient(0,system.height, system.width,0);
            }else if (directionGradient=="bottom left"){
                gradient = ctx2.createLinearGradient(system.width,0, 0,system.height);
            }else if (directionGradient=="bottom right"){
                gradient = ctx2.createLinearGradient(0, 0, system.width,system.height);
            }
            // Добавление контрольных точек
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);

            // Установка стиля заливки и отрисовка прямоугольника градиента
            ctx2.fillStyle = gradient;
            ctx2.fillRect(0, 0, system.width, system.height);
            break;
        case 'radial':
            if (directionRadial.classList.contains("direction-hidden")){
                directionRadial.classList.remove("direction-hidden");
                directionLinear.classList.add("direction-hidden");
            }
            gradient = ctx2.createRadialGradient(120,100,system.height, 0,0,30);
            
            // Добавление контрольных точек
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            // Установка стиля заливки и отрисовка прямоугольника градиента
            ctx2.fillStyle = gradient;
            ctx2.fillRect(0, 0, system.width, system.height);
            
            break;
    }
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

    ctx2.clearRect(0, 0, system.width, system.height);

    gradient = ctx2.createRadialGradient(120,100,system.height, varX,varY,30);
    
    // Добавление контрольных точек
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    // Установка стиля заливки и отрисовка прямоугольника градиента
    ctx2.fillStyle = gradient;
    ctx2.fillRect(0, 0, system.width, system.height);

}

function addTextInBanner(){
    // Функция, добавляющая(введённый пользователем) текст в баннер

    ctx3.clearRect(0, 0, system.width, system.height);

    let userText = document.querySelector("textarea[name='banner-text']"),
        maxWidth = system.width-10;

    if (Math.floor(ctx3.measureText(userText.value).width) > maxWidth){
        let lines = getLines(ctx3, userText.value, maxWidth);
        let startHeight = system.height/2;
        for (let line of lines){
            ctx3.fillText(line, 10, startHeight, maxWidth);
            startHeight += 20;
        }
    }else{
        ctx3.fillStyle = "gray";
        ctx3.font = "BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
        ctx3.fillText(userText.value, 10, system.height/2, maxWidth);
        system.currentText = userText.value;
    }
};


function getLines(ctx, text, maxWidth) {
    let words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    console.log(lines)
    return lines;
}