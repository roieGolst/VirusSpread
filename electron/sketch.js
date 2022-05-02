function setup() {
    createCanvas(800, 800);
    stroke(0);
    noStroke();
    fill(0, 0, 0);
    noLoop();
  } 

function draw() {
    
    scale(7.8);

    fetchAndDrow();

}



async function fetchData() {
    let pepole = await window.pepoleAPI.getPepole()
    return pepole
}


async function fetchAndDrow() {
    let pepole =  await fetchData();
    
    sketchPepole(pepole)

    setTimeout(() => {
        fetchAndDrow()
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
