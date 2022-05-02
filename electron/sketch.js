function setup() {
    createCanvas(800, 800);
    stroke(0);
    noStroke();
    fill(0, 0, 0);
    noLoop();
  } 

function draw() {
    scale(7.8);

    fetchAndDraw();
}



async function fetchData() {
    return  await window.pepoleAPI.getPepole();
}


async function fetchAndDraw() {
    let pepole =  await fetchData();
    
    sketchPepole(pepole);

    setTimeout(() => {
        fetchAndDraw();
    }, 16)
}
function sketchPepole(pepole) {
    background(100);    

    for(let  i = 0; i < pepole.length; i++) {
        if(pepole[i].infection) {
            push();

            fill(
                pepole[i].infection.color.r,
                pepole[i].infection.color.g,
                pepole[i].infection.color.b
            );

            ellipse(
                pepole[i].currentPosition.x,
                pepole[i].currentPosition.y, 
                1, 
                1
            );

            pop();
        }
        else {
            ellipse(
                pepole[i].currentPosition.x,
                pepole[i].currentPosition.y, 
                1, 
                1
            );
        }

    }
}