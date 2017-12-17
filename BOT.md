
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
 
 
 # Mocking
 
 Our application makes three API calls. Two to GitHub’s API (to retrieve users and issues for a specified repository), and one to Elastic Search to parse the results obtained from the previous calls.
 
The Mocks for our project were implemented using the Nock module. Mocks are located in /test/Mocks. The file GitMocks.json holds the mocked JSON data for REST calls made to GitHub’s API (getUsers, getIssues), while the file elasticSearchMock.json holds the mocked data for the Elastic Search call. The intercepting code for both is located in git.js where GET requests pertaining to the specified Git URL’s are intercepted and are returned with the mocked data from the file mentioned above. Similarly, POST calls to Elastic Search are intercepted and returned mocked data from elasticSearchMock.json.

Mocks can be found here: https://github.ncsu.edu/vdatla/SEBot/tree/master/test/Mocks

 # Selenium Testing
 
 Please find selenium test script for each use case below :
 
 https://github.ncsu.edu/vdatla/SEBot/tree/master/selenium
 
 # Bot Implementation
 
 The bot sets up its elasticsearch backend on hearing the word 'start'. The user then has to enter a Git repository (Assuming the bot has access to the repo). The bot extracts all the git issues and its assignees and starts to process the contents of these issues. Using Google NLP API, the bot extracts key entities from the issues and creates a keyword document for every organization member. Now the user can find experts on a certain topic by using 'find'. The bot then uses TF-IDF score to return top relevant users who have worked on these topics. If the user is happy with the results, the bot also allows sending a question to selected experts. The user has to type 'ask' and follow instructions to forward their queries. 
 
 # Task Tracking
 
 [Table Link](https://github.ncsu.edu/vdatla/SEBot/blob/master/WORKSHEET.md)
 
 # Screencasts
  
  Please view/download the screencasts using the links below:
  
  Usecase 1:
  
  YOUTUBE LINK: https://youtu.be/40KtxNhjz2M
  
  Usecase 2:
  
  YOUTUBE LINK: https://youtu.be/-tKs4eY1A2Y
  
  Usecase 3:
  
  YOUTUBE LINK: https://youtu.be/79r1pHgmO8o
  
  
 
