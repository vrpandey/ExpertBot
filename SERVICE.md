
# Use Case

<h3>Use Case1: Setup ElasticSearch Backend from Git Repository. </h3>

* 1 Preconditions
  Bot must have Organization's GIT Token ie. Bot should have permissions to read issues.
* 2 Main Flow
   User will enter a valid GIT repository name and Bot will extract all issues from that repository and populate its backend.
* 3 Subflows
  * [S1] User will enter a repository name. If the repository name is wrong/invalid, bot will prompt to reenter.
  * [S2] If repository exists, bot will extract issues and populate its backend.
* 4 Alternative Flows
  * [E1] Permission Denied.
  
  
<h3>Use Case2: Find Experts</h3>

* 1 Preconditions
  Bot must have its backend populated with Git Issues.
* 2 Main Flow
   The user will enter a topic and Bot will return top 5 relevant experts who have worked on that topic.
* 3 Subflows
  * [S1] User will enter a topic.
  * [S2] Bot will return top relevant experts. The bot will prompt if the user is happy with the results else re-enter topic.
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


# Task Tracking
 
 [Table Link](https://github.ncsu.edu/vdatla/SEBot/blob/master/WORKSHEET.md)
 
 
 # Screen Cast
 ### YouTube Link:
https://www.youtube.com/watch?v=i5eZK391oW0&feature=youtu.be
