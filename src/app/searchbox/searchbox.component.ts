import {OnInit, Component, Inject} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GetDataService} from 'src/app/get-data.service';


export interface UserData {
  stay: string;
  room: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressStreet: string;
  addressLocation: string;
  extras: string;
  payment: string;
  note: string;
  tags: string;
  reminder: string;
  newsletter: string;
  confirm: string;
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit  {

  displayedColumns: string[] = ['stay.arrivalDate', 'stay.departureDate','room.roomSize','room.roomQuantity', 'firstName','lastName', 'email','phone','addressStreet.streetName','addressStreet.streetNumber', 'addressLocation.zipCode','addressLocation.state','addressLocation.city', 'extras','payment','note','tags', 'reminder','newsletter','confirm'];
  dataSource: any;
  reservation: any;
  dataSubscription: any;

  constructor(private dialog: MatDialog, private getData: GetDataService) {}

  ngOnInit() {
    this.dataSubscription = this.getData.getJsonData().subscribe((res)=> {
      this.reservation = res;
      this.dataSource= new MatTableDataSource(this.reservation);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  
  openDialog(row: UserData): void {

    this.dialog.open(PopupComponent, {
      data: row
    });
  }

  ngOnDestrou() {
    this.dataSubscription.unsubscribe();
  }

}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {

  selected= this.data.room.roomSize == 'business-suite' ? 'option1' : 'option2';
  checked!: true;

  stayarr = new FormControl(this.data.stay.arrivalDate,[Validators.required]);
  staydep = new FormControl(this.data.stay.departureDate, [Validators.required]);
  emailFormControl = new FormControl(this.data.email, [Validators.required, Validators.email]);
  firstName = new FormControl(this.data.firstName,[Validators.required, Validators.maxLength(25)]);
  lastName = new FormControl(this.data.lastName,[Validators.required, Validators.maxLength(25)]);
  zipFormControl = new FormControl(this.data.addressLocation.zipCode,[Validators.required]);
  statefc = new FormControl(this.data.addressLocation.state, [Validators.required]);
  cityfc = new FormControl(this.data.addressLocation.city,[Validators.required]);
  telephone = new FormControl(this.data.phone, [Validators.required]);
  streetNamefc = new FormControl(this.data.addressStreet.streetName,[Validators.required]);
  streetNumberfc = new FormControl(this.data.addressStreet.streetNumber,[Validators.required]);
  extras = new FormControl(this.data.extras,[Validators.required]);
  personalNote = new FormControl(this.data.note,[Validators.required]);
  reminder = new FormControl(this.data.reminder,[Validators.required]);
  newsletter = new FormControl(this.data.newsletter,[Validators.required]);
  confirm = new FormControl(this.data.confirm,[Validators.required]);
  payment = new FormControl(this.data.payment,[Validators.required]);
  roomSize = new FormControl(this.selected,[Validators.required]);
  roomQuantity = new FormControl(this.data.room.roomQuantity,[Validators.required]);
  chipTags = new FormControl(this.data.tags,[Validators.required]);

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.data = data
    }

  }


