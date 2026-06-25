// const { useReducer } = require("react");
let compMove = '';
let result = '';
let currentUser = null;
const usersKey = 'stonePaperUsers';
const currentUserKey = 'stonePaperCurrentUser';
const oldCurrentUserKey = 'currentUser';

class User {
    constructor(name){
        this.name = name ;
        this.wins = 0;
        this.loss = 0;
    }

}
//new user 
function createUser(){
    const name = document.getElementById('username').value.trim();

    if (name === '') {
        document.getElementById('welcome').innerText = 'Please enter a username';
        return;
    }

    const users = getUsers();
    const userKey = name.toLowerCase();
    
    currentUser = users[userKey] || new User(name);
    users[userKey] = currentUser;

    localStorage.setItem(usersKey, JSON.stringify(users));
    localStorage.setItem(currentUserKey, userKey);

    document.getElementById('welcome').innerText = `${currentUser.name}`;
    showScore();
    
}

const savedUser = localStorage.getItem(currentUserKey);

if (savedUser) {
    const users = getUsers();
    currentUser = users[savedUser] || null;

    if (currentUser) {
        document.getElementById('welcome').innerText = `${currentUser.name}`;
        showScore();
    }
} else {
    const oldSavedUser = readJson(oldCurrentUserKey);

    if (oldSavedUser) {
        currentUser = oldSavedUser;
        saveCurrentUser();
        document.getElementById('welcome').innerText = `${currentUser.name}`;
        showScore();
    }
}



function pickCompMove() {
    const randNo = Math.floor(Math.random() * 3) + 1;

    switch (randNo) {
        case 1:
            compMove = 'rock';
            break;
        case 2:
            compMove = 'paper';
            break;
        case 3:
            compMove = 'scissor';
            break;

        default:
            break;
    }
    // console.log(`Computer move is ${compMove}`);
}

function playGame(userMove) {
    if (!currentUser) {
        document.getElementById('welcome').innerText = 'Login first to play';
        return;
    }

    pickCompMove();

    console.log(`User move is ${userMove}`);

    //Draw cases 
    if (userMove == compMove) {
        result = 'Tie';

    }

    else if (
        (userMove === 'rock' && compMove === 'scissor') ||
        (userMove === 'scissor' && compMove === 'paper') ||
        (userMove === 'paper' && compMove === 'rock')
    ) {
        result = 'User Wins !';
        currentUser.wins++;

    }
    else {
        result = 'User Lost !';
        currentUser.loss++;
    }

    document.getElementById('user').innerText = `You chose: ${userMove}`;
    document.getElementById('computer').innerText = `Computer chose: ${compMove}`;
    document.getElementById('result').innerText = result;
    showScore();
    
    saveCurrentUser();
}

function showScore() {
    if (!currentUser) {
        document.getElementById('score').innerText = '';
        return;
    }

    document.getElementById('score').innerText =
        `Wins ${currentUser.wins} : Losses ${currentUser.loss}`;
}

function getUsers() {
    return readJson(usersKey) || {};
}

function saveCurrentUser() {
    const users = getUsers();
    const userKey = currentUser.name.toLowerCase();

    users[userKey] = currentUser;

    localStorage.setItem(usersKey, JSON.stringify(users));
    localStorage.setItem(currentUserKey, userKey);
}

function readJson(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return null;
    }
}


//test ground 

// const tester = new user("Dk");
// console.log(tester);
