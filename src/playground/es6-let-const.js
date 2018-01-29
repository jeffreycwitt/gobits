var nameVar = 'Andrew';
nameVar = "Mike";
console.log("nameVar", nameVar);

let nameLet = "Jeff";
nameLet = "Julie";

console.log("nameLet", nameLet);

const nameConst = "frank";

console.log("nameConst", nameConst);

function  getPetName(){
  let petName = "hal";
  return petName
}
getPetName();


//block scoping
var fullName = "jeffrey witt";
if (fullName){
  const firstName = fullName.split(" ")[0]
  console.log(firstName);
}

console.log(firstName);
