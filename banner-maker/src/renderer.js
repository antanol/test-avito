window.onload = ()=>{
    let bannerSize = document.querySelector(".example-area");
    document.querySelector(".example-area-size").innerText = `${bannerSize.offsetWidth-2}*${bannerSize.offsetHeight-2}`;
};

function show_sub(index){
    let allSubs = document.querySelectorAll(".sub");
    for (let i=0; i<allSubs.length; i++){
        if (!allSubs[i].classList.contains("hidden-sub")){
            allSubs[i].classList.add("hidden-sub");
        }
    };

    let currentSub = allSubs[Number(index)];
    currentSub.classList.remove("hidden-sub");
    // switch(Number[index]){
    //     case '0':
    //         // пока заглушка
    //         break;
    //     case 1:
    //         oneColor();
    //         break;
    //     case '2':
    //         gradientFill();
    //         break;
    // }
};

function groundImage() {
    let input = document.querySelector(".banner-image");
    if (input.files.length > 1){
        // если кто-то решит через devTools проставить мультипл в input с загрузкой изображений
        document.querySelector(".error-field").innerText = "Пожалуйста, выберите для баннера только одно изображение!";
    }else{
        let file = input.files[0],
            exampleArea = document.querySelector(".example-area"),
            src = URL.createObjectURL(file);

        exampleArea.innerText = "";
        exampleArea.style.background = `url(${src}) no-repeat`;
        exampleArea.style.backgroundSize = "contain";
    }
}

function oneColor(){
    let exampleArea = document.querySelector(".example-area");
    exampleArea.innerText = "";
    exampleArea.style.backgroundColor = document.querySelector("input[name='color-plain']").value;
}

function gradientFill(){
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