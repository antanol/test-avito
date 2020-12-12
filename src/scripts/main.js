import {canvas_layer, ctx, system, textStyle} from './variables.js';
import groundImage from './groundImage.js';
import oneColor from './oneColor.js';
import {gradientFill, radialPosition} from './gradientFill.js';
import {addTextInBanner, editTextSize, editTextColor, editTextPos} from './textEdit.js';
import {unblockedBtns, saveCanvasAsPNG, saveCanvasAsHTML, saveCanvasAsJSON} from './btnsControl.js';

window.onload = ()=>{
    // функция подставляет в поле предупреждения размеры окна просмотра.
    // -2 пикселя для каждого значения, т.к. "пример баннера" опоясан рамкой в 1рх
    
    let widthOfBanner = canvas_layer[1].offsetWidth-2,
        heightOfBanner = canvas_layer[1].offsetHeight-2;
    document.querySelector(".example-area-size").innerText = `${widthOfBanner}*${heightOfBanner}`;
    
    // для корректного отображения, в атрибуте и css канваса должны быть одинаковые размеры
    canvas_layer[1].setAttribute("height", heightOfBanner);
    canvas_layer[1].setAttribute("width", widthOfBanner);
    canvas_layer[2].setAttribute("height", heightOfBanner);
    canvas_layer[2].setAttribute("width", widthOfBanner);
    canvas_layer[3].setAttribute("height", heightOfBanner);
    canvas_layer[3].setAttribute("width", widthOfBanner);
    canvas_layer[0].setAttribute("height", heightOfBanner);
    canvas_layer[0].setAttribute("width", widthOfBanner);
    
    document.querySelector("#direction-x").setAttribute("max", widthOfBanner);
    document.querySelector("#direction-y").setAttribute("max", heightOfBanner)

    // Вставка текста "Пример вашего баннера"
    let textBanner = "Пример вашего баннера";
    ctx[3].fillStyle = textStyle.color;
    ctx[3].font = `${textStyle.fontSize} ${textStyle.fontFamily}`;
    ctx[3].fillText(textBanner, 10, textStyle.startHeight, textStyle.maxWidth);

    system.width = widthOfBanner;
    system.height = heightOfBanner;
    system.currentText = textBanner;
};

// слушатели на развёртывании настроек для заливок / загрузки изображения
let menuSubs = document.querySelectorAll("input[name='background-type']");
for (let sub of menuSubs){
    sub.addEventListener("change", showSub);
}

// слушатель на добавление картинки
let loaderImage = document.querySelector(".banner-image");
loaderImage.addEventListener("input", groundImage);

// слушатель на выбор сплошной заливки
let singleColor = document.querySelector("input[name='color-plain']");
singleColor.addEventListener("input", oneColor);

// слушатели на различные параметры градиента
let colorsGradient = document.querySelectorAll(".color-gradient"),
    typeGradient = document.querySelector("select[name='gradient-type']"),
    directionLinear = document.querySelector(".direction-linear"),
    directionRadialX = document.getElementById("direction-x"),
    directionRadialY = document.getElementById("direction-y");

for (let color of colorsGradient){
    color.addEventListener("input", gradientFill);
}
typeGradient.addEventListener("input", gradientFill);
directionLinear.addEventListener("input", gradientFill);
directionRadialX.addEventListener("input", radialPosition);
directionRadialY.addEventListener("input", radialPosition);

// Слушатели на изменения пользовательского текста
let userText = document.querySelector("textarea[name='banner-text']"),
    textSize = document.querySelector("input[name='text-size']"),
    colorText = document.querySelector("input[name='text-color']"),
    directionText = document.querySelector("input[name='text-direction']");

userText.addEventListener("input", addTextInBanner);
textSize.addEventListener("input", editTextSize);
colorText.addEventListener("input", editTextColor);
directionText.addEventListener("input", editTextPos);

// Слушатели на финальных кнопках
let saveBtn = document.querySelector(".btn-save"),
    pngBtn = document.querySelector(".btn-PNG"),
    htmlBtn = document.querySelector(".btn-HTML"),
    jsonBtn = document.querySelector(".btn-JSON");

saveBtn.addEventListener("click", unblockedBtns);
pngBtn.addEventListener("click", saveCanvasAsPNG);
htmlBtn.addEventListener("click", saveCanvasAsHTML);
jsonBtn.addEventListener("click", saveCanvasAsJSON);

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
        ctx[3].clearRect(0, 0, system.width, system.height);
    }
}

function showSub(evt){
    // функция, открывающая подменю при выборе того или иного фона для баннера
    // При этом ранее открытые меню будут скрыты
    // (данная функция может быть изменена в дальнейшем, если будет реализовываться наложение фонов друг на друга)
    let index = evt.target.dataset.id;
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