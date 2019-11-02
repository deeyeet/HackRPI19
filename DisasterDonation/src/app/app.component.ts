import { Component } from '@angular/core';
import { Charity } from './charity.model';
import { Disaster } from './disaster.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DisasterDonation';
  public disasterArray = [new Disaster];
  public charityDisplay: string = 'CHARITY';
  public charityDisplayURL: string = '';
  public showCharities: boolean = false;

  public changeCharityButtonDisplay(charity: Charity): void {
    this.charityDisplay = charity.name;
    this.charityDisplayURL = charity.url;
    this.displayCharity();
  }

  public displayCharity(): void {
    this.showCharities = !this.showCharities;
  }

  public goToLink(): void {
    if (this.charityDisplay != 'CHARITY') {
      window.open(this.charityDisplayURL);
    }
  }



}
