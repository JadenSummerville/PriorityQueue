import { parallelMax } from "../Tools/ParallelMax";
import { assert } from "../Tools/assert";
import { isInteger } from "../Tools/isInteger";
import { swap } from "../Tools/swap";
import { findMax } from "../Tools/findMax";

export class CrownList<T>{
    body: T[];
    bodyPriority: number[];
    sizeOfList: number;
    DEBUG: boolean = false;
    USEPROCESSORS: boolean = false;
    constructor(USEPROCESSORS?: boolean){
        this.body = [];
        this.bodyPriority = [];
        this.sizeOfList = 0;
        if(USEPROCESSORS != undefined){
            this.USEPROCESSORS = USEPROCESSORS;
        }
        this.chechRep();
    }
    chechRep(): void{
        if(this.DEBUG){
            assert(this.sizeOfList >= 0);
            assert(isInteger(this.sizeOfList));
            assert(this.body.length == this.bodyPriority.length);
            var max: number | null = this.findMax(1, this.sizeOfList);
            if(max !== null){
                assert(this.bodyPriority[max] <= this.bodyPriority[0]);
            }
        }
    }
    push(item: T, priority: number): void{
        this.chechRep();
        if(this.isEmpty()){
            this.body[0] = item;
            this.bodyPriority[0] = priority;
            this.sizeOfList = 1;
            this.chechRep();
            return;
        }
        this.body.push(item);
        this.bodyPriority.push(priority);
        if(priority > this.bodyPriority[0]){
            swap(this.body, 0, this.sizeOfList);
            swap(this.bodyPriority, 0, this.sizeOfList);
        }
        this.sizeOfList++;
        this.chechRep();
    }
    pop(){
        this.chechRep();
        if(this.isEmpty()){
            throw new Error("Cannot pop from CrownList while CrownList is empty.");
        }
        var goal = this.peak();
        if(this.sizeOfList == 1){
            this.sizeOfList = 0;
            this.chechRep();
            return goal;
        }
        swap(this.body, 0, this.sizeOfList - 1);
        swap(this.bodyPriority, 0, this.sizeOfList - 1);
        this.body.pop();
        this.bodyPriority.pop();
        var max: number = (this.findMax(1, this.sizeOfList - 1) as number);
        if(this.bodyPriority[max] > this.bodyPriority[0]){
            swap(this.body, 0, max);
            swap(this.bodyPriority, 0, max);
        }
        this.sizeOfList--;
        this.chechRep();
        return goal;
    }
    size(): number{
        this.chechRep();
        return this.sizeOfList;
    }
    isEmpty(): boolean{
        this.chechRep();
        return this.sizeOfList == 0;
    }
    private validPlace(place: number): boolean{
        return isInteger(place) && place >= 0 && place < this.bodyPriority.length;
    }
    private findMax(lo: number, hi: number): number | null{
        /*
        if(lo >= hi){
            return null;
        }
        var max: number = this.bodyPriority[lo];
        var maxPlace: number = lo;
        for(var i = lo + 1; i != hi + 1 && i != this.bodyPriority.length; i++){
          if(this.bodyPriority[i] > max){
            max = this.bodyPriority[i];
            maxPlace = i;
          }
        }
        return maxPlace;
        */
        var goal: {value: number, place: number} | null = null;
        if(this.USEPROCESSORS){
            var promise: Promise<{value: number; place: number} | null> = parallelMax(this.bodyPriority, lo, hi);
            const a = async () => {
                goal = await promise;
            };
            a();
        }else{
            goal = findMax(this.bodyPriority, lo, hi);
        }
        if(goal == null){
            return null;
        }
        return goal.place;
    }
      peak(){
        this.chechRep();
        var goal = {item: this.body[0],
        priority: this.bodyPriority[0]};
        this.chechRep();
        return goal;
      }
      display(items: boolean): void{
        var array = this.bodyPriority;
        if(items){
            //array = this.body;
        }
        array.forEach((item, i) => {
            console.log(item);
            if(i == 0){
                console.log("");
            }
        });
        console.log("");
      }
    /**
     * @requires array is not edited. Can be read.
    */
    getElements(): T[]{
        return this.body;
    }
}
//var a = new CrownList<number>(false);
//for(var i: number = 0; i != 10_000; i++){
//    a.push(1, 1);
//}
//console.log("a")
//while(!a.isEmpty()){
//    a.pop();
//}
//console.log("b")
//a.display(true);
//a.push(0, 0);
//a.push(5, 5);
//a.push(2, 2);
//a.display(true);