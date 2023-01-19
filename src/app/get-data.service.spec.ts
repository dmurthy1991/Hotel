import { TestBed } from '@angular/core/testing';
import { GetDataService } from './get-data.service';
import { HttpClientModule } from '@angular/common/http';


describe('GetDataService', () => {
  let service: GetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule
      ]
    }).compileComponents();
    service = TestBed.inject(GetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
