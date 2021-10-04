# Vaiyo 

The flow would be to make sure all the developers create a new branch (from **Live branch**) for 
each of the task so that we can move only certain tasks to production when required.

### If the task is not started/new task
1. Create a new branch from the Live branch with the name of the project. 
a. An Example of Name: `VY_FB_Feature_Name`.
So, if the feature is login, branch name should be `VY_FB_Login`.
    ```sh
    git checkout live
    git checkout -b VY_FB_Login
    ```
2. To demonstrate on staging, merge the branch with the Master (Staging). 
    ```sh
    git checkout master
    git merge VY_FB_Login
    ```
3. After the feedback, any required changes must be done on the same Branch in local 
(`VY_FB_Login` in our case) and then merged with Master (Staging) branch again. 
4. When ready to push on production, merge the created branch with the Live branch directly
in local environment (to avoid any conflict on live). 
    ```sh
    git checkout live
    git merge VY_FB_Login
    ```
5. At any point, none of the work should be done/pushed to Master branch.

### If the task is already started
1. We assume that the current work done is in Master (Staging) branch in local but NOT pushed 
to the Master branch (Stage) from the local.
a. For example, the developer has taken the clone of the Master (staging) in local 10 
days ago. Now, they have started working but have not pushed/committed the work 
to Master. 
2. Use the command: `git stash` in the local branch
(This command will take a backup of all the changes the developer has done in the 
last 10 days and revert the branch to the same state as 10 days ago. 
Ref: https://www.atlassian.com/git/tutorials/saving-changes/git-stash)
3. Update the Master branch. 
    ```sh
    git pull origin master
    ```
4. Switch to the Live branch
    ```sh
    git checkout live
    ```
5. Create a NEW feature branch from Live, with the appropriate naming scheme. 
a. e.g., If the feature is login, branch name should be `VY_FB_Login`.
    ```sh
    git checkout live
    git checkout -b VY_FB_Login
    ```
6. Use the command: `git stash pop` which will restore all the changes saved in step 2. 
7. For the demonstration on staging, merge the branch with Master (stage).
    ```sh
    git checkout master
    git merge VY_FB_Login
    ```
8. Any changes must be done in this specific branch (`VY_FB_Login` in our case) only, not in 
Master branch. 
9. Once ready for production, merge the local branch with the Live branch in local environment 
(to avoid any conflict on live). 
    ```sh
    git checkout live
    git merge VY_FB_Login
    ```