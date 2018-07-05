interface Constructable<T> {
    new(input) : T;
}

declare interface LinearAlgebra {
    Matrix: Constructable<la.Matrix>;
}

declare function la(): LinearAlgebra;

declare module la {
    interface Matrix {
        rows: number;
        cols: number;
        data: number[][];
        
        constructor(input: number[][]);
        
        mul(m: Matrix): Matrix;
        div(m: Matrix): Matrix;
        plus(m: Matrix): Matrix;
        minus(m: Matrix): Matrix;
        dot(m: Matrix): Matrix;
        log(): Matrix;
        sigmoid(): Matrix;
        
        mul_(m: Matrix): Matrix;
        div_(m: Matrix): Matrix;
        plus_(m: Matrix): Matrix;
        minus_(m: Matrix): Matrix;
        dot_(m: Matrix): Matrix;
        log_(): Matrix;
        sigmoid_(): Matrix;

        trans(): Matrix;
        trans_(): Matrix;
    
        mulEach(num: number);
        plusEach(num: number);
    
        identity(size: number): Matrix;
        scalar(size: number, num: number): Matrix;
        zero(rows: number, columns: number): Matrix;
        reshapeFrom(data: number[][], rows: number, columns: number): Matrix;
    
        map(funct: (v:number) => number);
        eleMap(funct: (v:number, row: number, column: number) => number);
    
        getSum(): number;
    
        clone(): Matrix;
    
        toArray(): number[][];
    }
}

declare module 'linear-algebra' {
    export = la;
}