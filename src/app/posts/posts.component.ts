import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../model/post';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() page: number;

  posts: Post[] = [];
  nextPageExists = true;
  isLoading = true;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.dataService.getPosts(this.page).subscribe(p => this.setPosts(p), error => this.isLoading = false);
    this.dataService.checkNextPageExists(this.page).subscribe(r => this.nextPageExists = r);
  }

  private setPosts(p: Post[]): void {
    this.posts = p;
    this.isLoading = false;
  }

  onNextPage() {
    this.router.navigate(['page'], {queryParams: { 'page': this.page+1 }});
  }
}
