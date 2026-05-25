// console.log("1");

// await setTimeout(() => {
//    console.log("2");
// }, 5000);

// console.log("3");


// function one() {
//     console.log("one");
// }

// function two() {
//     one();
//     console.log("two");
// }

// two();

// ##################

// const a = () => {
//     const b = () => {
//         const c = () => {
//             console.log("Call c");
//         };

//         c();
//         console.log("Call b");
//     };
//     b();
//     console.log("Call a");
// };

// a();


//  ##################


// console.log("1");

// setTimeout(() => {
//    console.log("2");
// }, 0);

// Promise.resolve().then(() => {
//    console.log("3");
// });

// console.log("4");

// async function test() {
//     console.log("5");
// }
// await test();


// const p = new Promise((resolve, reject) => {
//     resolve("Success");
// })

// const thenPromise = p.then(() => {
//     const a = 10;
//     return a;
// })
// const catchPromise = p.catch((err) => {
// return err;

// })

// const finallyPromise = p.finally(() => {
//    return "final call";
// });



// // setTimeout(() => {
//    console.log(thenPromise);
//    console.log(catchPromise);
//    console.log(finallyPromise);
// // }, 10000);



// let p1 = Promise.resolve("A");
// let p2 = Promise.resolve("B");

// Promise.all([p1, p2])
// .then(function(values) {
//   myDisplayer(values);
// });

// const count = true;
// const promise = new Promise ( (resolve ,reject) => {
//       console.log("Executor running");
//     if(count){
//         resolve("Promise resolved");
//     }else{
//         reject("Promise rejected");
//     }
// }).then((value) => {
//     console.log(value)
// }).catch((error) => {
//     console.log(error);
// });


// const hello = async (name) => {
//     return `Hello, ${name}!`;
// }


// console.log(hello("Abhishek"));

//  Closure 

// function greet (){
//     const name = "Abhishek";

//     return function withHello(){
//         console.log(`Hello Mr. ${name}`);
//     }
// }

// greet();
// const greetFunction = greet();

// console.log(greetFunction.withHello());


// function counter() {

//     let count = 0;

//     return {
//         increment : function () {
//             count = count + 1 ;
//         },

//         reset : function () {
//             count = 0;
//         } ,

//         showCount : function () {
//             console.log(count);
//         }
//     }

// }

// const counterFn = counter();

// counterFn.increment();
// counterFn.increment();
// counterFn.increment();



// console.log(counterFn.showCount());

// counterFn.reset();
// console.log(counterFn.showCount());



// const name = "Abhishek";
// function greet() {
//     console.log(`Hello ${name}`);
// }


const arr = [64, 34, 25, 12, 22, 11, 90];


function sort(arr) {
    for(let i = 0 ; i < arr.length ; i ++ ){
        let first = arr[i];
        let second = arr[i + 1];
        if(first > second){
            let old_second = second;
            arr[i + 1] = first;
            arr[i] = old_second;
        }
        console.log(arr);
    }
}
sort(arr);