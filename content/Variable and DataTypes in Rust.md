+++
title = "Part 1: Variable and DataTypes in Rust"
description = "Variables are the basic building blocks of a programming language. It holds data in the computer memory during runtime. The data that a variable hold can be different types. Like other languages, Rust has 2 kinds of high-level data types. Scalar and Compound . Scalar contains a single value whereas Compound holds multi-value data in the memory during run time."
date = 2024-04-30
[taxonomies] 
tags = ["Open-Source", "RUST"]
+++

Variables are the basic building blocks of a programming language. It holds data in the computer memory during runtime. The data that a variable hold can be different types. Like other languages, Rust has 2 kinds of high-level data types. Scalar and Compound . Scalar contains a single value whereas Compound holds multi-value data in the memory during run time. the default data types are explained in the figure below:

Now if you mark in the figure we use let keyword to declare a variable and the value of the variable is on the right side of the = symbol.
    It is important to note that the variable in the rust is immutable (do not change the data once loaded) by default (why? please refer the part:0 of this series) However you can have the liberty to make it immutable by adding a mut keyword in front of any variable name. Example below:
 
 ```   
let x = 10 ; //this immutable 
let x = 11 ; // while doing this you will get an error
mut let x = 10 ; //this is mutable
let x = 11 ; // you are safe to do this action
it is best practice to mention the data type of the variable while declaring. However, rust can automatically detect when you have rust analyzer installed on any of the popular IDE. To mention the data type below are the samples.
let a: u32 = 23; // a unsigned 32 bit integer
let b: f32 = 2.3; // a floating point 32 integer
let c: bool = false; // a boolean type variable
let d: char = 'm'; // a char type variable
let e: (i32, char, f32) = (23, 'm', 2.3); // a tupple type
let f: [i32; 5] = [6, 7, 8, 9, 10]; // an array type

```

To know what all are the different types of integers and floats please refer here.
to print anything to the output console rust used println!() macro. in side println!() macro to extract the value of a variable you have to enclose the variable with {}. the sample is given below:

```
fn main() {
    let mut a: i32 = 7; // a mutable variable
    println!("The value of a is: {a}"); //print 7
    let a = 8;
    println!("The value of y is: {a}"); //print 8
}
```

let's know something more about Compound data types:
Array operations:

```
let's take an array as :
let f: [i32; 5] = [6, 7, 8, 9, 10];// i32 is the data types of the array and 5 is the length of the array.
let first = f[0]; // first holds First element of array 
let five = f[4]; // holds 5th element of the array
let r = &f[0..3]; // r holds the element starting with 0th index till 2nd index. last index is always excluded.
let g: [i32; 0] = [] // an empty array.
let g: [i32; 5] = [7, 5] // returns [7, 7, 7, 7, 7]
Tuple operations:
let's take a tuple as:
let f: (i32, &str, f64)= (7, "samir", 3.8); // a tuple
let mut r = f.0; //r contains the 0th index value i,e 7
let r = f.2; // now r contains the 2nd index value i,e 3.8

```

In this part, we learnt the overview and a few operations on array and tuple. this is very easy and if you have learnt any programming language earlier this might be familiar to you. but as I told this series is for the beginner and comes in handy during the initial days.

Thank you for hopping in and see you in the next part.
