import { Charity } from "./charity.model";

export class Disaster {
    location: string = "Troy, NY";
    type: string = "Mugger";
    charities: Charity[] = [new Charity("Google Charity", "https://www.google.com/")];
}