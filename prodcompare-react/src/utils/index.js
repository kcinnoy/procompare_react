const rank = (arr) => {
  let sorted = arr.slice().sort(function(a,b){
    return a-b;
  });
  let ranks = arr.slice().map(function(v){ 
    return sorted.indexOf(v)+1;
  });
  return ranks;
};


const sortUniqueValues = ary => {
  Array.prototype.contains = function(v) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === v) return true;
    }
    return false;
  };
  
  Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.contains(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
  }
  
  const uniques = ary.unique();
  return uniques.sort((a, b) => a-b);
};
export {
  rank,
  sortUniqueValues
};