import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'assistant-chat',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent {
    defaultMessage: string = 'Hello, how can I assist you today?';
    message: string = this.defaultMessage;
    show: boolean = true;

  showUpload: boolean = false;
  showInput: boolean = false;

  buttonsDisabled: boolean = false;

  // User input
  userText: string = '';
  uploadedFileName: string = '';

  // Button handlers
  onUploadClick() {
    this.message = 'Great! Please upload your file below.';
    this.showUpload = true;
    this.showInput = false;
    this.buttonsDisabled = true;
  }

  onTypeClick() {
    this.message = 'Sure! Type your info below.';
    this.showInput = true;
    this.showUpload = false;
    this.buttonsDisabled = true;
  }

  onSendClick() {
    if (this.userText.trim()) {
      this.message = `You typed: ${this.userText}`;
      this.userText = '';
    }
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFileName = input.files[0].name;
      this.message = `File uploaded: ${this.uploadedFileName}`;
    } else {
      this.message = 'No file selected.';
    }
  }

  resetChat() {
    this.message = this.defaultMessage;
    this.showUpload = false;
    this.showInput = false;
    this.buttonsDisabled = false;
    this.userText = '';
    this.uploadedFileName = '';
  }
}