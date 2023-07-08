//https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
//import { findMax } from "../Tools/ParallelMax";
import { findMax } from "../Tools/findMax";
import { assert } from "../Tools/assert";
import { isInteger } from "../Tools/isInteger";
import { swap } from "../Tools/swap";
export class DnaryQueue<T>{
    items: T[];
    priority: number[];
    d: number;
    DEBUG: boolean = false;
    USEPROCESSORS: boolean = false;
    constructor(d?: number, USEPROCESSORS?: boolean) {
      if(USEPROCESSORS != undefined){
        this.USEPROCESSORS = USEPROCESSORS;
      }
      if(!d){
        d = 2;
      }
      if(!isInteger(d)){
          throw new Error("d must be an integer.");
      }
      if(d <= 1){
          throw new Error("d must be greater than 1.");
      }
      this.items = [];
      this.priority = [];
      this.d = d;
      this.checkRep();
      }
      private checkRep(): void{
        if(this.DEBUG){
            assert(!!this.items);
            assert(!!this.priority);
            assert(isInteger(this.d));
            assert(this.d > 1);
            assert(this.items.length == this.priority.length);
            this.isLessThan(0);
        }
      }
      private isLessThan(parent: number): void{
        if(parent >= this.items.length){
          return;
        }
        var children: number[] | null = this.identifyChildrenPrivate(parent);
        if(children == null){
          return;
        }
        var max: number | null = this.findMax(children[0], children[1] + 1);
        if(max == null){
          return;
        }
        assert(this.priority[max] <= this.priority[parent]);
        for(var i: number = children[0]; i != children[1] + 1 && i != this.priority.length; i++){
          this.isLessThan(i);
        }
      }
      pop(){
        this.checkRep();
        if(this.isEmpty()){
          throw new Error("Cannot pop from DnaryQueue while DnaryQueue is empty.");
        }
        var goal = this.peak();
        swap(this.items, 0, this.items.length-1);
        swap(this.priority, 0, this.items.length-1);
        this.items.pop();
        this.priority.pop();
        if(!this.isEmpty()){
          this.percolateDown(0);
        }
        this.checkRep();
        return goal;
      }
      peak(){
        this.checkRep();
        if(this.isEmpty()){
          throw new Error("Cannot peak into DnaryQueue while DnaryQueue is empty.");
        }
        var goal = {
            item: this.items[0],
            priority: this.priority[0]
        };
        this.checkRep
        return goal;
      }
      push(item: T, priority: number){
        this.checkRep();
        this.items.push(item);
        this.priority.push(priority);
        this.percolateUp(this.priority.length-1);
        this.checkRep();
    }
    identifyChildren(child: number): number[] | null{
      this.checkRep();
      var arr: number[] | null = this.identifyChildrenPrivate(child);
      this.checkRep();
      return arr;
    }
    // Identify children in order of shortest and then greatest place in array.
    private identifyChildrenPrivate(child: number): number[] | null{
      if(!this.validPlace(child)){
        throw new Error("Out of bounds exception.");
      }
      var maxChild: number = (child+1)*this.d;
      if(maxChild >= this.priority.length){
        maxChild = this.priority.length - 1;
      }
      var lo: number = child*this.d+1;
      if(maxChild < lo){
        return null;
      }
      return [lo, maxChild];
    }
    private percolateDown(item: number): void{
      if(!this.validPlace(item)){
        throw new Error("item is not valid.");
      }
      var children: number[] | null = this.identifyChildrenPrivate(item);
      if(children === null){
        return;
      }
      var max: number | null = this.findMax(children[0], children[1] + 1);
      if(max == null || this.priority[item] >= this.priority[max]){
        return;
      }
      swap(this.items, max, item);
      swap(this.priority, max, item);
      this.percolateDown(max);
    }
    private percolateUp(item: number): void{
      if(!this.validPlace(item)){
        throw new Error("item is not valid.");
      }
      var parent: number = Math.floor((item-1)/this.d);
      if(!this.validPlace(parent)){
        return;
      }
      if(this.priority[item] < this.priority[parent]){
        return;
      }
      swap(this.priority, item, parent);
      swap(this.items, item, parent);
      this.percolateUp(parent);
    }
    private validPlace(place: number): boolean{
      return isInteger(place) && place >= 0 && place < this.priority.length;
    }
    private findMax(lo: number, hi: number): number | null{
      if(this.USEPROCESSORS){
        //
      }
      var goal: {value: number, place: number} | null = findMax(this.priority ,lo, hi);
      if(goal == null){
        return null;
      }
      return goal.place;
      /*
      var max: number = this.priority[lo];
      if(lo >= hi){
        return null;
      }
      var maxPlace: number = lo;
      for(var i = lo + 1; i != hi && i != this.priority.length; i++){
        if(this.priority[i] > max){
          max = this.priority[i];
          maxPlace = i;
        }
      }
      return maxPlace;
    */
    }
    display(items: boolean): void{
      this.checkRep()
      var str = "";
      var current: number = 0;
      var next: number = 1;
      for(var i: number = 0; i != this.items.length; i++){
        if(items){
          str = str + " " + this.items[i];
        }else{
          str = str + " " + this.priority[i];
        }
        current++;
        if(current == next){
          console.log(str);
          str = "";
          current = 0;
          next *= this.d;
        }
      }
      if(str != ""){
        console.log(str);
      }
      console.log("");
      this.checkRep();
    }
    size(): number{
      this.checkRep
      return this.items.length;
    }
    isEmpty(): boolean{
      this.checkRep;
      return this.size() == 0;
    }
    /**
     * @requires array is not edited. Can be read.
    */
    getElements(): T[]{
      this.checkRep();
      return this.items;
    }
}