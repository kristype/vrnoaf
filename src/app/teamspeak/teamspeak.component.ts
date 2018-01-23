import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment.prod';
import loadTsViewer from './tsViewerLoader';

@Component({
  selector: 'app-teamspeak',
  templateUrl: './teamspeak.component.html',
  styleUrls: ['./teamspeak.component.scss']
})
export class TeamspeakComponent implements OnInit {

  constructor(private dataService: DataService) { }

  teamspeakContent: string;

  ngOnInit() {
    this.dataService.getPageContent(environment.tsContentPageId).subscribe(r => this.teamspeakContent = r);
  }

  ngAfterViewInit(): void {
    loadTsViewer();
  }
}
