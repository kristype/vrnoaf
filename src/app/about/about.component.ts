import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
@Injectable()
export class AboutComponent implements OnInit {

  constructor(private dataService: DataService) { }

  aboutContent;

  ngOnInit() {
    this.getAboutContent();
  }


  private getAboutContent() {
    this.dataService.getPageContent(environment.aboutContentPageId).subscribe(r => this.aboutContent = r);
  }
}
