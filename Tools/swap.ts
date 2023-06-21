export function swap<T>(array: T[], first: number, last: number): void{
    if(first < 0 || last < 0 || first >= array.length || last >= array.length){
        throw new Error("Values out of bound");
    }
    var o: T = array[first];
    array[first] = array[last];
    array[last] = o;
}