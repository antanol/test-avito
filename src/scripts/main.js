import {canvas_layer, ctx, system, textStyle} from './variables.js';
import clearLayer from './clearLayer.js';
import groundImage from './groundImage.js';
import {oneColor, editAlphaMono} from './oneColor.js';
import {gradientFill, radialPosition, editAlphaGradient} from './gradientFill.js';
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
    // чтобы наши абсолютные канвасы не схлопывали место
    document.querySelector(".example").style.height = heightOfBanner+"px";
    
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
let menuSubs = document.querySelectorAll(".option header");
for (let sub of menuSubs){
    sub.addEventListener("click", showSub);
}

// слушатели на удаление "слоя"
let clearThem = document.querySelectorAll(".fa-times");
for (let clearIt of clearThem){
    clearIt.addEventListener("click", clearLayer);
}

// слушатель на добавление картинки
let loaderImage = document.querySelector(".banner-image");
loaderImage.addEventListener("input", groundImage);

// слушатель на выбор сплошной заливки
let singleColor = document.querySelector("input[name='color-plain']"),
    alphaSingleColor = document.querySelector("input[name='alpha-mono']");
singleColor.addEventListener("input", oneColor);
alphaSingleColor.addEventListener("input", editAlphaMono)

// слушатели на различные параметры градиента
let colorsGradient = document.querySelectorAll(".color-gradient"),
    alphaGradient = document.querySelector("input[name='alpha-grad']"),
    typeGradient = document.querySelector("select[name='gradient-type']"),
    directionLinear = document.querySelector(".direction-linear"),
    directionRadialX = document.getElementById("direction-x"),
    directionRadialY = document.getElementById("direction-y");

for (let color of colorsGradient){
    color.addEventListener("input", gradientFill);
}
alphaGradient.addEventListener("input", editAlphaGradient);
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

function showSub(evt){
    // функция, открывающая подменю при выборе того или иного фона для баннера
    // При этом ранее открытые меню будут скрыты
    // (данная функция может быть изменена в дальнейшем, если будет реализовываться наложение фонов друг на друга)
    let index = Number(evt.target.dataset.id);
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let arrows = document.querySelectorAll(".fa.arrows");
    let allSubs = document.querySelectorAll(".sub");

    if (system.currentText == 'Пример вашего баннера'){
        system.currentText = '';
        ctx[3].clearRect(0, 0, system.width, system.height);
    }
    
    if (arrows[index].classList.contains("fa-chevron-down")){
        openSub(index, checkboxes, arrows, allSubs);
    }else{
        closeSub(index, checkboxes, arrows, allSubs);
    }
 
    if (index==1){
        closeSub(2, checkboxes, arrows, allSubs);
    }else if (index==2){
        closeSub(1, checkboxes, arrows, allSubs);
    }
}

function openSub(index, checkboxes, arrows, allSubs){
    checkboxes[index].checked = true;
    arrows[index].classList.remove("fa-chevron-down");
    arrows[index].classList.add("fa-chevron-up");
    allSubs[index].classList.remove("hidden-sub");
}

function closeSub(index, checkboxes, arrows, allSubs){
    checkboxes[index].checked = false;
    arrows[index].classList.remove("fa-chevron-up");
    arrows[index].classList.add("fa-chevron-down");
    allSubs[index].classList.add("hidden-sub");
}