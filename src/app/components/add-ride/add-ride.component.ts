import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RidesService, Ride } from '../../services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
})
export class AddRideComponent {
  rideForm: FormGroup;

  constructor(private fb: FormBuilder, private ridesService: RidesService) {
    this.rideForm = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleType: [null, Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: ['', Validators.required],
      time: ['', Validators.required],
      pickUp: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  addRide() {
    if (this.rideForm.valid) {
      const ride: Ride = this.rideForm.value;
      this.ridesService.addRide(ride);
      this.rideForm.reset();
    }
  }
}
