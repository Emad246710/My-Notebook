# notebook

My application is a Notebook which a user can:

• sign up and sign in and sign out

• create, modify,sort and delete the notes.



##  requirements

* flask

* flask_sqlalchemy

* flask_marshmallow

* marshmallow_sqlalchemy

* python-dotenv

* uuid

* werkzeug

* flask-login 


## Installation

### Frontend:

 #### installation of the required packages




```bash 
$ cd ..FrontEnd>
$ npm i 
```
#### TO Run


```bash 
$ cd ..FrontEnd>
$ npm run dev
```
### Backend:

#### TO Run

```bash 
 $ pip install requirements.txt
$ cd ..BackEnd>
$ python wsgi.py
```
 
## Technology used:

### Frontend:

*   Vue 3

#### plugins:

* Vuex 
* Vue-Router
### BackEnd:
* Flask
#### plugins:

* Flask-login
* flask_sqlalchemy
* flask_marshmallow
* marshmallow_sqlalchemy


### Layout:

* Bootstrap


## How to login:

### To login use the following credential:
* username: user1 
* password: ps123456P

## functionality:



* NO User is able to Create, edit, or delete unless they are logged in.

* The password must have minimum eight characters, at least one letter and one number.

* As an User, you are able to edit your Username or Password anytime and delete your account.

* If the username you choose is taken, an Error is displayed.

* Password confirmation will be required when registering a new password.

* NO User have an access to another user's Notebook.

* The User is able to Delete and Edit any note.

* Possible to filter/search in the Notes based on the Content.

* All Notes are marked with the date of creation.

* The User is able to sort the notes based on:

   * Content.
   * Category.
   * Priority.
   * Created on.
   * None.

