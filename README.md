# carPool
A simple web app pertaining to Car pooling. 
This application has been developed using HTML, pure JavaScript and CSS. No jQuery has been used.
This app addresses some of the common edge cases of car pooling selection and whether the pick-ups and drops of passengers can be done within the provided time.

Attaching screenshot:

![carPool screenshot](https://cloud.githubusercontent.com/assets/2913308/20967484/bbdc7340-bca5-11e6-9fed-687346a6e89b.png)


**Few features/implementations in the code:**

* The carPool application addresses the problem where we have trip details of 2 users(u1 & u2) which includes their start location (lat, lng), their destination (lat, lng) & their starting & ending time.
The basic idea here is to write a program to determine the shortest & valid  combined route for these 2 users.

* Since there are 4 locations (2 for each user), there are total 8 possible route combinations involving all the 4 locations. The route with the least total ride distance is the shortest path.

* Both the users have given their start & end time. A valid route is the one where both users u1 & u2 starts their trip not before their provided respective startTime (but may start after their respective provided startTime) & reaches their destination not after their provided respective end time (but they may reach before their respective end time).

* To achieve the above requirements, I have used Google’s Distance & Time Matrix API - https://developers.google.com/maps/documentation/javascript/distancematrix

* I have represented the output which states whether a shortest valid combined route is possible or not for the given set of input.

* I have provided comments wherever possible for a better understanding of the code.

* The application was developed on MAC OS X Sierra using Sublime Text 3 & Google Chrome.

