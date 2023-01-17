import {AfterViewInit, OnInit, Component, Inject, ViewChild, Input, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import reservations from './reservations.json';
import { MatFormField } from "@angular/material/form-field";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { formatCurrency } from '@angular/common';


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
export class SearchboxComponent implements AfterViewInit {
  [x: string]: any;
  displayedColumns: string[] = ['stay.arrivalDate', 'stay.departureDate','room.roomSize','room.roomQuantity', 'firstName','lastName', 'email','phone','addressStreet.streetName','addressStreet.streetNumber', 'addressLocation.zipCode','addressLocation.state','addressLocation.city', 'extras','payment','note','tags', 'reminder','newsletter','confirm'];
  dataSource = new MatTableDataSource(reservations);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(row: UserData): void {

    const dialogRef = this.dialog.open(PopupComponent, {

      data: row,

    });
    // console.log('clicked', this.dataSource.data[1]);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this['data'] = result;
    });
  }

}
export interface Tags {
  tags: string;
}


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {
  [x: string]: any;

  selected='option1';
  checked!: true;

  stayarr = new FormControl('',[Validators.required]);
  staydep = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('',[Validators.required, Validators.maxLength(25)]);
  lastName = new FormControl('',[Validators.required, Validators.maxLength(25)]);
  zipFormControl = new FormControl('',[Validators.required]);
  statefc = new FormControl('', [Validators.required]);
  cityfc = new FormControl('',[Validators.required]);
  telephone = new FormControl('', [Validators.required]);
  streetNamefc = new FormControl('',[Validators.required]);
  streetNumberfc = new FormControl('',[Validators.required]);

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {this.data = data}
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  //tags

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // tags: Tags[] = [DataSource.arguments.tags];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this['tags'].push({value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tags): void {
    const index = this['tags'].indexOf(tag);

    if (index >= 0) {
      this['tags'].splice(index, 1);
    }
  }

  edit(tag: Tags, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this['tags'].indexOf(tag);
    if (index >= 0) {
      this['tags'][index] = value;
    }
  }

}


