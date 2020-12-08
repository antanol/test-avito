const canvas_layer1 = document.querySelector("#image-layer"),
    canvas_layer2 = document.querySelector("#fill-layer"),
    canvas_layer3 = document.querySelector("#text-layer"),
    canvas_hide = document.querySelector("canvas.hide-ending");
const ctx1 = canvas_layer1.getContext("2d"),    
    ctx2 = canvas_layer2.getContext("2d"),
    ctx3 = canvas_layer3.getContext("2d"),
    ctx_hide = canvas_hide.getContext("2d");

// Объявляем переменную, в которой будет храниться всё, происходящее с нашим канвасом
let system = {
    width: 150,
    height: 200,
    currentImgSrc: false,
    currentFill: false,
    currentColor: false,
    coordsGradient: false,
    currentText: false
};

let textStyle = {
        maxWidth: system.width - 10,
        startHeight: system.height/2,
        color: 'gray',
        fontFamily: "BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        fontSize: "16px"
};

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
    canvas_hide.setAttribute("height", heightOfBanner);
    canvas_hide.setAttribute("width", widthOfBanner);
    
    document.querySelector("#direction-x").setAttribute("max", widthOfBanner);
    document.querySelector("#direction-y").setAttribute("max", heightOfBanner)

    // Вставка текста "Пример вашего баннера"
    let textBanner = "Пример вашего баннера";
    ctx3.fillStyle = textStyle.color;
    ctx3.font = `${textStyle.fontSize} ${textStyle.fontFamily}`;
    ctx3.fillText(textBanner, 10, textStyle.maxWidth);

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
    } else if (evt.target.name == 'gradient-type' && evt.target.value=="linear"){
		reRenderSys(system, 'currentFill', "linear");
    } else if (evt.target.name == 'gradient-type' && evt.target.value=="radial"){
		reRenderSys(system, 'currentFill', "radial");
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
            src = URL.createObjectURL(file);

        let img = new Image();
        img.src = src;
        
        img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
            // Рисуем изображение от точки с координатами 0, 0
            // подстраиваем картинку под размеры поля, для этого задаём ширину под ширину канваса, а высоту высчитываем по формуле
            ctx1.drawImage(img, 0, 0, system.width, system.width*img.height/img.width);

            system.currentImgSrc = src;
        }
    }
}

function oneColor(){
    // Функция, ставящая фоном баннера сплошную заливку
    let userColor = document.querySelector("input[name='color-plain']").value;

    ctx2.clearRect(0, 0, system.width, system.height);
    ctx2.fillStyle = userColor;
    system.currentColor = userColor;
    ctx2.fillRect(0, 0, system.width, system.height);
}

function gradientFill(){
    // Функция, ставящая заливкой градиент, по заданным пользователям параметрам.
    
    ctx3.clearRect(0, 0, system.width, system.height);
    let color1 =  document.querySelector("input[name='color-grade1']").value,
        color2 =  document.querySelector("input[name='color-grade2']").value,
        typeGradient = document.querySelector("select[name='gradient-type']").value,
        directionGradient = document.querySelector("select[name='gradient-direction']").value;
    
    let directionLinear = document.querySelector(".direction-linear"),
        directionRadial = document.querySelector(".direction-radial");

    let gradient;

    switch (typeGradient){
        case 'linear':
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

            gradient = ctx2.createLinearGradient(x1,y1, x2,y2);
            system.coordsGradient = [x1, y1, x2, y2];

            // Добавление контрольных точек
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            system.currentColor = [color1, color2];

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
            system.currentColor = [color1, color2];
            
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
    system.coordsGradient = [120,100,system.height, varX,varY,30];
    
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

    let userText = document.querySelector("textarea[name='banner-text']");

    ctx3.fillStyle = textStyle.color;
    ctx3.font = `${textStyle.fontSize} ${textStyle.fontFamily}`;

    if (Math.floor(ctx3.measureText(userText.value).width) > textStyle.maxWidth){
        let lines = getLines(ctx3, userText.value, textStyle.maxWidth);
        let startHeight = textStyle.startHeight;
        for (let line of lines){
            ctx3.fillText(line, 10, startHeight, textStyle.maxWidth);
            startHeight += 20;
        }

        system.currentText = lines;
    }else{
        ctx3.fillText(userText.value, 10, textStyle.startHeight, textStyle.maxWidth);
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
    return lines;
}

function editTextSize(){
    textStyle.fontSize = document.querySelector(".text-size").value+"px";
    
    addTextInBanner();
}

function editTextColor(){
    textStyle.color = document.querySelector('input[name="text-color"]').value;
    addTextInBanner();
}

function unblockedBtns(){
    ctx_hide.clearRect(0, 0, system.width, system.height);
    let btns = document.querySelectorAll(".sub-btn");

    for (let btn of btns){
        btn.disabled = false;
    }

    if (system.currentImgSrc){
        let img = new Image();
        img.src = system.currentImgSrc;
        
        img.onload = function() {
            ctx_hide.drawImage(img, 0, 0, system.width, system.width*img.height/img.width);
        }
    }

    if (system.currentFill=="mono"){
        ctx_hide.fillStyle = system.currentColor;
        ctx_hide.fillRect(0,0, system.width, system.height);
    }else if (system.currentFill=="linear"){
        let gradient = ctx_hide.createLinearGradient(system.coordsGradient[0], 
            system.coordsGradient[1], 
            system.coordsGradient[2],
            system.coordsGradient[3]);

        // Добавление контрольных точек
        gradient.addColorStop(0, system.currentColor[0]);
        gradient.addColorStop(1, system.currentColor[1]);

        // Установка стиля заливки и отрисовка прямоугольника градиента
        ctx_hide.fillStyle = gradient;
        ctx_hide.fillRect(0, 0, system.width, system.height);
    }else if (system.currentFill=="radial"){
        let gradient;
        if (document.querySelector("#direction-x").value != 0 && document.querySelector("#direction-y").value !=0){
            gradient = ctx_hide.createRadialGradient(system.coordsGradient[0],
                                                        system.coordsGradient[1],
                                                        system.coordsGradient[2],
                                                        system.coordsGradient[3],
                                                        system.coordsGradient[4],
                                                        system.coordsGradient[5]);
        }else{
            gradient = ctx_hide.createRadialGradient(120,100,system.height, 0,0,30);
        }
        
        gradient.addColorStop(0, system.currentColor[0]);
        gradient.addColorStop(1, system.currentColor[1]);
        
        ctx_hide.fillStyle = gradient;
        ctx_hide.fillRect(0, 0, system.width, system.height);
    }

    if (system.currentText){
        ctx_hide.fillStyle = textStyle.color;
        ctx_hide.font = `${textStyle.fontSize} ${textStyle.fontFamily}`;
        
        if (typeof(system.currentText) == "string"){
            ctx_hide.fillText(system.currentText, 10, textStyle.startHeight, textStyle.maxWidth);
        }else{
            let startHeight = textStyle.startHeight;
            for (let line of system.currentText){
                ctx_hide.fillText(line, 10, startHeight, textStyle.maxWidth);
                startHeight += 20;
            }
        }
    }
}

function saveCanvasAsPNG(){
    let imageData = canvas_hide.toDataURL();
    let image = new Image();
    image.src = imageData;
    
    let link = document.createElement("a");
    link.setAttribute("href", image.src);

    link.setAttribute("download", "yourBanner");
    link.click();
}

function saveCanvasAsHTML(){
    let imageData = canvas_hide.toDataURL();
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