import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryRecordsComponent } from './inquiry-records.component';

describe('InquiryRecordsComponent', () => {
  let component: InquiryRecordsComponent;
  let fixture: ComponentFixture<InquiryRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
