var index=1;
var offset = 0;
var direction =1;
function moveSlide(direction_p) {
    direction = direction_p
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.home-container');
    const btnr = document.getElementById('btnr');
    const btnl = document.getElementById('btnl');
    
    // Aggiorna l'indice
    // Sposta la traccia di una percentuale pari all'indice corrente
    if(direction==1 && index != slides.length){
        offset += -100;
        index +=1;
        console.log("prova");
    } else if(direction==-1 && index != 1){
        offset += 100;
        index -=1;
    }
    if(index == 1){
        btnl.setAttribute("disabled","true");
    }else{
        btnl.removeAttribute("disabled");
    }
    if(index == slides.length){
        btnr.setAttribute("disabled","true");
    }else{
        btnr.removeAttribute("disabled");
    }
    clearInterval(timer);
    timer = setInterval(myTimer, 10000);
    console.log(index,slides.length,offset);
    track.style.transform = `translateX(${offset}%)`;
}

timer = setInterval(myTimer, 10000);

function myTimer() {
    const slides = document.querySelectorAll('.home-container');
    if(direction ==1){
        if(index == slides.length){
            moveSlide(-1);
        }else{
            moveSlide(1);
        }
    }else{
        if(index==1){
            moveSlide(1);
        }else{
            moveSlide(-1);
        }
    }
}
