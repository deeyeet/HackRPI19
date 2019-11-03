import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private http: HttpClient) { }

  public getConfig(state: string) {
    var url = 'http://data.orghunter.com/v1/charitysearch?user_key=51f12dbea013cc4fb813c27d2947c38d&state=NY';

    // if (state != "") {
    //   url += '&state=' + state;
    // }
    // console.log(url);
    return this.http.get(url);
  }
}
