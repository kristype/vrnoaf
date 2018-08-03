import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    //console.log(message);
    //this.messages.push(message);
  }

  error(message: string) {
    //console.message(message);
  }

  clear() {
    //this.messages = [];
  }
}