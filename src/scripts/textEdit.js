import {canvas_layer, ctx, system, textStyle} from './variables.js'

function addTextInBanner(){
    // Функция, добавляющая(введённый пользователем) текст в баннер

    ctx[3].clearRect(0, 0, system.width, system.height);

    let userText = document.querySelector("textarea[name='banner-text']");
    // здесь мы не используем evt.target, т.к. событие может быть вызвано не только через слушатель, 
    // но и через изменения других свойств для текста (пока что)

    ctx[3].fillStyle = textStyle.color;
    ctx[3].font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;

    if (Math.floor(ctx[3].measureText(userText.value).width) > textStyle.maxWidth){
        let lines = getLines(ctx[3], userText.value, textStyle.maxWidth);
        let startHeight = textStyle.startHeight;
        for (let line of lines){
            ctx[3].fillText(line, 10, startHeight, textStyle.maxWidth);
            startHeight += Number(textStyle.fontSize);
        }
        console.log(system);
        system.currentText = lines;
    }else{
        ctx[3].fillText(userText.value, 10, textStyle.startHeight, textStyle.maxWidth);
        system.currentText = userText.value;
    }
    system.existanseLayer["textLayer"] = true;
        console.log(textStyle);
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

function editTextSize(evt){
    textStyle.fontSize = evt.target.value;
    addTextInBanner();
}

function editTextColor(evt){
    textStyle.color = evt.target.value;
    addTextInBanner();
}

function editTextPos(evt){
    textStyle.startHeight = evt.target.value * system.height / 100;
    addTextInBanner();
}

export {addTextInBanner, editTextSize, editTextColor, editTextPos}