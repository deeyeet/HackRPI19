import { Component } from '@angular/core';
import { Charity } from './charity.model';
import { Disaster } from './disaster.model';
import { DisasterService } from './disaster.service';
import { CharityService } from './charity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private disasterService: DisasterService, 
              private charityService: CharityService) { }

  public allStates = this.disasterService.states;
  public allFilters = this.disasterService.filters;
  public allDisasters = this.disasterService.disasters;
  public allRecents = this.disasterService.recents;

  title = 'DisasterDonation';
  public disasterArray = [];
  public charityMap: Map<string, Charity[]> = new Map();

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
    this.charityMap.clear();
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
            this.charityMap.set(disasterObj.location, []);
            
            // if (!this.charityMap.has(disasterObj.location)) {
            //   this.charityMap.set(disasterObj.location, []);
            //   console.log(disasterObj.location);
            //   this.charityService.getConfig(disasterObj.location)
            //     .subscribe((charityData: any) => {
            //       var charities = charityData["data"];
            //       for (let j in charities) {
            //         var charityObj = new Charity;
            //         charityObj.name = charities[j]["charityName"];
            //         charityObj.url = charities[j]["donationUrl"];
            //         this.charityMap.get(disasterObj.location).push(charityObj);
            //         disasterObj.charities.push(charityObj);
            //       }
            //     });
              
            // } else {
            //   var charities = this.charityMap.get(disasterObj.location);
            //   for (let i in charities) {
            //     disasterObj.charities.push(charities[i]);
            //   }
            // }
          }
    });
    
    this.charityConfig();
    
  }

  public charityConfig(): void {
    // for (let entry of this.charityMap.entries()) {
    //   this.charityService.getConfig(entry[0])
    //     .subscribe((charityData: any) => {
    //       var charities = charityData["data"];
    //       console.log("wha");
    //       for (let j in charities) {
    //         var charityObj = new Charity;
    //         charityObj.name = charities[j]["charityName"];
    //         charityObj.url = charities[j]["donationUrl"];
    //         var arr = entry[1];
    //         this.charityMap.set(entry[0], arr);
    //       }
    //   });
    // }

    // console.log(this.charityMap);

    // for (let i in this.disasterArray) {
    //   for (let j in this.charityMap.get(this.disasterArray[i].location)) {
    //     this.disasterArray[i].charities.push(this.charityMap.get(this.disasterArray[i].location)[j]);
    //   }
    // } 
    this.charityService.getConfig('NY')
        .subscribe((charityData: any) => {
          console.log(charityData);
      });
  }



}
