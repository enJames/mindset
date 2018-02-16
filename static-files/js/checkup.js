'use strict';
let serverResponse,
    user_name,
    userResponse = {},
    partOne = {},
    partTwo = {},
    introBtn = document.getElementById('intro-btn'),
    proceed = document.getElementById('proceed'),
    introWrapper = document.getElementById('intro-wrapper'),
    name_form = document.getElementById('name-form'),
    nameInput = document.getElementById('name-input'),
    submitOne = document.getElementById('submitOne'),
    submitTwo = document.getElementById('submitTwo'),
    ques_one = document.getElementById('ques_one'),
    ques_two = document.getElementById('ques_two'),
    partOneInput = document.getElementsByClassName('partOne'),
    partTwoInput = document.getElementsByClassName('partTwo');

introBtn.onclick = () => {
    introWrapper.style.left = '-300%';
    name_form.style.right = '25%';
};

proceed.onclick = () => {
    event.preventDefault();
    user_name = nameInput.value;
    name_form.style.left = '-300%';
    ques_one.style.right = '15%';
};

submitOne.onclick = () => {
    event.preventDefault();
    //Gets response from user and stores in an object
    getUserResponse1();

    ques_one.style.right = '150%';
    ques_two.style.right = '0';
};

submitTwo.onclick = () => {
    event.preventDefault();
    getUserResponse2();

    userResponse.userName = user_name;
    userResponse.partOne = partOne;
    userResponse.partTwo = partTwo;
    console.log(partTwo);

    sendUserResponse('/checkup', userResponse);
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
