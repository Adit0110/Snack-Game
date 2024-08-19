//Game constants & variables
let inputDir={x:0,y:0};
const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const musicsound=new Audio('background.mp3');
let speed=5;
let score=0;
let lastprinttime=0;
let snakearray=[
    {x:13,y:15}
]
food={x:6,y:7};


//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastprinttime)/1000 < 1/speed){
        return;
    }
    lastprinttime=ctime;
    gameengine();
}
function isCollide(snake){
    //If you bump into yourself
    for (let i = 1; i < snakearray.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;

        }
    }
        //If you bump inti the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        return true;
        
        
    
}
function gameengine(){
    //part 1: Updating the snake array and food
    if(isCollide(snakearray)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over! Try again");
        snakearray=[{x:13,y:15}];
        musicsound.play();
        score=0;

    }
    //if you have eaten food, increment the score and regenerate the food
    if(snakearray[0].y===food.y && snakearray[0].x===food.x){
        foodsound.play();
        score+=1;
        if(score>hiscoreeval){
            hiscoreeval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreeval));
            hiscoreBox.innerHTML="Hiscore: "+hiscoreeval;

        }
        scoreBox.innerHTML="score:"+score;
        snakearray.unshift({x:snakearray[0].x + inputDir.x,y:snakearray[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake
    for (let i = snakearray.length-2; i >=0; i--) {
        
        snakearray[i+1]={...snakearray[i]};
    }
    snakearray[0].x+=inputDir.x;
    snakearray[0].y+=inputDir.y;
    //part 2:Display the snake and food
    //part 2:Display the snake

    board.innerHTML="";
    snakearray.forEach((e,index)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeelement.classList.add('head')

        }
        else{
        snakeelement.classList.add('snake')
    }
        
        board.appendChild(snakeelement);

    });
    //part 2:Display the food
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food')
    board.appendChild(foodelement);


}




//main logic start here

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreeval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreeval));
}
else{
    hiscoreeval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    movesound.play();
    musicsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0 ;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
            

    
        default:
            break;
    }

});
