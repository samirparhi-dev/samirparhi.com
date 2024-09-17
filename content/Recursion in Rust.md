+++
title = "Part-2: Recursive Search with Rust"
description = " In this blog lets talk about the recursive search In Rust programming, We will understand it from the algo with and try to build a small command line utility to practice that."
date = 2024-06-14
[taxonomies] 
tags = ["Rust", "Open -Source", "learning" ]
+++

#### Problem Statement:

Build a cli using Rust that can search a given string in all files in a directory and Sub directory Recursively. 

### Building the logic:

Lets Search from the `$PWD`, However you can start from any directory you want . First we have to see if there is any file in this current directory which is under this scope. after that lets find out if the search string is present in that if found return the file name and line no. If not found search the word in other file if it exist. 

Now if you find a folder agin you perform the above activity and this loop continues.

Lets put the above idea to flow chart

<img src="/img/blog/rust-recursion.svg">

#### Writing the First impression

<pre><code class="text-sm">
main.rs

use walkdir::WalkDir;
use regex::Regex;
use std::fs;
use std::io::{self, BufRead, Write};
use std::path::Path;
use std::path::PathBuf;

fn search_inside_file(file_path: &Path, search_pattern: &Regex) -> io::Result<()> {
    let file = fs::File::open(file_path)?;
    let reader = io::BufReader::new(file);

    for (index, line) in reader.lines().enumerate() {
        let line = line?;
        if search_pattern.is_match(&line) {
            println!(
                "Match found in file {} at line {}: {}",
                file_path.display(),
                index + 1,
                line
            );
        }
    }

    Ok(())
}

fn search_folder_recursively(dir: &Path, pattern: &str) -> io::Result<()> {
    let search_pattern = Regex::new(pattern).expect("Invalid regex pattern");

    for entry in WalkDir::new(dir).into_iter().filter_map(Result::ok) {
        let path = entry.path();

        if path.is_file() {
            if let Err(e) = search_inside_file(path, &search_pattern) {
                eprintln!("Failed to read file {}: {}", path.display(), e);
            }
        }
    }

    Ok(())
}

fn main() -> io::Result<()> {
    let mut dir = String::new();
    let mut pattern = String::new();

    println!("Enter the directory path to search in:");

    io::stdout().flush()?;

    io::stdin().read_line(&mut dir)?;

    let dir = dir.trim(); 

    let dir_path = PathBuf::from(dir);

    if !dir_path.is_absolute() {
        return Err(io::Error::new(
            io::ErrorKind::InvalidInput,
            "Please provide an absolute path for the directory.",
        ));
    }
    println!("Enter the search string:");
    io::stdout().flush()?;
    io::stdin().read_line(&mut pattern)?;
    let pattern = pattern.trim();
    search_folder_recursively(Path::new(dir), pattern)?;



    Ok(())
}

</code></pre>

##### Lets Understand What is happening above:

`WalkDir` is a type provided by the `walkdir` crate in Rust. helps in recursive directory traversal, allowing you to iterate over all files and directories within a given directory and its subdirectories.

There are 2 functions `search_inside_file()` and `search_folder_recursively()`

- `search_inside_file()` - search the desired `string` in a file.

- `search_folder_recursively()` helps us to walk between the directory recursively.

Point to note `io::stdout().flush()?` line of code is used to flush the output buffer of the standard output stream (stdout). It's important to flush the output buffer at times to ensure the output appears promptly where expected, especially in scenarios where immediate visibility of output is important, such as in interactive console applications or when displaying progress updates. Without flushing, output may appear delayed or incomplete.

#### Important point to note :

Above is the crude `code` which needs a lot of refinement with respect to the I/O and Concurrency. If you run this code now it may show you a stream of output of search logs. Do not panic coz it is just searching the file one by one and showing you if it is found in that file . Your codde is perfectly fine and just need few modification how the output should be formatted which will talk about in the next blog.

#### What is next ?

- Format output to remove unnecessary logs.
- Cli should be able to search multiple files at the same time. 
- Implement the Concurrency to reduce runtime .
- Robust error handling. (CLI should not crash under any circumstances). 
- ClI should show an precise error message in case of failure and continue with the next file.
- Writing normal Test cases and edge cases.

#### you can explore more for Test & Edge cases to be written on: 
<a href="https://github.com/samirparhi-dev/dir_search/blob/main/test_folder/readme.md"> Code @ GitHub </a> 

We will be implementing them step by step in coming blogs.

Hope this helps the beginner to start their journey with RUST. ⚙️