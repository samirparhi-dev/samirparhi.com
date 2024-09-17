+++
title = "Shell script to Migrate Azure Container Registry"
description = "When someone asks to migrate an ACR from one Azure subscription to another azure subscription, it feels like a tedious task. Because you must migrate Image repositories and all the image tags that are in those repositories."
date = 2024-04-30
[taxonomies] 
tags = ["Shell Script", "Linux"]
+++

When someone asks to migrate an ACR from one Azure subscription to another azure subscription, it feels like a tedious task. Because you must migrate Image repositories and all the image tags that are in those repositories.
Traditionally, you can use az acr import command to achieve this. But when the number of repositories increases, it takes an exponentially high unproductive time.

I have recently gone through this situation and thought to automate this process. Below z shell script, I have come up, which may help you in those scenarios.

**Prerequisites to use this command: **

    1. Docker Desktop/ Docker binary is installed
    2. AZ CLI is installed

**Steps: **

    1. first create a new Azure Container Registry
    2. login to the new repository using AZ CLI (az acr login command)
    3. Keep the below information ready
        1. Name of your old repository
        2. Username of the old repository
        3. Password of the old repository

    4. Now Run the below shell script

        ```   
        #!/bin/zsh
        echo "Enter the Source ACR Name: "
        read SourceAcrName
        echo "Enter the Source ACR User Name: "
        read SourceAcrUsrName
        echo "Enter the Source ACR Password: "
        read -s SourceAcrpasswd
        echo "Enter the Destination ACR Name: "
        read DestinationAcrName
        Repos=$(az acr repository list --name $SourceAcrName --username=$SourceAcrUsrName --password=$SourceAcrpasswd | tr -d '[] "" ,'| grep "\S")
        echo $Repos | while read RepoName
        do
        Tags=$(az acr repository show-tags -n $SourceAcrName --repository $line --username=$SourceAcrUsrName --password=$SourceAcrpasswd | tr -d '[] "" ,'| grep "\S")
        echo $Tags | while read TagName
        do
        az acr import \
        --name $DestinationAcrName \
        --source $SourceAcrName.azurecr.io/$RepoName:$TagName \
        --image $RepoName:$TagName \
        --username=$SourceAcrName \
        --password=$SourceAcrpasswd \
        --no-wait
        done
        Done
        ```

Note: in this Shell Script Source ACR Name is old repository name. Source ACR Username is Username of the old repository. Source ACR Password is Password of the old repository. This is written for zsh shell, if you would like to use it for bash shell please change #!/bin/zsh to #!/bin/bash.


Hope this helps.
