const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

window.onload = ()=>{
    // функция подставляет в поле предупреждения размеры окна просмотра.
    // -2 пикселя для каждого значения, т.к. "пример баннера" обоясан рамкой в 1рх
    
    let bannerSize = document.querySelector(".example-area");
    let widthOfBanner = bannerSize.offsetWidth-2,
        heightOfBanner = bannerSize.offsetHeight-2;
    document.querySelector(".example-area-size").innerText = `${widthOfBanner}*${heightOfBanner}`;
    
    // для корректного отображения, в атрибуте и css канваса должны быть одинаковые размеры
    canvas.setAttribute("height", `${heightOfBanner}`);
    canvas.setAttribute("width", `${widthOfBanner}`);

    // Вставка текста "Пример вашего баннера"
    ctx.fillStyle = "gray";
    ctx.font = "BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    ctx.fillText("Пример вашего баннера", 20, heightOfBanner/2);
};

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

function backgroundZeroing(){
    // Функция, обнуляющая фон баннера, т.к. в CSS3 фоны накладываются друг на друга (наложение можно сделать в дальнейшем при развитии приложения)
    // Функция добавляется в начало каждой функции, добавляющей новый фон

    document.querySelector(".example-area").style.background = "";
}

function groundImage() {
    // Функция, ставящая фоном баннера картинку, которую подгрузит юзер

    let input = document.querySelector(".banner-image");
    if (input.files.length > 1){
        // если кто-то решит через devTools проставить мультипл в input с загрузкой изображений
        document.querySelector(".error-field").innerText = "Пожалуйста, выберите для баннера только одно изображение!";
    }else{
        backgroundZeroing();

        let file = input.files[0],
            exampleArea = document.querySelector(".example-area"),
            src = URL.createObjectURL(file);

        exampleArea.innerText = "";
        exampleArea.style.background = `url(${src}) no-repeat`;
        exampleArea.style.backgroundSize = "contain";
    }
}

function oneColor(){
    // Функция, ставящая фоном баннера сплошную заливку

    backgroundZeroing();

    let exampleArea = document.querySelector(".example-area");
    exampleArea.innerText = "";
    exampleArea.style.backgroundColor = document.querySelector("input[name='color-plain']").value;
}

function gradientFill(){
    // Функция, ставящая заливкой градиент, по заданным пользователям параметрам.
    
    backgroundZeroing();

    let exampleArea = document.querySelector(".example-area");
    exampleArea.innerText = "";

    let color1 =  document.querySelector("input[name='color-grade1']").value,
        color2 =  document.querySelector("input[name='color-grade2']").value,
        typeGradient = document.querySelector("select[name='gradient-type']").value,
        directionGradient = document.querySelector("select[name='gradient-direction']").value;

    switch (typeGradient){
        case 'linear':
            exampleArea.style.background = `${typeGradient}-gradient(to ${directionGradient},${color1},${color2})`;
            break;
        case 'radial':
            exampleArea.style.background = `${typeGradient}-gradient(at ${directionGradient},${color1},${color2})`;
            break;
        case 'repeating-linear':
            document.querySelector(".for-repeat-linear").style.display = "block";
            let inputDepth = document.querySelector("input[name='depth-line']");
            let depthLine = inputDepth.value;
            exampleArea.style.background = `${typeGradient}-gradient(to ${directionGradient},${color1},${color2} ${depthLine}px)`;

            inputDepth.oninput = ()=>{
                let inputDepth = document.querySelector("input[name='depth-line']");
                let depthLine = inputDepth.value;
                exampleArea.style.background = `${typeGradient}-gradient(to ${directionGradient},${color1},${color2} ${depthLine}px)`;
            };
            break;
        case 'repeating-radial':
            // заглушка на ширину
            // + надо приделать выбор формы и положения центра
            exampleArea.style.background = `${typeGradient}-gradient(at ${directionGradient},${color1},${color2} 10px)`;
            break;
    }


}

function addTextInBanner(){
    // Функция, добавляющая(введённый пользователем) текст в баннер

    let textArea = document.querySelector("textarea[name='banner-text']").value;
};