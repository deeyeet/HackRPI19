import { Charity } from './charity.model';

export interface charityMap
{
    [state: string]: Charity[];
}