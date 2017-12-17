# Presentation

Presentation Youtube Link (https://youtu.be/4IjLUIXqTIE)
# Report

## The Problem Statement

In an application development team, it is quite common for software developers and QA engineers to face issues with pieces of code developed by another developer. One way to resolve this is trying to figure out the bug by going through lines of code and documentations or they could post on a slack common channel seeking help from respective task owners. Going through the code and understanding the work flow of a completely new module to fix a minor bug is such a waste of developer’s time and resources while trying to get help from a common channel is rarely successful due to the amount of ongoing posts and discussions.
New developers might be embarrassed to ask, what might sound to be a silly question, in a common group. Every morning, the project manager gets a mail regarding failed test cases during last night’s regression run and he/she will not be able to seek technical help from respective topic owners without running around to find people. This is when a project manager would wonder if he/she had a bot that could find relevant people or topic experts.

## Primary features and screenshots.

Introducing the expertBot, a bot that finds you the experts. The bot profiles every individual member of a team with tags extracted from tasks/issues assigned on GIT. These tags are persisted and are weighted, representing the level of expertise. The bot creates a pseudo resume of an individual’s skill set and saves it in a database. When a user wants to find an expert on a topic or relevant people who have worked on a feature, he/she can input the problem statement to the bot, which returns a list of most relevant people who can help you with the issue.
This bot is an ideal solution to all the common development issues discussed above. A user can now contact relevant people at his/her desk without having to run around asking for help. Since the bot gets its information automatically from authenticated GIT account, it wouldn’t add extra responsibilities on developers to maintain their work profile. The user interaction is quite simple and hassle free. This bot can be extended beyond your team. It could help you find experts in IT service, DevOps, and more. It could also help you find mentors who can teach you a new technical skill set beyond the scope of your team and work.
The Bot also improves the relevancy of search by added feature called feedback and points based system which increases the points of an expert when he or she solves a relevant doubt pertaining to a topic.

#### Use Case1: Setup ElasticSearch Backend from Git Repository.
#### Use Case2: Find Experts
![find](https://media.github.ncsu.edu/user/6327/files/cea7fa04-d797-11e7-87d7-ca2473c228cb)
#### Use Case3: Ask Experts
![ask](https://media.github.ncsu.edu/user/6327/files/d1469af4-d797-11e7-8613-b7664835722f)
#### Use Case4: Give feedback about an expert which will improve his rating 
![feedback](https://media.github.ncsu.edu/user/6327/files/d52690c0-d797-11e7-8d70-0b71d58ccce6)

<h3>User interaction</h3>

![webp net-gifmaker](https://media.github.ncsu.edu/user/6327/files/7aec8eca-d797-11e7-9858-d4eb7c95a4dc)


## Your reflection on the development process and project.

We were given the task of making a Slack BOT which would assist in easing the process of Software Development. Code maintenance and resolving issues pertaining to topics in which there is not much documentation available is one of the most challenging tasks that any developer faces. APIs and Code Bases with no to little documentation are difficult to integrate and finding solutions online is tedious and time comsuming. We need a database of users relevant to particular topic if not universally but atleast within an organization. Getting answers on platforms like STACKOVERFLOW is not guaranteed.
Also even if there is a database of such topic based Experts within an organisation, you will need to query it to obtain results. A bot which can get you these results and which is integrated in your organizational communication channel would really solve the above discussed problem. Here our ExpertBot comes in handy. Our Bot fetches the collaborators and contributors to particular git repository and adds them to an Elastic Search Database. Now when any user wants to know the experts in a particular topic he just has to interact with the bot. The keyword start triggers the BOT's application flow and the BOT understands that the user needs help. Enter the topic for which you need experts and the BOT will fetch the results for you. The two main components on which our use cases rest are Experts and Topics and there is an N to N mapping between both the components. The BOT was designed based on the solid Software Engineering processes discussed in the class and was selenium tested rigorously to verify its robustness.

#### Milestone 1
We turned in the BOT design as part of deliverable for milestone 1. The entire team had a brainstorming session where we narrowed down the scope of the project. We also documented the use cases after doing a feasibility study of the entire project. We documented the use cases using story boarding and wireframes to explain our idea and how it would appear in execution.

#### Milestone 2
For milestone 2, we came up with the implementation logic for bot where we used Nodejs for writing the business logic of the application and created mock json file to render mock data. To smoothen the development process, we used trello cards to track and manage tasks assigned to each person.

#### Milestone 3
In milestone 3 Services, we implemented the service part of bot i.e. integrating the GITHUB API to fetch data and adding it to Elastic Search. We also implemented the feeback mechanism to increase the relevancy of the Expert based on how helpful he was in solving a particular problem. For the sake of simplicity we have incorporated only positive feedback in the mechanism. 

#### Milestone 4
For milestone 4 Deploy, we deployed the application on Amazon EC-2 to make the bot forever running. We used ansible server script to deploy this application along with all the dependent packages required to run the bot on Amazon EC2.

Overall, it was been a great journey with lot of learning during each of the milestones. Throughout this project, we used agile methodology which was quite helpful to understand the requirement at early stages and frequent meetings helped us in reducing the errors and defects which might have impacted the project milestones at later stages otherwise. Apart from that, we used pair programming during the coding phase of our project which was a successful experiment since it helped us in improving the quality of the code and eliminating the bugs/defects which might have been neglected had there been only one developer working on particular task. It also helped us in identifying the strong and weak points of the team members that made us easy to rotate the work after every milestone.

Our application makes three API calls. Two to GitHub’s API (to retrieve users and issues for a specified repository), and one to Elastic Search to parse the results obtained from the previous calls.The bot sets up its elasticsearch backend on hearing the word 'start'. The user then has to enter a Git repository (Assuming the bot has access to the repo). The bot extracts all the git issues and its assignees and starts to process the contents of these issues. Using Google NLP API, the bot extracts key entities from the issues and creates a keyword document for every organization member. Now the user can find experts on a certain topic by using 'find'. The bot then uses TF-IDF score to return top relevant users who have worked on these topics. If the user is happy with the results, the bot also allows sending a question to selected experts. The user has to type 'ask' and follow instructions to forward their queries to the Expert and the BOT creates a communication channel for sending messages between user and Expert. Providing feedback for a resolved problem to an expert increases his points which shifts him higher in the list of Experts for that topic.


## Any limitations and future work.
1) For the future scope we can incorporate it with other platforms like JIRA ,BITBUCKET or other organizational code maintenance platforms depending on the needs of the client.
2) Relevancy improvement and detailing of topics for which Experts are stored in Elastic Search.
3) Profiling and badging system for the Experts.
4) Machine learning and analytics in making the BOT more robust to user commands and giving suggestions relevant to some commonly made mistakes in commands
5) This goal can be achieved to some extent by integration of the BOT with wit.ai or api.ai
Automating the process of adding newly added issues from GIT automatically into the BOT.
6) Integration of STACK-OVERFLOW API to increase the pool of Experts when working with non-proprietory or open-source data.
