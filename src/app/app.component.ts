import { Component, OnInit } from '@angular/core';
import { JsonLoaderService } from './services/json-loader.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Live betting';
  betsUrl = 'assets/data/bets.json';

  constructor(private jsonLoaderService: JsonLoaderService) {}

  ngOnInit(): void {
    // Example usage:
    this.jsonLoaderService
      .loadJson(this.betsUrl)
      .pipe(distinctUntilChanged())
      .subscribe((jsonData: any) => {
        console.log('Loaded JSON data:', jsonData);

        const transformFn = (data: any) => {
          return data;
        };

        this.jsonLoaderService
          .rewriteAndSaveJson(this.betsUrl, transformFn)
          .subscribe(() => {
            console.log('JSON data rewritten and saved successfully.');
          });
      });
  }
}
