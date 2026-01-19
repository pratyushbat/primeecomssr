import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomelementComponent } from './customelement.component';

describe('CustomelementComponent', () => {
  let component: CustomelementComponent;
  let fixture: ComponentFixture<CustomelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomelementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
