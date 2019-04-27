import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverifyComponent } from './otpverify.component';

describe('OtpverifyComponent', () => {
  let component: OtpverifyComponent;
  let fixture: ComponentFixture<OtpverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
