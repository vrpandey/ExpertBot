Join Slack group using this [link](https://join.slack.com/t/bottest1993/shared_invite/enQtMjc5Nzg5NzgwMzU4LWM4YjUwMGMwYzEwYWVjMjgxYjg5MWI1ZjA1YTRiOGI1YjcyMjliZDAyNTU5ODVlYTFmOWVjZjYzZTJkZmJlNTg)

<h3> Steps to deploy on AWS EC2 </h3>

* Install Ansible module on your local machine
* Create an inventory file or copy the file template found in https://github.ncsu.edu/vdatla/SEBot/tree/master/deploy of the git repository
* Replace the <ip> in inventory with the public ip address of the EC2 instance.
* Note: Make sure the Ec2 instance has python2 installed else Ansible will not be able to establish a connection to EC2
* Get the private key of your instance and paste it in the same location as inventory file.
* Use chmod 400 <keyname.pem> to give appropriate permissions
* Copy the setup.yml ansible playbook from the git location https://github.ncsu.edu/vdatla/SEBot/tree/master/deploy and paste it in the same location as inventory file.
* Run the Ansible playbook using the command ansible-playbook assign.yml -i inventory -e 'username=<gitusernam>' -e 'password=<gitpassword>'. Since SEBot is in a private repository, TAs have to enter their ncsu git username and password as parameters to the script.

[Deploy ScreenCast](https://www.youtube.com/watch?v=L7linVqQbnE&feature=youtu.be)

[Use Case ScreenCast](https://www.youtube.com/watch?v=i5eZK391oW0&feature=youtu.be)

[Worksheet](https://github.ncsu.edu/vdatla/SEBot/blob/master/WORKSHEET.md)

<h3>acceptance test instructions</h3>

* Start the bot interaction by entering "start". This is a one time process which will initialize necessary variables.
* Use case 1: It is to populate/Update the backend elastic search with git issues and experts. Since new issues get added very often, it is necessary to keep the back end updated. 

  * please enter "update"
  
* This will prompt you to enter name of the git repository. When you enter "random" , the bot will prompt that such a repository does not exist

  * Type "random"
  
* Now enter an existing git repository "gitissues". This will extract all the issues from git repo and create entities.
  * Type "gitissues"
* The bot will populate the back end and the user is now allowed to find experts. You can't find experts if the database is empty and bot will suggest entering "update" first before finding for the first time.

Use Case 2:

* To find experts type "find"
  * Type "find"
* When the bot asks to enter a topic, try entering a random topic that does not exist.
  * Type "random"
* The bot will reply with no results. Now try entering a topic on which some experts have worked on.
  * Type "secondary index"
* The Bot will list out top experts who have worked on these topics. It sorts based on tf-idf score. The user is allowed to enter several variations of the topic.
  * Type "no" and enter "SecondaryIndex" or "secondaryIndx"
* You will see that the user will get similar results. The user can continue to refine the search and type "yes" when satisfied.
  * Type "yes"
  
Use Case 3:

* User can forward a question to a group of recently found experts. Since the user last found experts on elastic search, type "ask" to send communicate.
  * Type "ask" and type "yes" to proceed
* The user can enter a question that he wants to send
  * Type "Help, I need Help"
* select an individual or group of experts to forward the question. Use numbers that are comma separated.
  * Type 2,3
* The bot will now forward the question to selected experts

Additional Use Case:

* The user can also provide feedback to increases the expertise level and improves the relevancy score.
  * Type "feedback"
* Enter an expert's git username.
  * Type "vrpandey"
* Assuming vrpandey helped the user in java, enter java as the topic
  * Type "java"
* Now the feedback is registered. To verify, the user can try finding experts on java.
  * Type "find" followed by "java"
