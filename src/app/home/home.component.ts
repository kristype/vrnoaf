import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../model/post';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  nextPageExists = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
   // this.dataService.checkNextPageExists(1).subscribe(r => this.nextPageExists = r);
    this.dataService.getPosts(1).subscribe(r => this.posts = r);
  }

  nextPage(): void {

  }
}
