const canvas_layer = [
    document.querySelector("canvas.hide-ending"),
    document.querySelector("#image-layer"),
    document.querySelector("#fill-layer"),
    document.querySelector("#text-layer")
];

const ctx = [
    canvas_layer[0].getContext("2d"),
    canvas_layer[1].getContext("2d"),    
    canvas_layer[2].getContext("2d"),
    canvas_layer[3].getContext("2d")
];

// Объявляем переменную, в которой будет храниться всё, происходящее с нашим канвасом
let system = {
    width: 200,
    height: 300,
    existanseLayer:{
        imgLayer: false,
        fillLayer: false,
        textLayer: false
    },
    currentImgSrc: false,
    currentFill: false,
    currentColor: "#000000",
    currentAlpha: {
        mono: 1,
        gradient: 1
    },
    coordsGradient: false,
    currentText: false
};

// Объект со стилями для текста на канвасе
let textStyle = {
    maxWidth: system.width - 10,
    startHeight: system.height/2,
    color: 'gray',
    fontFamily: "BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: "16px"
};

export {canvas_layer, ctx, system, textStyle}