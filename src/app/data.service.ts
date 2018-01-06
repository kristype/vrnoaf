import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/isEmpty';

import { MessageService } from './message.service';
import { environment } from '../environments/environment';
import { ContentPage } from './model/json/contentPage';
import { Content } from './model/json/content';
import { Post } from './model/post';
import { retry } from 'rxjs/operators/retry';

@Injectable()
export class DataService {

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) { }

  getPageContent(pageId: number): Observable<string> {
    const pageContentUrl = environment.wpApiUrl + 'pages/' + pageId;
    return this.httpClient.get<ContentPage>(pageContentUrl)
            .pipe(tap(r => this.log('fetched page ' + pageId)),
                  catchError(this.handleError('getPage ' + pageId, {content: {rendered: 'Page content not found'}})))
            .map(v => v.content.rendered);
  }

  checkNextPageExists(currentPage: number): Observable<boolean> {
    const peekPost = (currentPage * environment.postsPerPage) + 1;
    const request = 'posts?page=' + peekPost + '&per_page=1';
    const postsUrl = environment.wpApiUrl + request;
    return this.httpClient.get<ContentPage>(postsUrl)
    .pipe(tap(r => this.log('peeked for page ' + peekPost)),
                  catchError(this.handleError(request, [])))
    .isEmpty()
    .map(b => !b);
  }

  getPosts(page: number): Observable<Post[]> {
    const postsUrl = environment.wpApiUrl + 'posts?page=' + page + '&per_page=' +  environment.postsPerPage;
    return this.httpClient.get<ContentPage[]>(postsUrl)
    .map(cp => {
      return cp.map(c => {
        const post: Post = {
          title: c.title.rendered,
          content: c.content.rendered,
          author: getAuthor(c.author),
          dateFormatted: c.date,
          datetime: new Date(Date.now()),
        };
        return post;
      });
    });
  }

  getAuthor(authorId: number): string {

  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
