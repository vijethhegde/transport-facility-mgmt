import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RidesService, Ride } from '../../services/ride.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.component.html',
  styleUrls: ['./rides-list.component.css'],
})
export class RidesListComponent implements OnInit {
  rides: Ride[] = [];
  filterForm: FormGroup;

  constructor(
    private ridesService: RidesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this.fb.group({
      vehicleType: ['All'],
      bookingEmployeeId: [''],
    });
  }

  ngOnInit() {
    this.ridesService.getRides().subscribe((rides) => (this.rides = rides));
  }

  bookRide(ride: Ride) {
    const employeeId = this.bookingEmployeeId.value;
    if (!employeeId) return alert('Enter Employee ID to book');

    const success = this.ridesService.bookRide(employeeId, ride);
    if (!success) {
      alert('Cannot book this ride');
    } else {
      this.snackBar.open('Hurray, ride added!', '', {
        duration: 3000,
      });
    }
  }

  get vehicleType(): FormControl {
    return this.filterForm.get('vehicleType') as FormControl;
  }

  get bookingEmployeeId(): FormControl {
    return this.filterForm.get('bookingEmployeeId') as FormControl;
  }

  filteredRides(): Ride[] {
    return this.rides.filter((r) => {
      const matchesVehicle =
        this.vehicleType.value === 'All' ||
        r.vehicleType === this.vehicleType.value;
      return matchesVehicle;
    });
  }
}
