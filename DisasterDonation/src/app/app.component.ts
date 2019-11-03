import { Component } from '@angular/core';
import { Charity } from './charity.model';
import { Disaster } from './disaster.model';
import { DisasterService, Config } from './disaster.service';
import { appendFileSync } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private disasterService: DisasterService) { }

  public allStates = this.disasterService.states;
  public allFilters = this.disasterService.filters;
  public allDisasters = this.disasterService.disasters;
  public allRecents = this.disasterService.recents;

  title = 'DisasterDonation';
  public disasterArray = [];
  public charityDisplay: string = 'CHARITY';
  public charityDisplayURL: string = "";

  public stateDisplay: string = "STATE";
  public filterDisplay: string = "FILTER";
  public disasterDisplay: string = "DISASTER";
  public recentDisplay: string = "SORT BY";

  public showStates: boolean = false;
  public showCharities: boolean = false;
  public showStateDropdown: boolean = false;
  public showFilters: boolean = false;
  public showDisasters: boolean = false;
  public showDisasterDropdown: boolean = false;
  public showRecents: boolean = false;


  public changeCharityDisplay(charity: Charity): void {
    this.charityDisplay = charity.name;
    this.charityDisplayURL = charity.url;
    this.displayCharity();
  }

  public changeStateDisplay(state: string): void {
    this.stateDisplay = state;
    this.displayStates();
  }

  public changeFilterDisplay(elem: string): void {
    this.filterDisplay = elem;
    if (elem == "Location") {
      this.showStateDropdown = true;
      this.showDisasterDropdown = false;
    } else if (elem == "None") {
      this.showDisasterDropdown = false;
      this.showStateDropdown = false;
    } else if (elem == "Disaster Type") {
      this.showDisasterDropdown = true;
      this.showStateDropdown = false;
    }
    this.showFilters = !this.showFilters;
  }

  public changeDisasterDisplay(diz: string): void {
    this.disasterDisplay = diz;
    this.displayDisasters();
  }

  public changeRecentDisplay(rec: string): void {
    this.recentDisplay = rec;
    this.displayRecents();
  }

  public displayCharity(): void {
    this.showCharities = !this.showCharities;
  }

  public displayStates(): void {
    this.showStates = !this.showStates;
  }

  public displayFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public displayDisasters(): void {
    this.showDisasters = !this.showDisasters;
  }

  public displayRecents(): void {
    this.showRecents = !this.showRecents;
  }

  public goToLink(): void {
    if (this.charityDisplay != 'CHARITY') {
      window.open(this.charityDisplayURL);
    }
  }

  public showConfig(): void {
    this.disasterArray = [];
    var recent = '';
    var state = '';
    var disaster = '';
    if (this.showStateDropdown && this.stateDisplay != "STATE") {
      state = this.stateDisplay; 
    }

    if (this.showDisasterDropdown && this.disasterDisplay != "DISASTER") {
      disaster = this.disasterDisplay;
    }

    if (this.recentDisplay != "SORT BY") {
      if (this.recentDisplay == "Most Recent") {
        recent = "desc";
      } else if (this.recentDisplay == "Least Recent") {
        recent = "asce";
      }
    }
    this.disasterService.getConfig(recent, state, disaster)
      .subscribe((data: any) => {
          var disasters = data["DisasterDeclarationsSummaries"];
          for (let i in disasters) {
            var disasterObj = new Disaster;
            disasterObj.location = disasters[i]["state"];
            disasterObj.type = disasters[i]["incidentType"];
            this.disasterArray.push(disasterObj);
          }
          
      });
    
  }

  // public stateDisplay: string = "STATE";
  // public filterDisplay: string = "FILTER";
  // public disasterDisplay: string = "DISASTER";
  // public recentDisplay: string = "SORT BY";

}
