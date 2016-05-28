
var select = [{"name":"도라지"}, {"name":"청포묵"}, {"name":"쌀"}];


var ingredients = [];

// var json = JSON.stringify(select);
// console.log(json);

for(var i in select) {
  console.log(select[i].name);
  ingredients[i] = select[i];
  console.log(ingredients[i].name);
}
// console.log(ingredients);
// console.log(ingredients[1].name);

// var array = json.split(",");
// console.log(array);
// for(var i in array){
//   ingredients[i] = JSON.parse(array[i]);
// }
//
// for(var i in ingredients) {
//   console.log(ingredients[i].name);
// }
