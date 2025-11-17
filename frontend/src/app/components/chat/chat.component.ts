import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
    selector: 'assistant-chat',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent {
    message: string = 'Hello, how can I assist you today?';
    showBubble: boolean = true;

    showUpload: boolean = false;
    showInput: boolean = false;
    buttonsDisabled: boolean = false;

    userText: string = '';
    uploadedFileName: string = '';
    bubbleClass: string = 'assistant-bubble info';

  constructor(private api: ApiService) {}

    private setBubble(message: string, type: 'info' | 'success' | 'error' | 'upload') {
    this.message = message;
    this.bubbleClass = `assistant-bubble ${type}`;
  }

  // Button handlers
  onUploadClick() {
    this.setBubble('Select a file to upload...', 'info');
    this.showUpload = true;
    this.showInput = false;
    this.buttonsDisabled = true;
  }

  onTypeClick() {
    this.setBubble('Sure! Type your info below.', 'info');
    this.showInput = true;
    this.showUpload = false;
    this.buttonsDisabled = true;
  }

  onSendClick() {
    if (this.userText.trim()) {
      this.setBubble(`You typed: ${this.userText}`, 'success');
      this.userText = '';
    }
  }

onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadedFileName = file.name;
      this.setBubble(`Uploading file: ${file.name}...`, 'upload');

      console.log('File selected:', file);
      this.api.uploadFile(file).subscribe({
        next: (res) => this.setBubble(`File uploaded successfully: ${file.name}`, 'success'),
        error: (err) => this.setBubble('Failed to upload file. Please try again.', 'error')
      });
    } else {
      this.setBubble('No file selected.', 'error');
    }
  }

  resetChat() {
    this.setBubble('Hello, how can I assist you today?', 'info')
    this.showUpload = false;
    this.showInput = false;
    this.buttonsDisabled = false;
    this.userText = '';
    this.uploadedFileName = '';
  }
}