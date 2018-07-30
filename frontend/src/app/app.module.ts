import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageComponent } from './page/page.component';
import { TeamspeakComponent } from './teamspeak/teamspeak.component';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';
import { MessagesComponent } from './messages/messages.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    AboutComponent,
    PageComponent,
    TeamspeakComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DataService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
