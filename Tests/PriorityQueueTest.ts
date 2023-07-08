import { PriorityQueue } from "../PriorityQueue";

var valueFunction = function(word: string): number{
    var value;
    switch(word){
        // Top priority
        case "Scott":
            value = 100;
            break;
        // Me
        case "Jaden":
            value = 50;
            break;
        // Friends and family
        case "John":
        case "Jen":
        case "Darnel":
            value = 10;
            break;
        // Dogs
        case "Rocko":
        case "Percy":
            value = 5;
            break;
        // Not on list
        default:
            value = 0;
    }
    return value;
}
let priorityQueue = new PriorityQueue<string>(valueFunction);
for(var i: number = 0; i != 10; i++){
    priorityQueue.push("Percy");
    priorityQueue.push("Jaden");
    priorityQueue.push("Scott");
    priorityQueue.push("Rocko");
}
let list = priorityQueue.getElements()
console.log("Printing items in queue:");
for(var i = 0; i != list.length; i++){
    console.log(list[i]);
}
console.log("Popping items from queue:");
while(!priorityQueue.isEmpty()){
    console.log(priorityQueue.pop());
}
console.log("Last item has been popped.");