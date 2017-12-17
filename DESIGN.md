
<h2>Problem Statement</h2>
In an application development team, it is quite common for software developers and QA engineers to face issues with pieces of code developed by another developer. One way to resolve this is trying to figure out the bug by going through lines of code and documentations or they could post on a slack common channel seeking help from respective task owners. Going through the code and understanding the work flow of a completely new module to fix a minor bug is such a waste of developer’s time and resources while trying to get help from a common channel is rarely successful due to the amount of ongoing posts and discussions. 
  
New developers might be embarrassed to ask, what might sound to be a silly question, in a common group. Every morning, the project manager gets a mail regarding failed test cases during last night’s regression run and he/she will not be able to seek technical help from respective topic owners without running around to find people. This is when a project manager would wonder if he/she had a bot that could find relevant people or topic experts.

<h2>Bot Description</h2>
Introducing the expertBot, a bot that finds you the experts. The bot profiles every individual member of a team with tags extracted from tasks/issues assigned on JIRA. These tags are persisted and are weighted, representing the level of expertise. The bot creates a pseudo resume of an individual’s skill set and saves it in a database. When a user wants to find an expert on a topic or relevant people who have worked on a feature, he/she can input the problem statement to the bot, which returns a list of most relevant people who can help you with the issue. 


This bot is an ideal solution to all the common development issues discussed above. A user can now contact relevant people at his/her desk without having to run around asking for help. Since the bot gets its information automatically from authenticated JIRA account, it wouldn’t add extra responsibilities on developers to maintain their work profile. The user interaction is quite simple and hassle free. This bot can be extended beyond your team. It could help you find experts in IT service, DevOps, and more. It could also help you find mentors who can teach you a new technical skill set beyond the scope of your team and work. 

<h2>Use Cases</h2>
<h3>Use Case1: Setup ElasticSearch Backend from Git Repository. </h3>

* 1 Preconditions
  Bot must have Organization's GIT Token ie. Bot should have permissions to read issues.
* 2 Main Flow
   User will enter a valid GIT repository name and Bot will extract all issues from that repository and populate its backend.
* 3 Subflows
  * [S1] User will enter a reposity name. If the repositry name is wrong/invalid, bot will prompt to reenter.
  * [S2] If repository  exists, bot will extract issues and populate its backend.
* 4 Alternative Flows
  * [E1] Permission Denied.
  
  
<h3>Use Case2: Find Experts</h3>

* 1 Preconditions
  Bot must have its backend populated with Git Issues.
* 2 Main Flow
   User will enter a topic and Bot will return top 5 relevant experts who have worked on that topic.
* 3 Subflows
  * [S1] User will enter a topic.
  * [S2] Bot will return top relevant experts. Bot will prompt if the user is happy with the reults else re-enter topic.
  * [S3] If user is happy with the results, the bot will save these experts and user can now ask a question if required
* 4 Alternative Flows
  * [E1] Back end data not found, User has to populate it first (use case 1).
  
  
<h3>Use Case3: Ask Experts</h3>

* 1 Preconditions
    The bot must be aware of last searched topic and list of experts (use case 2)
* 2 Main Flow
    User can ask a question and Bot will send it to selected experts
* 3 Subflows
  * [S1] User can type a question.
  * [S2] Bot will display a list of experts in the topic, User can select experts from that list to communicate.
  * [S3] Bot will ask for your confirmation and forward your question to user selected experts.
* 4 Alternative Flows
  * [E1] Back end data not found or User has not searched for any experts yet. Retry usecase 1 and 2.

<h2>Story Board</h2>

![Alt text](https://media.github.ncsu.edu/user/6052/files/a2d31130-9fd3-11e7-87a6-b1f02737b0f3)

<h2>Wireframes</h2>

<h3>User interaction</h3>

![Alt text](https://media.github.ncsu.edu/user/6052/files/3605718e-9fd2-11e7-8588-f35d2a372876)

<h3>Expert interaction</h3>

![Alt text](https://media.github.ncsu.edu/user/6052/files/0dc8a1c2-9fd3-11e7-921c-90ac5dd9a123)

<h2>Architecture Designs</h2>

* Slack Page: The user interface to slack. This is the page that allows user to interact with the bot with queries, such as finding experts, providing feedback etc. Experts can also interact with this page to view/edit their profiles. 

* Slack Bot: The controller of the application which regulates flow around the application. Follows the MVC design pattern where the slack bot requests services from google/JIRA/elastic search API and returns results.

* Google NLP API: The bot uses this API to return entities from unstructured texts. This is used to return tags which can used to profile an expert or find relevant experts from the keywords. The tasks from JIRA gets broken down to tags that is used to update the expert’s profile. Also, the user’s problem statement is broken down to tags that are used to query relevant experts.

* JIRA API: The bot has all the JIRA credentials of the experts which is used to retrieve the tasks, bugs, and issues completed. This information is later used in profiling.

* Elasticsearch: This is the database that is used by the bot to save documents of key words mapped to various experts. This API also provides a TF/IDF relevancy score while searching for these documents based on input tags. The bot interacts with elastic search to create/update expert profiles and to retrieve a list of relevant users.


![Alt text](https://media.github.ncsu.edu/user/6117/files/99a43cfa-9fd4-11e7-941b-e2852e1c66a5)

![Alt text](https://media.github.ncsu.edu/user/6117/files/a6b634c0-9fd4-11e7-98b4-07ec33245e20)

<h2> Design patterns </h2>

Observer Pattern : The bot will be notified when a JIRA issue/tasks are completed. This would trigger the Jira architecture flow. 

Adapter Pattern: The output of Google API has to be parsed and saved as a document before saving it in elasticsearch. Direct communication between the APIs is not possible. The bot has to  act as an adapter as some additional transformations are required.

expertBot follows a Space Responders bot design pattern. The bot is designed to keep memory of every user tag and respond to input 
query based on this stored information. This is different from responders bot pattern as the list of relevant experts is generated with respect to the stored user context.
