import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  metadata: any;
  summaries: any;
}

@Injectable({
  providedIn: 'root'
})
export class DisasterService {

  public filters: string[] = ["Location", "Disaster Type", "None"];
  public recents: string[] = ["Most Recent", "Least Recent", "None"];
  public disasters: string[] = ["Hurricane", "Fire", "Earthquake", "Drought", "Flood", "Mud/Landslide", "Severe Storm(s)", "Tornado", "Wildfire"];
  public states: string[] =  ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA","KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  constructor(private http: HttpClient) { }

  public getConfig(recent: string, location: string, type: string) {
    var url: string = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?";
    var select: string = "$select=state,declarationDate,incidentType,title,incidentBeginDate,incidentEndDate,disasterCloseOutDate,declaredCountyArea";
    var orderby: string = "";
    var filterType: string = "";
    var filterLocation: string = "";
    var filterDate: string = "&$filter=incidentBeginDate ge ";

    var currentYear: number = new Date().getFullYear();
    console.log(currentYear);
    var fiveYearsBack: string = String(currentYear - 5);
    var dateParam: string = filterDate + "'" + fiveYearsBack + "-01-01T04:00:00.000z'";
    console.log(dateParam);


    if (recent == "desc") {
      orderby = "&$orderby=declarationDate desc";
    } else if (recent == "asce") {
      orderby = "&$orderby=declarationDate";
    }

    if (location != "") {
      filterLocation = " and state eq " + "'" + location + "' ";
    }

    if (type != "") {
      filterType = " and incidentType eq " + "'" + type + "' ";
    }

    url += select + dateParam;

    if (filterType != "") {
      url += filterType;
    }

    if (filterLocation != "") {
      url += filterLocation;
    }

    if (orderby != "") {
      url += orderby;
    }

    console.log(url);

    return this.http.get<Config>(url);
  }

}
