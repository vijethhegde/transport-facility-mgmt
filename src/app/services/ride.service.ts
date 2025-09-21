import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Ride {
  employeeId: string;
  vehicleType: string;
  vehicleNo: string;
  vacantSeats: number;
  time: string;
  pickUp: string;
  destination: string;
  bookedBy: string[];
}

@Injectable({ providedIn: 'root' })
export class RidesService {
  private rides: Ride[] = [];
  private rides$ = new BehaviorSubject<Ride[]>([]);

  getRides() {
    return this.rides$.asObservable();
  }

  addRide(ride: Ride) {
    ride.bookedBy = [];
    this.rides.push(ride);
    this.rides$.next(this.rides);
  }

  bookRide(employeeId: string, ride: Ride) {
    debugger
    if (ride.employeeId === employeeId) return false;
    if (ride.bookedBy.includes(employeeId)) return false;
    if (ride.vacantSeats <= 0) return false;

    ride.bookedBy.push(employeeId);
    ride.vacantSeats -= 1;
    this.rides$.next(this.rides);
    return true;
  }
}
