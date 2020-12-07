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
    // -2 пикселя для каждого значения, т.к. "пример баннера" обоясан рамкой в 1рх
    
    let bannerSize = document.querySelector(".example-area");
    let widthOfBanner = bannerSize.offsetWidth-2,
        heightOfBanner = bannerSize.offsetHeight-2;
    document.querySelector(".example-area-size").innerText = `${widthOfBanner}*${heightOfBanner}`;
    
    // для корректного отображения, в атрибуте и css канваса должны быть одинаковые размеры
    canvas_layer1.setAttribute("height", `${heightOfBanner}`);
    canvas_layer1.setAttribute("width", `${widthOfBanner}`);
    canvas_layer2.setAttribute("height", `${heightOfBanner}`);
    canvas_layer2.setAttribute("width", `${widthOfBanner}`);
    canvas_layer3.setAttribute("height", `${heightOfBanner}`);
    canvas_layer3.setAttribute("width", `${widthOfBanner}`);

    // Вставка текста "Пример вашего баннера"
    let textBanner = "Пример вашего баннера";
    ctx3.fillStyle = "gray";
    ctx3.font = "BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    ctx3.fillText(textBanner, 20, heightOfBanner/2);

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
	} 
}

function reRenderSys(obj, elem, action) {
    obj[elem] = action;
    
    if (system.currentText == 'Пример вашего баннера'){
        system.currentText = '';
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

function backgroundZeroing(ctx){
    // Функция, обнуляющая фон баннера, т.к. в CSS3 фоны накладываются друг на друга (наложение можно сделать в дальнейшем при развитии приложения)
    // Функция добавляется в начало каждой функции, добавляющей новый фон

    document.querySelector(".example-area").style.background = "";

    ctx.clearRect(0, 0, system.width, system.height);
}

function groundImage() {
    // Функция, ставящая фоном баннера картинку, которую подгрузит юзер

    let input = document.querySelector(".banner-image");
    if (input.files.length > 1){
        // если кто-то решит через devTools проставить мультипл в input с загрузкой изображений
        document.querySelector(".error-field").innerText = "Пожалуйста, выберите для баннера только одно изображение!";
    }else{
        backgroundZeroing(ctx1);

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

    backgroundZeroing(ctx2);
    ctx2.fillStyle = document.querySelector("input[name='color-plain']").value;
    ctx2.fillRect(0, 0, system.width, system.height);
}

function gradientFill(){
    // Функция, ставящая заливкой градиент, по заданным пользователям параметрам.
    
    backgroundZeroing(ctx2);

    let exampleArea = document.querySelector(".example-area");

    let color1 =  document.querySelector("input[name='color-grade1']").value,
        color2 =  document.querySelector("input[name='color-grade2']").value,
        typeGradient = document.querySelector("select[name='gradient-type']").value,
        directionGradient = document.querySelector("select[name='gradient-direction']").value;
    
    let gradient;

    switch (typeGradient){
        case 'linear':
            
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

function addTextInBanner(){
    // Функция, добавляющая(введённый пользователем) текст в баннер

    let textArea = document.querySelector("textarea[name='banner-text']").value;
};