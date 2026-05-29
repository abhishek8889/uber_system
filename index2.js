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


// const arr = [64, 34, 25, 12, [22, 11, [90 ,60]]];


//  ########### Spread Operator ####### 
// const newR = [...arr , 99 ,88];
// console.log(newR);
// console.log(arr);


// let user = {
//     "name" : "Abhishek",
//     "age" : 25
// }

// let userDetails  = {
//     ...user ,
//     first_name : "Abhishek",
//     last_name : "Sharma" ,
// }
// let name  = "abhsihek";

// console.log(...name);



//  ############# Rest Parameters #############
// const num = "5"  + 2 ;

// console.log(typeof num)
// console.log(num)

// function numFun(a , b , ...restParam){
//     let newArr = [ a ,b , ...restParam];
//     // console.log(newArr);
//     let [var_1  , ...var_rest] = newArr;
    
//     console.log(var_1 )
//     console.log(var_rest)
// }

// numFun(5 , 9 , 50 , 40 , 80 ,78 ,90);


//  ############# Object Literal #############


// function hello (full_name , my_age){
//     return {
//          full_name,
//          my_age
//     }
// }

// const fullName = "abhishek sharma"

// const obj = {
//     fullName
// }

// console.log(obj)

//  ########## For Of ############## 

// let arr2 = [3, 5,2,5];

// for(let ar of arr2){
//     console.log(ar);
// }

// const greet = () => {
//     console.log('Hello')
//     return "ghelo"
// }
// console.log(greet())

// const test = (x ,y) => x * y ;


// console.log(test(4 ,9))

// var a ;

// console.log(a)

// a = 50;

// const arra = [5 , 9 , 50 , 40 , 80 ,78 ];

// arra.forEach( (val , ind) => {
//     console.log(`ind ${ind} : val ${val}`);
// });

