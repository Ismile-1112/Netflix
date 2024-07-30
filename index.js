let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
    accordian[i].addEventListener("click", function (){
        if (this.childNodes[1].classList.contains("fa-plus")) {
            this.childNodes[1].classList.remove("fa-plus");
            this.childNodes[1].classList.add("fa-times");
        } else {
            this.childNodes[1].classList.remove("fa-times");
            this.childNodes[1].classList.add("fa-plus");
        }

        let content = this.nextElementSibling;
        if(content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// click event on signin button

document.getElementById('open-signin').addEventListener('click', function() {
    document.getElementById('signin-modal').style.display = 'block';
});

document.getElementById('close-signin').addEventListener('click', function() {
    document.getElementById('signin-modal').style.display = 'none';
});

let removedDiv = null;

document.getElementById('open-signin').addEventListener('click', function() {
    const divToToggle = document.getElementById('div-to-toggle');
    if (divToToggle) {
        removedDiv = divToToggle.cloneNode(true); // Save a copy of the div
        divToToggle.parentNode.removeChild(divToToggle);
    }
});

document.getElementById('close-signin').addEventListener('click', function() {
    if (removedDiv) {
        document.body.insertBefore(removedDiv, document.getElementById('div-to-toggle'));
        removedDiv = null; // Clear the saved div after reinserting
    }
});

// Email validation code

// document.getElementById('getStarted').addEventListener('click', function() {
//     var emailField = document.getElementById("email_validate");
//     var emailContainer = document.getElementById("emailContainerID");
//     var emailError = document.getElementById("email-error");

//     if(!validateEmail(emailField)){
//         emailError.innerHTML = "Please enter a valid email";
//         emailContainer.style.borderColor = "red";
//         emailError.style.top = "120%";
//     }
//     else if(validateEmail(emailField)){
//         document.getElementById('getStarted').addEventListener('click', function() {
//             window.location.href = 'newpage.html';
//         });

//         emailError.innerHTML = "";
//         emailContainer.style.borderColor = "green";
//         emailError.style.top = "100%";

        
//     }
// });

var emailField = document.getElementById("email_validate");
var emailContainer = document.getElementById("emailContainerID");
var emailError = document.getElementById("email-error");

function validateEmail(){
    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = "Please enter a valid email";
        emailContainer.style.borderColor = "red";
        emailError.style.top = "120%";
        return false;
    }
    emailError.innerHTML = "";
    emailContainer.style.borderColor = "green";
    emailError.style.top = "100%";
    document.getElementById('getStarted').addEventListener('click', function() {
        localStorage.setItem('email', emailField.value);
        window.location.href = 'newpage.html';
    });
    return true;
}

// click event on Get Started button

// document.getElementById('getStarted').addEventListener('click', function() {
//     document.getElementById('create_passwordID').style.display = 'block';
// });

// document.getElementById('close-passwordPage').addEventListener('click', function() {
//     document.getElementById('create_passwordID').style.display = 'none';
// });
