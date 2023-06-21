export function assert(assertation: boolean): void{
    if(assertation){
        return;
    }
    throw new Error("CheckRepViolated");
  }