'use strict';
window.onload = () => {
    let indexBtn = document.querySelector('button');

    indexBtn.addEventListener('webkitAnimationEnd', () => {
        indexBtn.classList.remove("pulse");
        setTimeout(() => {
            indexBtn.className += 'pulse';
        }, 5000);
    });

}
