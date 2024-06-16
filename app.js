
let wordsArray = ["apple", "breeze", "shadow", "castle", "forest", "garden", "heroic", "island", "journey", "knight", "lantern", "melody", "noble", "ocean", "palace", "quest", "rhythm", "sunset", "treasure", "unity", "valley", "whisper", "beacon", "daring", "ember", "fortune", "glisten", "haven", "xylophone", "zenith"];


let userinput=document.querySelector("#userinput");
let systeminput=document.querySelector("#systeminput");

let words=0; //correct words
let chars=0;
let accuracy=0;

let wordch=document.querySelector("#words");
let charch=document.querySelector("#chars");
let accuracych=document.querySelector("#acc");

let chtime=document.querySelector("#chtime");
let time=60;
chtime.value=time;
let lasttime=60;
let isstarted=false;

chtime.addEventListener("input",()=>{
    time=chtime.value;
    lasttime=chtime.value;
})

chtime.addEventListener("keydown",function(event){
    if(event.key=="Backspace" || event.key=="0" || event.key=="1" || event.key=="2" || event.key=="3" || event.key=="4" || event.key=="5" || event.key=="6" || event.key=="7" || event.key=="8" || event.key=="9"){
        
    }else if(event.key=="Enter"){
        userinput.focus();
    }else{
        event.preventDefault();
    }
})


function timer(){
    let timera= setInterval(()=>{
        time--;
        //chtime.innerText=time;
        chtime.value=time;
        if(time==0){
            clearTimeout(timera);
            userinput.disabled = true;
            result();
        }
    },1000);
}


function result(){
    document.querySelector("#wpm").textContent=words*(60/lasttime);
    document.querySelector("#cpm").textContent=chars*(60/lasttime);
    document.querySelector("#accuracy").textContent=`${Math.floor(accuracy)}%`;
    document.querySelector("#result").style.visibility="visible";
    document.querySelector("#upper").style.filter="blur(5px)";
}


document.querySelector("#okay").addEventListener("click",restart);

function restart(){
    words=0;
    chars=0;
    accuracy=0;
    
    isstarted=false;
    wrongword=0;
    systeminput.value="";
    tempchars=0;
    for(let i=0;i<=7;i++){
        addword();
    }
    userinput.value="";
    userinput.disabled=false;
    userinput.focus();
    document.querySelector("#result").style.visibility="hidden";

    chtime.innerText=60;
    wordch.innerText=0;
    charch.innerText=0;
    accuracych.innerText=0;

    iscorrect=true;
    wrong=0;

    lastword.innerText="";

    document.querySelector("#upper").style.filter="blur(0px)";

    chtime.disabled=false;
    time=lasttime;
    chtime.value=lasttime;
    
}

function addword(){
    let random = Math.floor(Math.random()*30);
    if(systeminput.value===""){
        systeminput.value=wordsArray[random];
    }else{systeminput.value=systeminput.value+" "+wordsArray[random];}
}

for(let i=0;i<=7;i++){
    addword();
}

let tempchars=0;
let totalword=0;
let wrongword=0;

function update(){ 
    
    accuracy=(words/(words+wrongword))*100;
    wordch.innerText=words*(60/lasttime);
    charch.innerText=chars*(60/lasttime);
    accuracych.innerText=Math.floor(accuracy);
}

function deleteword(){
    let index=systeminput.value.indexOf(" ");
    systeminput.value=systeminput.value.slice(index+1); //that space also
}

let iscorrect=true;
let wrong=0;

//userinput keyboard logic
userinput.addEventListener("keydown",function(event){
    if(isstarted==false){
        timer();
        isstarted=true;
        chtime.disabled = true;
    }

    if(wrong==0){
        iscorrect=true;
    }else{
        iscorrect=false;
    }

    if(event.key == 'Backspace' && iscorrect==false){
        wrong--;
    }else if((event.key=='Backspace' && lastword.innerText.length>0) && iscorrect==true){
        //event.preventDefault();
        tempchars--;
        let tempte=lastword.innerText;
        let ch=tempte[tempte.length-1];
        systeminput.value=ch+systeminput.value;
        //userinput.value=userinput.value.slice(0,-1);
        


    }else if(event.key==='Backspace' && iscorrect==true){
       event.preventDefault();
    }else if(event.code=="Space"){
       if(systeminput.value[0]==" " && iscorrect==true){ //right hai word
        systeminput.value=systeminput.value.slice(1);
        words++;
        chars=chars+tempchars;
        tempchars=0;
        
       }else{ //wrong hai words
        wrong=0;
        
        deleteword();
        wrongword++;
        tempchars=0;

       }

        addword();
        update();
        

    }else if(event.key==systeminput.value[0] && iscorrect==true){
       // let temp=systeminput.value;
        systeminput.value=systeminput.value.slice(1);
        tempchars++;

    }else if(event.key!=systeminput.value[0]){
        wrong++;
    }else if(event.key==systeminput.value[0] && iscorrect==false){
        wrong++;
    }
})

let lastword=document.querySelector("#lastword");

function highlight(){
    let content = userinput.value;
    let arr=content.split(" ");
    lastword.innerText=arr[arr.length-1];

    if(iscorrect==true){
        lastword.setAttribute("class","true");
    }else if(iscorrect==false){
        lastword.setAttribute("class","false");
    }

}

userinput.addEventListener("input",()=>{
    if(wrong==0){
        iscorrect=true;
    }else{
        iscorrect=false;
    }

    highlight();

})

lastword.addEventListener("click",()=>{
    userinput.focus();
})
