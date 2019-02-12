
document.getElementById('login').onclick =  function wavingBaby(){
    let baby = document.getElementById('baby1');

    setTimeout(function(){ baby.setAttribute("src","./wave1.svg")}, 300) ; 
    setTimeout(function(){ baby.setAttribute("src","./wave2.svg")},600) ;
    setInterval(wavingBaby, 600); 

}
