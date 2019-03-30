//old theme
if ('addEventListener' in window) {
    window.addEventListener('load', function () { document.body.className = document.body.className.replace(/\bis-preload\b/, ''); });
    document.body.className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? ' is-ie' : '');
}

class Submit {
    constructor(name, subject, email, message) {
        this.name = name;
        this.subject = subject;
        this.email = email;
        this.message = message;
    }
}

class UI {
    static displaySubmited() {
        const submited = Store.getSutmit();
        submited.forEach((submit) => UI.addSubmitToList(submit));
    }
    //add submited
    static addSubmitToList(submit) {
        const list = document.querySelector('#submit-list');
        const row = document.createElement('table');

        row.innerHTML = `
        <hr>
        <tr><td><strong>Name :</strong> ${submit.name}</td></tr>
        <tr><td><strong>Subject :</strong> ${submit.subject}</td></tr>
        <tr><td><strong>Email :</strong> ${submit.email}</td></tr>
        <tr><td><strong>Message : </strong>${submit.message}</td></tr>
        <br>
        <tr><input type='submit' class='delete' value='Remove'></tr>
        `;
        list.appendChild(row);
    }

    //delete submited
    static deleteSubmit(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
        }
    }

    //show alert
    static showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNodeme(msg));
        const container = document.querySelector('.main');
        const form = document.querySelector('#submit-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove, 3000);
    } 
  
    //clear fields
    static clearField() {
        document.querySelector('#name').value = '';
        document.querySelector('#subject').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#message').value = '';
    }
}

class Store {
    static getSutmit() {
        let submited;
        if (localStorage.getItem('submited') === null) {
            submited = [];
        } else {
            submited = JSON.parse(localStorage.getItem('submited'));
        }
        return submited;
    }
    static addsubmit(submit) {
        const submited = Store.getsutmit();
        submited.push(submit);
        localStorage.setItem('submited', JSON.stringify(submited));
    }
    static removeSubmit(message) {
        const submited = Store.getsutmit();
        submited.forEach((submit, index) => {
            if (submit.message === message) {
                submited.splice(index, 1);
            }
        });
        localStorage.setItem('submited', JSON.stringify(submited));
    }
}

// Event: Displat submit
document.addEventListener('DOMContentLoaded', UI.displaySubmited);

// Event: Add submit
document.querySelector('#submit-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //get value
    const name = document.querySelector('#name').value;
    const subject = document.querySelector('#subject').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    //validate
    if (name === '' || subject === '' || email === '' || message === '') {
        UI.showAlert('Plase fill in all field', 'danger');
    } else {
        //creat submit class
        const submit = new Submit(name, subject, email, message);

        //add to UI
        UI.addSubmitToList(submit);

        //add to store
        Store.addSubmit(submit);

        //show submission
        UI.showAlert('Your submission are added', 'success');

        //UI clear fields
        UI.clearField();
    }
});

//remove this submission
document.querySelector('#submit-list').addEventListener('click', (e) => {
    UI.deleteSubmit(e.target);
    Store.removeSubmit(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Submission removed', 'success');
});