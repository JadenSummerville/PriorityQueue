import { CrownList } from "./DataStructures/CrownList";
import { DnaryQueue } from "./DataStructures/DnaryQueue";

export class PriorityQueue<T>{
    private dataStructure;
    private valueFunction;
    constructor(valueFunction, dataStructure?){
        this.valueFunction = valueFunction;
        if(dataStructure){
            this.dataStructure = dataStructure;
            return;
        }
        this.dataStructure = new CrownList<T>();
    }
    push(value: T): void{
        var priority = this.valueFunction(value);
        this.dataStructure.push(value, priority);
    }
    pop(): T{
        return this.dataStructure.pop().item;
    }
    peak(): T{
        return this.dataStructure.peak().item;
    }
    size(): number{
        return this.dataStructure.length;
    }
    display(): void{
        this.dataStructure.display();
    }
    isEmpty(): boolean{
        return this.dataStructure.isEmpty();
    }
}
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
let priorityQueue = new PriorityQueue<string>(valueFunction, new DnaryQueue<string>(2));
priorityQueue.push("Percy");
priorityQueue.push("Jaden");
priorityQueue.push("Scott");
priorityQueue.push("Rocko");
while(!priorityQueue.isEmpty()){
    console.log(priorityQueue.pop());
}