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

function oneColor(){
    let exampleArea = document.querySelector(".example-area");
    exampleArea.innerText = "";
    exampleArea.style.backgroundColor = document.querySelector("input[name='color-plain']").value;
}

function gradientFill(){
    let exampleArea = document.querySelector(".example-area");
    exampleArea.innerText = "";

    let color1 =  document.querySelector("input[name='color-grade1']").value,
        color2 =  document.querySelector("input[name='color-grade2']").value;
    
    let typeGradient, 
        allGrads = document.querySelectorAll("input[name='gradient-type']");
    
    for (let grad of allGrads){
        if (grad.checked){
            typeGradient = grad.id;
            console.log(grad.id);
        };
    }

    exampleArea.style.background = `${typeGradient}-gradient(${color1},${color2})`;


}