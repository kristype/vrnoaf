import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
@Injectable()
export class AboutComponent implements OnInit {

  constructor(private dataService: DataService) { }

  aboutContent: string;

  ngOnInit() {
    this.dataService.getPageContent(environment.aboutContentPageId).subscribe(r => this.aboutContent = r);
  }
}
