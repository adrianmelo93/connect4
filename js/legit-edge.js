
  module.exports = function isLegitEdge(prev, current){
  var thisID = current.id.split("x");
  var thisRow = Number(thisID[1]);
  var thisCol = Number(thisID[2]);
  var activeID = prev.id.split("x");
  var activeRow = Number(activeID[1]);
  var activeCol = Number(activeID[2]);
  if (thisRow==activeRow && thisCol==activeCol-1) return "right";
  if (thisRow==activeRow && thisCol==activeCol+1) return "left";
  if (thisCol==activeCol && thisRow==activeRow-1) return "down";
  if (thisCol==activeCol && thisRow==activeRow+1) return "up";
  return false;
}
