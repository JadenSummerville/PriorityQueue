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
        this.dataStructure = new DnaryQueue<T>(2);
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
    /**
     * @requires array is not edited. Can be read.
    */
    getElements(): T[]{
        return this.dataStructure.getElements();
      }
}