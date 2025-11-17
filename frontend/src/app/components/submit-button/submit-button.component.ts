import { Component } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
    selector: 'submit-button',
    standalone: true,
    templateUrl: './submit-button.component.html',
    styleUrls: ['./submit-button.component.css']
})

export class SubmitButton {

    constructor(private api: ApiService) {}

    onClickSubmit() {
        var submitButton = document.getElementById('submit');
        
        if (submitButton) {
            submitButton.setAttribute('hidden', 'true');
        }

        var spinButton = document.getElementById('spin-submit');

        spinButton && spinButton.hasAttribute('hidden') ? spinButton.removeAttribute('hidden') : null;

        this.api.testBackend().subscribe({
            next: (res) => {
                console.log('API SUCCESS:', res);
                this.finishAnimation();
            },
            error: (err) => {
                console.error('API ERROR:', err);
                this.finishAnimation(true); 
            }
        });
    }

    private finishAnimation(isError: boolean = false) {
        var spinButton = document.getElementById('spin-submit');
        var doneButton = document.getElementById('submit-done');
        var submitButton = document.getElementById('submit');

        setTimeout(() => {
            spinButton ? spinButton.setAttribute('hidden', 'true') : null;

            if (!isError) {
                 doneButton && doneButton.hasAttribute('hidden') ? doneButton.removeAttribute('hidden') : null;
            } else {
                submitButton?.removeAttribute('hidden');    
                doneButton?.setAttribute('hidden', 'true');
                console.log('Backend API call failed.');
            }
        }, 5000);
    }

}