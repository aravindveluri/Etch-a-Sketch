//Creates and structures the page with a heading, appropriate buttons and a sketch pad.
function layoutPage(){
    
    let mainContainer = document.createElement('div');
    mainContainer.classList.add("main");
    
    let heading = document.createElement('h1');
    heading.textContent = "Etch-a-Sketch!";
    
    let buttonLayout = document.createElement('div');
    buttonLayout.classList.add("button-container");
    
    let reset = document.createElement('button');
    reset.textContent = "Reset";
    reset.classList.add("reset");
    
    let random = document.createElement('button');
    random.textContent = "Random Color";
    random.classList.add("random");
    
    let defaultBlack = document.createElement('button');
    defaultBlack.textContent = "Default(Black)";
    defaultBlack.classList.add("default");
    
    buttonLayout.appendChild(reset);
    buttonLayout.appendChild(random);
    buttonLayout.appendChild(defaultBlack);


    let sketchPad = document.createElement('div');
    sketchPad.classList.add("container");
    for (let i = 0; i < 256; i++) {
    
        let cell = document.createElement('div');
        cell.classList.add("cell");
        cell.setAttribute("id", "c" + (i+1).toString());
    
        sketchPad.appendChild(cell);
    }

    mainContainer.appendChild(heading);
    mainContainer.appendChild(buttonLayout);
    mainContainer.appendChild(sketchPad);

    document.body.appendChild(mainContainer);
}

//Initializes the style and functionality of sketch pad, along with styling other elements on the page.
function initStyle(defBlack){
    
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "rgb(141, 139, 155)";
    
    let heading = document.querySelector("h1");
    
    heading.style.fontFamily = "Sans-Serif";
    heading.style.textAlign = "center";
    heading.style.margin = "50px auto 20px auto";
    heading.style.fontSize = "4em";
    heading.style.color = "white";
    heading.style.textShadow = "3px 3px red"

    let buttons = document.getElementsByTagName("button");

    let buttonContainer = document.querySelector(".button-container");
    
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "rgb(255, 200, 204)";
        buttons[i].style.color = "black";
        buttons[i].style.fontSize = "2em";
        buttons[i].style.padding = "0.3em";
        buttons[i].style.margin = "0.5em";
        buttons[i].style.borderRadius = "25px";    
        buttons[i].style.transition = "all 0.3s";

    }

    let sketchArea = document.querySelector(".container");

    sketchArea.style.margin = "auto";
    sketchArea.style.width = "700px";
    sketchArea.style.height = "650px";
    sketchArea.style.display = "grid";
    sketchArea.style.gridTemplateColumns = "repeat(16, 1fr)";
    sketchArea.style.gridTemplateRows = "repeat(16, 1fr)";
    
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.boxSizing = "border-box";
        cells[i].style.border = "0.1em solid rgba(0, 0, 0, 0.035)";
        cells[i].style.backgroundColor = "white"
    }


    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseover',defBlack); 
    }

}

//Adds reset button functionality, and allows to choose the size of the sketch pad.
function addReset(defBlack){
    
    let reset = document.querySelector(".reset");
    
    reset.addEventListener('click', function(){
        reset.style.backgroundColor = "black";
        reset.style.color = "white";
        reset.style.transform = "scale(0.9)";
        
        reset.addEventListener('transitionend', function(){
            reset.style.backgroundColor = "rgb(255, 200, 204)";
            reset.style.color = "black";
            reset.style.transform = "scale(1.0)";
        });
        
        let size = prompt("Enter the number of rows/columns: ", "16");
        
        //Do nothing is user inputs an illegal string(which has characters other than digits). 
        if(isNaN(Number(size))){
            return;
        }
        //Prompt until user inputs a number in valid range or an illegal string
        while( Number(size) <= 0 || !Number.isInteger(Number(size)) || Number(size) >100 ){    
            size = prompt("Please enter an integer value between 1 and 100");
            if(isNaN(size)){
                return;
            }
        }
        
        let container = document.querySelector(".container");
        container.style.gridTemplateColumns = "repeat(" + size + ", 1fr";
        container.style.gridTemplateRows = "repeat(" + size + ", 1fr";
        
        while(container.firstChild){
            container.firstChild.removeEventListener('mouseover', defBlack);
            container.removeChild(container.firstChild);
        }
        
        for (let i = 0; i < size*size; i++) {
            
            let cell = document.createElement('div');
            
            cell.classList.add("cell");
            cell.setAttribute("id", "c" + (i+1).toString());
            cell.style.boxSizing = "border-box";
            cell.style.border = "0.1em solid rgba(0, 0, 0, 0.035)";
            cell.style.backgroundColor = "white";
            
            cell.addEventListener('mouseover', defBlack);

            container.appendChild(cell);
        }
    });
    return;    
}

//Adds the functionality of random button which sets sketch color to a random color
function addRandom(defBlack, randColor){
    
    let randButton = document.querySelector(".random");
    randButton.addEventListener('click', function(){
        randButton.style.backgroundColor = "black";
        randButton.style.color = "white";
        randButton.style.transform = "scale(0.9)";

        randButton.addEventListener('transitionend', function(){
            randButton.style.backgroundColor = "rgb(255, 200, 204)";
            randButton.style.color = "black";
            randButton.style.transform = "scale(1.0)";

        });

        let cells = document.querySelectorAll(".cell");
    
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('mouseover', defBlack);   
            cells[i].addEventListener('mouseover', randColor);
        }
        
    });
    return;    
}

//Adds the functionality of default button which sets sketch color to black
function setDefault(defBlack, randColor){
    let defaultButton = document.querySelector(".default");
    defaultButton.addEventListener('click', function(){
        defaultButton.style.backgroundColor = "black";
        defaultButton.style.color = "white";
        defaultButton.style.transform = "scale(0.9)";


        defaultButton.addEventListener('transitionend', function(){
            defaultButton.style.backgroundColor = "rgb(255, 200, 204)";
            defaultButton.style.color = "black";
            defaultButton.style.transform = "scale(1.0)";

        });
        let cells = document.querySelectorAll(".cell");
    
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('mouseover', randColor);
            cells[i].addEventListener('mouseover', defBlack);
        }
    });
    return;
}
//Main function
function main(){

    //Function that changes the color of targetCell to black.
    function defBlack(targetCell){
        targetCell.target.style.backgroundColor = "black";
    }

    //Function that changes the color of targetCell to a randomly generated color.
    function randColor(targetCell){
        targetCell.target.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + ", " + 
                                                    Math.floor(Math.random() * 256) +
                                                    ", " + Math.floor(Math.random() * 256) + ")";
    }

    //Layout page, inititalize styles, and add button functionalities.
    layoutPage();

    initStyle(defBlack);
    
    addReset(defBlack);
    
    addRandom(defBlack, randColor);
    
    setDefault(defBlack, randColor);    
    
}

main();
