import { tick } from "@angular/core/testing";
import { dashCaseToCamelCase } from "@angular/compiler/src/util";

export class Post {
  content: string;
  title: string;
  datetime: Date;
  author: string;

  constructor(content: string, title: string, datetime: Date, author: string) {
    this.content = content;
    this.title = title;
    this.datetime = datetime;
    this.author = author;
  }
}
