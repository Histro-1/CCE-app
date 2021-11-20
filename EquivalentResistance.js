class CircuitElem{
    constructor(v,u,t){
        this.value = v;
        this.unitDegree = u;
        this.type = t; // R - Resistor, C - Capacitor, L - Inductor
    }
}
let getEquivalence =(t1,t2) =>{
    setElemValues();

    let parallelEq;
    let seriesEq;
    if(t1.type+" " === t2.type+" "){
        switch(t1.type){
            case "R":
            case "L":
                parallelEq = Math.pow(inverseSum(t1,t2),-1);
                seriesEq = Sum(t1,t2);
                break;
            case "C":
                parallelEq = Sum(t1,t2);
                seriesEq = Math.pow(inverseSum(t1,t2),-1);
                break;
        }
    }
    else{
        console.log(t1.type +" "+ t2.type + " "+t2.value + " "+t2.unitDegree)
        parallelEq = seriesEq = "Type Conflict";
    }

    return [seriesEq, parallelEq];
}
function inverseSum(t1, t2){
    let ta = t1.value * Math.pow(10,t1.unitDegree)
    let tb = t2.value * Math.pow(10,t2.unitDegree)

    return(1/ta) + (1/tb);
}
function Sum(t1, t2){
    let ta = t1.value * Math.pow(10,t1.unitDegree)
    let tb = t2.value * Math.pow(10,t2.unitDegree)

    return ta + tb;
}


//-----------------------------get HTML elements -----------------------//
let t1 = new CircuitElem();
let t2 = new CircuitElem();

let seriesAns = document.getElementById("seriesAns");
let parallelAns = document.getElementById("parallelAns"); 
let btn = document.getElementById("btnFindME");

function setElemValues(){
    t1.value = parseInt(document.getElementById("t1").value);
    t1.unitDegree = parseInt(document.getElementById("u1").value);
    t2.type = t1.type = document.getElementById("type1").value;


    t2.value = parseInt(document.getElementById("t2").value);
    t2.unitDegree = parseInt(document.getElementById("u1").value);
   }
                                 

btn.onclick = () =>{
  ans = [seriesAns.innerHTML, parallelAns.innerHTML] =  getEquivalence(t1,t2);
   console.log(ans);
}






 