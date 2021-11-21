
/*
*
* The purpose of this program is to make a simple equivalent component calculator.
* At first I wanted to make a program where you would be able to draw the circuit diagram
* and have the equivalent circuit produced directly on browser (with an image showing the  "Thevenin or Norton equivalent").
* However, this would be too complex for a single weekend.
*
*/

//TODO: Make sure to correct the units of the answers

/*
 * Each element has a value, a unit, a type, and based on user input a unit degree
 *
 * @param
 *  v - numerical value
 *  u - degree of value: Kilo, Mega, Micro ...
 *  t - element type: R - Resistor, C - Capacitor, L - Inductor
 * 
 */
class CircuitElem{
    constructor(v,u,t){
        this.value = v; 
        this.unitDegree = u; 
        this.type = t; 
        this.unitName;    //  Ohms, Farads, Henrys.
    }
}

//-----------------------------get HTML elements -----------------------//
let t1 = new CircuitElem();
let t2 = new CircuitElem();

let seriesAns = document.getElementById("seriesAns");
let parallelAns = document.getElementById("parallelAns"); 
let btn = document.getElementById("btnFindME");

// ---------------------------set web elements--------------------//
function setElemValues(){

    t1.value = parseInt(document.getElementById("t1").value);
    t1.unitDegree = parseInt(document.getElementById("u1").value);

    t2.value = parseInt(document.getElementById("t2").value);
    t2.unitDegree = parseInt(document.getElementById("u2").value);


    let info = document.getElementById("info").value;
    let typeWithName = /\w+/g
    let elemInfo = info.match(typeWithName)
 
    t1.type = t2.type = elemInfo[0];
    t1.unitName = t2.unitName = elemInfo[1];     
}

//------------------------Equivalence function----------------------/
let getEquivalence =(t1,t2) =>{
    
    setElemValues();
    let parallelEq = -1;
    let seriesEq = -1;
    let a = t1.type.toString();  
    let b = t2.type.toString();
    let unit = t1.unitName;
    [parallelEq,seriesEq] = getSum(a,b);

    let pEq = parallelEq.toFixed(2) + " "+unit;
    let sEq = seriesEq.toFixed(2) + " " +unit; 
    
    return [sEq, pEq];
}
   
/*
 *
 * Helper functions
 *  
 */


function inverseSum(t1, t2){
    let ta = t1.value * Math.pow(10,t1.unitDegree)
    let tb = t2.value * Math.pow(10,t2.unitDegree)
    console.log("inverseSum: ")
    return Math.pow((1/ta) + (1/tb),-1)/formater(t1,t2)
}
function Sum(t1, t2){
    let ta = t1.value * Math.pow(10,t1.unitDegree)
    let tb = t2.value * Math.pow(10,t2.unitDegree)

    return (ta + tb)/formater(t1,t2)
}
function getSum(a, b){
    let p;
    let s;
    if(a === b){
        switch(a){
            case "R":
            case "L":
                p = inverseSum(t1,t2);
                s = Sum(t1,t2);
                break;
            case "C":
                p = Sum(t1,t2);
                s = inverseSum(t1,t2);
                break;
        }
    }
    return [p,s]
}
function formater(t1,t2){
    let a = t1.unitDegree
    let b = t2.unitDegree

    let minimum = (a,b) =>{
        return a==b?a:a<b?a:b;
    }

    console.log("formater: " + Math.pow(10,minimum(a,b)));

    return Math.pow(10,minimum(a,b))
}                   

btn.onclick = () =>{
  ans = [seriesAns.innerHTML, parallelAns.innerHTML] =  getEquivalence(t1,t2);
   console.log(ans);
}








 