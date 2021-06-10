const URI_ROOT = 'http://localhost:5002'


const LOGIN_MUT = 'login';
const LOGOUT_MUT = 'logout';
const DELETE_USER_MUT = 'deletetUser';
const GET_USE_MUT = 'getUser';



const GET_ALL_NOTES_MUT = 'getAllNotes';
const GET_NOTE_MUT = 'getNote';
const DELETE_NOTE_MUT = 'deleteNote';

const GET_ALL_CATEGORIES_MUT = 'getAllCategories';
const GET_CATEGORY_MUT = 'getCategory';
const DELETE_CATEGORY_MUT = 'deleteCategory';



const LOGIN_ACT = 'login';
const LOGOUT_ACT = 'logout';


const GET_USER_ACT = 'getUser';
const SIGNUP_ACT = 'signup';
const EDIT_USER_ACT = 'editUser';
const DELETE_USER_ACT = 'deletetUser';

const GET_ALL_NOTES_ACT = 'getAllNotes';
const GET_NOTE_ACT = 'getNote';
const EDIT_NOTE_ACT = 'editNote';
const CREATE_NOTE_ACT = 'createNote';
const DELETE_NOTE_ACT = 'deleteNote';

const GET_ALL_CATEGORIES_ACT = 'getAllCategories';
const GET_CATEGORY_ACT = 'getCategory';
const EDIT_CATEGORY_ACT = 'editCategory';
const CREATE_CATEGORY_ACT = 'createCategory';
const DELETE_CATEGORY_ACT = 'deleteCategory';

const GET_NOTE_GET = 'getNote';
const GET_CATEGORY_GET = 'getCategory';
const IS_LOGGED_IN = 'isLoggedIn'


export {
    URI_ROOT,

    LOGIN_MUT, LOGOUT_MUT,GET_USE_MUT,  DELETE_USER_MUT,

    GET_ALL_NOTES_MUT, GET_NOTE_MUT,  DELETE_NOTE_MUT,
    GET_ALL_CATEGORIES_MUT, GET_CATEGORY_MUT,  DELETE_CATEGORY_MUT,


    LOGIN_ACT, LOGOUT_ACT,GET_USER_ACT, SIGNUP_ACT, EDIT_USER_ACT, DELETE_USER_ACT,
    GET_ALL_NOTES_ACT, GET_NOTE_ACT, EDIT_NOTE_ACT, CREATE_NOTE_ACT, DELETE_NOTE_ACT,
    GET_ALL_CATEGORIES_ACT, GET_CATEGORY_ACT, EDIT_CATEGORY_ACT, CREATE_CATEGORY_ACT, DELETE_CATEGORY_ACT,

    GET_NOTE_GET, GET_CATEGORY_GET,IS_LOGGED_IN

}