var turn = 0;
var edges = [];
var redScore = 0;
var blueScore = 0;
var SIDES = 8;
var createTable = require('./creat-table.js');
var isLegitEdge = require('./legit-edge.js');


function handleClick(e){
  var activeElements = document.querySelectorAll(".active");
  if (activeElements.length > 0){
    var edge = isLegitEdge(activeElements[0], this);
    if ( edge ){
        activeElements[0].classList.toggle("active");
        processEdge(this, edge);
    }
    else{
      activeElements[0].classList.toggle("active");
      if (this.id != activeElements[0].id){
        this.classList.toggle("active");
      }

    }
  }
  else{
    this.classList.toggle("active");
  }
}

function processEdge(element, dir){
  if (turn % 2 === 0){
    element.innerHTML += `<div class='${dir}-blue'></div>`;
  }
  else{
    element.innerHTML += `<div class='${dir}-red'></div>`;
  }
  createEdge(element, dir);
  turn++;
}

function createEdge(element, dir){
  //[{r: _, c:_}, {r:_, c:_}]
  var dest = element.id.split("x");
  dest = {r : Number(dest[1]), c : Number(dest[2])};
  var orig;
  if (dir === 'left') orig = {r: dest.r, c: dest.c -1 };
  if (dir === 'right') orig = {r: dest.r, c: dest.c +1 };
  if (dir === 'up') orig = { r: dest.r -1, c: dest.c };
  if (dir === 'down') orig = {r: dest.r +1, c: dest.c };
  edges.push([orig, dest]);
  edges.push([dest, orig]);
  //check for square completion
  if (dir == 'left' || dir =='right') checkUpandDown();
  if (dir == 'up' || dir =='down') checkLeftandRight();
}

function checkUpandDown(){
  var lastEdge = edges.slice(-1)[0];
  var topLeft = {r:lastEdge[0].r-1, c: lastEdge[0].c};
  var topRight = {r:lastEdge[1].r-1, c: lastEdge[1].c};
  var bottomLeft = {r:lastEdge[0].r+1, c: lastEdge[0].c};
  var bottomRight = {r:lastEdge[1].r+1, c: lastEdge[1].c};
  if (topEdgeFound() && bottomEdgeFound()){
    //fill square above and below
    updateScores(2);
  }
  else if (topEdgeFound()){
    //fill square above
    updateScores(1);
  }
  else if (bottomEdgeFound()){
    //fill square below
    updateScores(1);
  }
  function topEdgeFound(){
    return findEdge(lastEdge[0], topLeft) &&
         findEdge(lastEdge[1], topRight) &&
         findEdge(topLeft, topRight);
  }
  function bottomEdgeFound(){
    return findEdge(lastEdge[0], bottomLeft) &&
        findEdge(lastEdge[1], bottomRight) &&
        findEdge(bottomLeft, bottomRight);
  }
}
function checkLeftandRight(){
  var lastEdge = edges.slice(-1)[0];
  var topLeft = {r:lastEdge[0].r, c: lastEdge[0].c-1};
  var topRight = {r:lastEdge[0].r, c: lastEdge[0].c+1};
  var bottomLeft = {r:lastEdge[1].r, c: lastEdge[1].c-1};
  var bottomRight = {r:lastEdge[1].r, c: lastEdge[1].c+1};
  if (leftSideFound() && rightSideFound() ){
    //fill both squares
    updateScores(2);
  }
  else if (leftSideFound() ){
    //fill square above
    updateScores(1);
  }
  else if (rightSideFound()){
    //fill square below
    updateScores(1);
  }
  function leftSideFound(){
    return findEdge(lastEdge[0], topLeft) &&
         findEdge(lastEdge[1], bottomLeft) &&
         findEdge(topLeft, bottomLeft);
  }
  function rightSideFound(){
    return findEdge(lastEdge[0], topRight) &&
        findEdge(lastEdge[1], bottomRight) &&
        findEdge(topRight, bottomRight)
  }
}

function updateScores(inc){
  if (turn-- % 2 === 0) blueScore+=inc;
  else redScore+=inc;
  console.log("turn: "+turn);
  document.getElementById('bluescore').innerHTML = blueScore;
  document.getElementById('redscore').innerHTML = redScore;
  if (edges.length === 2*2*SIDES*(SIDES-1)){
    if (redScore > blueScore) redWins();
    else if (redScore < blueScore) blueWins();
    else itsATie();
  }
}

function redWins(){
  alert('red Wins!');
}

function blueWins(){
  alert('blue wins!');
}

function itsATie(){
  alert("it's a tie!");
}

function findEdge(orig, dest){
  for (var i = 0; i < edges.length; i++){
    if (edges[i][0].r === orig.r && edges[i][0].c === orig.c
        && edges[i][1].r === dest.r && edges[i][1].c === dest.c)
        return true;
  }
  return false;
}

window.onload = function(){
  createTable(SIDES);
  document.querySelectorAll("#matrix td").forEach(function(e,i){
    e.onclick = handleClick;
  });
}
