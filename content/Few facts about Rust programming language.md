+++
title = "Part:0 - Few facts about Rust programming language"
description = "This is the very first write-up of our Rust journey. In this part, we will learn a few interesting facts about Rust programming language. This will give us an overview of how and what of Rust at a high level."
date = 2024-04-30
[taxonomies] 
tags = ["Open-Source", "RUST"]
+++

This is the very first write-up of our Rust journey. In this part, we will learn a few interesting facts about Rust programming language. This will give us an overview of how and what of Rust at a high level.

Every programming languages are special. Let's take an overview of very charming Rust .

    1. Like most programming languages, the rust logic execution starts from main() block.

    2. Rust is a statically typed language, Which means you have to specify the data type ( int/float/String) of each variable. More about data types can be found here.

    3. The variable/literals are immutable by default in rust. However, you can make the variable mutable by using mutkeyword. Why the variable is immutable by default?

        ○ This is to provide the developer with an easy way to debug a program. When you know the value is not changed it is easy to debug.

        ○ The second reason is let's say there are two expressions which are using the same value. if during execution the variable changes then, the expressions may not work as expected. So to make the program more robust the literals are mutable. You can get more info here.

    4. Rust is a compiled language. This means each project/ code produces an executable file like .exe, .deb etc. after compiling. The advantage is the code can run in any of the operating systems without a rust installation.

    5. There are two kinds of string data types namely &str : string slice and String.This is to provide memory safety for the rust program. we will learn more about these in the coming parts.

    6. To prevent the memory leak in rust and make it more robust, Rust uses the concept called ownership . this is a very useful and interesting feature in Rust. This helps regulating variable scopes. When a variable goes out of scope rust deletes/ frees the value as well as the memory. More information here.

    7. Rust Does not have the concept of a Garbage collector due to the above-said reason

    8. Like other languages you can use external libraries/packages that are provided by rust itself (standard libraries) or 3rd parties. The packages/Libraries are called Crates.
    
    9. Rust manages the Dependencies in a very well manner. The package manager is called Cargo. the interesting thing is that if you create a project with Cargo, it not only creates the boilerplate folder structure but it initialises the folder with Git automatically. So it natively supports Git.

These are few facts i found may be intersting to know before starting to learn Rust. Please let me if you have found some interssting fact about rust. Do correct if something is wrong here :-)

See you in the part 1 😀 .
