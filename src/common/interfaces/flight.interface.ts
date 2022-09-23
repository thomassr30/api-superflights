import { IPassanger } from './passanger.interface';
export interface IFlight{
    piloto: string
    airplane: string
    destinationCity: string;
    flightDate: Date;
    passengers: IPassanger[]
}