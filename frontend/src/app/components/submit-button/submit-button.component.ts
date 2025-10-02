import { Component } from '@angular/core';

@Component({
    selector: 'submit-button',
    standalone: true,
    templateUrl: './submit-button.component.html',
    styleUrls: ['./submit-button.component.css']
})

export class SubmitButton {

    onClickSubmit() {
        var submitButton = document.getElementById('submit');
        
        if (submitButton) {
            submitButton.setAttribute('hidden', 'true');
        }

        var spinButton = document.getElementById('spin-submit');

        spinButton && spinButton.hasAttribute('hidden') ? spinButton.removeAttribute('hidden') : null;

        setTimeout(() => {
            spinButton ? spinButton.setAttribute('hidden', 'true') : null;
            var doneButton = document.getElementById('submit-done');
            doneButton && doneButton.hasAttribute('hidden') ? doneButton.removeAttribute('hidden') : null;
        }, 5000);
    }
}