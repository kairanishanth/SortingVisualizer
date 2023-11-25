const n=15;  //size of the array
const array=[];  //declaring the array
init(); //dont need of pressing the button every time refresh it 

let audioCTx = null; //adding sound while sorting the bars 
function playNote(freq){
    if(audioCTx == null){
        audioCTx = new(
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }

    const dur=0.1;
    const osc =audioCTx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCTx.currentTime+dur);
    const node=audioCTx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0,audioCTx.currentTime+dur
    );
    osc.connect(node);
    osc.connect(audioCTx.destination);
}
function init(){
    for (let i=0; i<n; i++){  
        array[i]=Math.random();  //random values 0-9
    
    }
    showBars();
}

//bubble sort is inside of the play function which is going to perform algorithm
function play(){
    // bubbleSort(array);
    // showBars();
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);
}


function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();  // the shift metho takes out the first element of the moves array 
    const [i,j] = move.indices;
    if(move.type == "swap"){
    [array[i],array[j]]=[array[j],array[i]]; //swapping the values of those indices
    }

    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    //showBars(); //showing the bars 
    //showBars([i,j]);
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },150);
}


function bubbleSort(array){
    const moves=[]; //recording the swapping 
// implementing the sorting algorithm: BUBBLE SORT ALGO
do{
    var swapped=false;
    for(let i=1; i<array.length; i++){
        moves.push({indices:[i-1,i],type:"comp"});  //referesto i and j
        if(array[i-1]>array[i]){
            swapped = true;
            //which indices involve in the swap
            moves.push({indices:[i-1,i],type:"swap"});  //referesto i and j
            [array[i-1],array[i]]=[array[i],array[i-1]];
        }
    }
}while(swapped);
return moves;
}



function showBars(move){
//console.log(array)
//using for loop to add them indivisual bars on the page
container.innerHTML=""; //to avioid the problem of appending the bars to existig bars
for(let i=0; i<array.length; i++){
    const bar = document.createElement("div");
    bar.style.height = array[i]*100+"%";
    // bar.style.width="10px";
    // bar.style.backgroundColor = "black";
    bar.classList.add("bar");

    if(move && move.indices.includes(i)){
        bar.style.backgroundColor=
        move.type == "swap" ? "red":"blue";
    }
    container.appendChild(bar);
}
}