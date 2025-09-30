import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AssistantComponent } from './components/assistant/assistant.component';
import { TitleComponent } from './components/title/title.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',     
  standalone: true,
  imports: [
    //NavbarComponent,
    AssistantComponent,
    TitleComponent,
    RouterModule
  ],           
  templateUrl: './app.component.html',       
  styleUrls: ['./app.component.css']        
})

export class AppComponent {}

