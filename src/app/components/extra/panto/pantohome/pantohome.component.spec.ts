import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantohomeComponent } from './pantohome.component';

describe('PantohomeComponent', () => {
  let component: PantohomeComponent;
  let fixture: ComponentFixture<PantohomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantohomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
