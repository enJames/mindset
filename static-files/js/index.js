'use strict';
let serverResponse,
    user_name,
    userResponse = {},
    partOne = {},
    partTwo = {},
    submitOne = document.getElementById('submitOne'),
    ques_one = document.getElementById('ques_one'),
    ques_two = document.getElementById('ques_two'),
    partOneInput = document.getElementsByClassName('partOne'),
    partTwoInput = document.getElementsByClassName('partTwo');

submitOne.onclick = () => {
    runOne();
};

let runOne = () => {
    event.preventDefault();
    user_name = prompt('Tell us your name', 'Your name...');
    if (user_name.length < 3) {
        alert('Name should be at least 3 letters long');
        runOne();
    }
    //Gets response from user and stores in an object
    getUserResponse1();
    slideDiv();
    console.log(partOne);
};

submitTwo.onclick = () => {
    event.preventDefault();
    getUserResponse2();

    userResponse.userName = user_name;
    userResponse.partOne = partOne;
    userResponse.partTwo = partTwo;
    console.log(partTwo);

    sendUserResponse('/', userResponse);
};

let getUserResponse1 = () => {

    for (let i = 0; i < partOneInput.length; i++) {
        if (partOneInput[i].checked) {
            partOne[partOneInput[i].name] = partOneInput[i].value;
        }
    }

    Object.defineProperty(partOne, 'sum', {
        get() {
            let sum = 0;

            for (let values of Object.values(partOne)) {
                sum += Number(values);
            }

            return sum;
        }
    });
};

let getUserResponse2 = () => {

    for (let i = 0; i < partTwoInput.length; i++) {
        if (partTwoInput[i].checked) {
            partTwo[partTwoInput[i].name] = partTwoInput[i].value;
        }
    }

    //define a get property
    Object.defineProperty(partTwo, 'sum', {
        get() {
            let sum = 0;

            for (let values of Object.values(partTwo)) {
                sum += Number(values);
            }

            return sum;
        }
    });
};

let slideDiv = () => {
    //slide the first div out and slides the second in
    ques_one.style.left = '-500%';
    ques_two.style.right = '0%';
};

let sendUserResponse = (url, data) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let redirectURL = xhr.responseURL;
            location.href = redirectURL;
        }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));
};
