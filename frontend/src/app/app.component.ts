import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssistantComponent } from './components/assistant/assistant.component';
import { TitleComponent } from './components/title/title.component';
import { Title } from '@angular/platform-browser';
import { JobTextbox } from './components/job-textbox/job-textbox.component';
import { SubmitButton } from './components/submit-button/submit-button.component';
import { ChatComponent } from './components/chat/chat.component';
import { ResultComponent } from './components/result/result.component';
// import { Api } from './services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',     
  standalone: true,
  imports: [
    // CommonModule,
    AssistantComponent,
    TitleComponent,
    JobTextbox,
    SubmitButton,
    ChatComponent,
    ResultComponent,
    RouterModule,
  ],           
  templateUrl: './app.component.html',       
  styleUrls: ['./app.component.css']        
})

export class AppComponent {

}

