import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
  }

}
