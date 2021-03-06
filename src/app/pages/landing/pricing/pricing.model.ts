import { Feature } from '../features/feature.model';

export class Package {
    packageid: number;
    packagecode: string;
    shortname: string;
    description: string;
    packagetype: string;
    currency: string;
    baseprice: string;
    startdate: string;
    enddate: string;
    features: Feature[];
}
