import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentcancelComponent } from './paymentcancel.component';

describe('PaymentcancelComponent', () => {
  let component: PaymentcancelComponent;
  let fixture: ComponentFixture<PaymentcancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentcancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentcancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
