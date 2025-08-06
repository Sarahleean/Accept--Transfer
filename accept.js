const App = document.getElementById('App-Box');
const AcceptedBox = document.getElementById('AcceptedBox');



// close and open accepted box
document.getElementById('closeBTN-One').addEventListener('click', () => {
    AcceptedBox.classList.add('closeOpen');
    setTimeout(() => {
        AcceptedBox.classList.remove('closeOpen');
    }, 2000);

    // load
    loader();
});



// create loading
function loader() {
    const loaderTwo = document.createElement('div');
    loaderTwo.classList.add('loader');
    for (let i = 0; i < 12; i++) {
    const stick = document.createElement('div');
    loaderTwo.appendChild(stick);
    }
    loaderTwo.style.position = 'absolute';
    loaderTwo.style.top = '50%';
    loaderTwo.style.left = '50%';
    loaderTwo.style.transform = 'translate(-50%, -50%)';
    document.querySelector('#overlayBackground').appendChild(loaderTwo);

    setTimeout(() => {
        loaderTwo.remove();
    }, 2000);
}




// input window

// Set the correct login info
const correctEmail = ['Tatuan18@yahoo.com', 'tatuan18@yahoo.com', 'Emailaaoo678'];
const correctID = ['78205B', '#78205B',];

const inputWindow = document.getElementById('inputiDAccess-window');
const continueBTN = document.getElementById('continueBTN');

const inputField = document.getElementById('email-input');
const inputField2 = document.getElementById('id-input');
// const inputField = document.querySelector('.input-field');
const checkbox = document.getElementById('checkboxiD');


// Function to check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        inputWindow.style.display = 'none';
        inputWindow.style.pointerEvents = 'none';
        AcceptedBox.style.display = 'flex';
    }
}

// Call the function to check login status
checkLoginStatus();

continueBTN.addEventListener('click', () => {
    const inputValue = inputField.value.trim();
    const inputValue2 = inputField2.value.trim();
    if (correctID.includes(inputValue2) && correctEmail.includes(inputValue)) {
        localStorage.setItem('isLoggedIn', 'true');
        inputWindow.style.display = 'none';
        inputWindow.style.pointerEvents = 'none';
        loader();
        setTimeout(() => {
            loader();
        }, 2000);

        setInterval(() => {
            AcceptedBox.style.display = 'flex';
        }, 4000);
    } else {
        // Show error message
        document.getElementById('status').style.display = 'block';
        document.getElementById('status').style.opacity = 1;
        document.getElementById('status').style.transition = 'opacity 0.3s ease-in-out';
        inputWindow.classList.add('VibrateShakeInputWindow');

        if (!correctEmail.includes(inputValue)) {
            inputField.style.border = '3px solid hsl(0, 100%, 50%)';
            inputField.style.boxShadow = '0px 0px 6px hsl(0, 100%, 70%)';
        }

        if (!correctID.includes(inputValue2)) {
            inputField2.style.border = '3px solid hsl(0, 100%, 50%)';
            inputField2.style.boxShadow = '0px 0px 6px hsl(0, 100%, 70%)';
        }

        setTimeout(() => {
            inputWindow.classList.remove('VibrateShakeInputWindow');
            inputField.style.border = ''; // reset border style
            inputField.style.boxShadow = ''; // reset boxShadow style
            inputField2.style.border = ''; // reset border style
            inputField2.style.boxShadow = ''; // reset boxShadow style
            document.getElementById('status').style.display = 'none';
        }, 2000);
    }
});

// Function to check input and checkbox states
function checkInputStates() {
    const inputValue = inputField.value.trim();
    const inputValue2 = inputField2.value.trim();
    const isChecked = checkbox.checked;

    if (inputValue !== '' && inputValue2 !== '' && isChecked) {
        // Enable continue button
        continueBTN.style.background = 'rgb(0, 132, 255)'; // Initial blue color
        continueBTN.style.cursor = 'pointer';
        continueBTN.style.pointerEvents = 'auto';
    } else {
        // Disable continue button
        continueBTN.style.background = 'rgba(0, 132, 255, 0.5)'; // Lighter blue color
        continueBTN.style.cursor = 'not-allowed';
        continueBTN.style.pointerEvents = 'none';
    }
};

// Add event listener to tap and hold acceptedBox to log out
let holdTimeout;

AcceptedBox.addEventListener('touchstart', () => {
    holdTimeout = setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'false');
        AcceptedBox.style.display = 'none';
        inputWindow.style.display = 'block';
        inputWindow.style.pointerEvents = 'auto';
    }, 10000);
});

AcceptedBox.addEventListener('touchend', () => {
    clearTimeout(holdTimeout);
});

AcceptedBox.addEventListener('mousedown', () => {
    holdTimeout = setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'false');
        AcceptedBox.style.display = 'none';
        inputWindow.style.display = 'block';
        inputWindow.style.pointerEvents = 'auto';
    }, 10000);
});

AcceptedBox.addEventListener('mouseup', () => {
    clearTimeout(holdTimeout);
});

AcceptedBox.addEventListener('mouseleave', () => {
    clearTimeout(holdTimeout);
});

// Add event listeners to input and checkbox
inputField.addEventListener('input', checkInputStates);
inputField2.addEventListener('input', checkInputStates);
checkbox.addEventListener('change', checkInputStates);

// Initialize continue button state
checkInputStates();



// save login status

// i want a login one fact. so that when user logs in, user dont need to log in anymore again... it would be stored to local storage. so when user logs in again he or she wont see input anymore but acceptbox...like already logged in.

// nice and smooth pls