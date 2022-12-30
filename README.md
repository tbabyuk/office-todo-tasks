# To Do List

See it live: [Office Todo Tasks](http://www.work.dacapomusic.ca/)

## Description
A customized to-do app created for an office/reception business that allows user to create to-do items with different priority levels, edit them at any time, move them different columns depending on their completion status, and delete them. App is fully integrated with Firestore database on the backend, meaning all todo items are saved at all times.

## Background & Process
This project was originally conceived and later modified using direct feedback of an administrator of a music school business. The user needed a way to keep track of daily to-do tasks and keep track of their progress with each task. I have gone through several modifications of this app following direct feedback from the end user.

## Technologies
Current version of this project was done with:
* HTML
* CSS/Bootstrap
* JavaScript
* Firestore cloud database

## State of Completion
Completed but open to updates based on user feedback/need.

## Learning Lessons & Challenges
### Creating edit, delete and move functionality for each to-do item
This was a fun challenge that I really enjoyed. For editing to-do items, I decided to just go with the JavaScript prompt() method although I could also have created a modal for this. I wanted to keep things simple and minimal. Moving items between columns was an easier task than it seemed, by simply using the append() method on desired columns.

### Integrating Firestore database into the app
This was by far the bigger challenge in this project. There was a lot I had to learn about Firestore and its methods to make everything work, and I'm very happy with how it turned out. I wrote my code in such a way as to minimize the number of queries to the database (to save on cost). I could have used Firestore's real-time listeners (onSnapshot) to make the UI completely dependent on its interaction with the database. Instead I opted to only make database queries when necessary, making sure it does not take away from use experience in any way.

## Areas of Improvement
As mentioned above, I might set up real-time listeners in the future so that any changes to the to-do items automatically triggers a re-render from the database. But for my purposes here and for the relative simplicity of this app, I did not see much need for this.

## Summary
This was a fun app to do, especially the database integration part. I am happy with how it turned out, but most of all am happy that the end-user is extremely pleased with it!




