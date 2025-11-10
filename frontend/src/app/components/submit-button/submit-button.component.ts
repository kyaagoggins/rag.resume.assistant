import { Component } from '@angular/core';
// import { Api } from '../../services/api';

@Component({
    selector: 'submit-button',
    standalone: true,
    templateUrl: './submit-button.component.html',
    styleUrls: ['./submit-button.component.css']
})

export class SubmitButton {

    //constructor(private api: Api) {}

    onClickSubmit() {
        var submitButton = document.getElementById('submit');
        
        if (submitButton) {
            submitButton.setAttribute('hidden', 'true');
        }

        var spinButton = document.getElementById('spin-submit');

        spinButton && spinButton.hasAttribute('hidden') ? spinButton.removeAttribute('hidden') : null;

    //     // --------------------
    // // TEST BACKEND CONNECTION
    // // --------------------
    // this.api.testBackend().subscribe(
    //   res => {
    //     console.log('Backend response:', res);
    //     // optional: display result somewhere in the UI
    //   },
    //   err => {
    //     console.error('Error connecting to backend:', err);
    //   }
    // );

        setTimeout(() => {
            spinButton ? spinButton.setAttribute('hidden', 'true') : null;
            var doneButton = document.getElementById('submit-done');
            doneButton && doneButton.hasAttribute('hidden') ? doneButton.removeAttribute('hidden') : null;
        }, 5000);
    }
}