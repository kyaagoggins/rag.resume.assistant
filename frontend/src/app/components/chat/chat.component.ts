import { Component, Input } from '@angular/core';

@Component({
    selector: 'assistant-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent {
    @Input() message: string = '';
    @Input() show: boolean = true;
}