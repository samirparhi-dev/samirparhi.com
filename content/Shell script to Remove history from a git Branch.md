+++
title = "Shell script to Remove history from a git Branch"
description = "There are various instances where we decide to remove the history from a git repository. Let's see a script action."
date = 2024-04-30
[taxonomies] 
tags = ["Shell Script", "Linux"]
+++

There are various instances where we decide to remove the history from a git repository.

The most common use case :

You find out there are some secret information like credential or the database string that is been exposed to git hub and also it is recorded in the history. at this moment you may searching to delete the history.

This shell script allows you to remove all the history of a given branch (please remember this shell script remove all the history of the branch), you can make use of this script which is combination of few git commands and has been clubbed to make this task easier for you.

Shell script :

        ```
        #!/bin/zsh
        echo "Important !!! Make sure you are Checked out to the Branch in which you want to remove the history"
        echo "your Repository URL: (usually looks like https://github.com/example.git) "
        read gitURL
        git clone $gitURL
        if [ $? -eq 0 ]
        then
        dir=$(basename $gitURL | cut -f1 -d".")
        cd $dir
        echo "From Which Branch you want to delete the History ? "
        read BranchName
        git checkout $BranchName
        echo "Enter your commit message here:"
        read CommitMessage
        git checkout --orphan new_br
        git add -A
        git commit -am "$CommitMessage"
        git branch -D $BranchName
        git branch -m $BranchName
        git push -f origin $BranchName
        echo "finished successfully "
        fi
        ```

Now let's understand few key words here

basename $gitURL : extract the last path value from a URL or a directory string.

Try out: basename https://github.com/example.git

`** cut -f1 -d"." **:`  is used to extract the world before "." .

Try out: `echo "test.txt" | cut -f1 -d"."`

`git checkout --orphan <branch name>` : create a branch without any ancestor reference. that means it will be a independent branch (ref : https://git-scm.com/docs/git-checkout)

Thank you !
