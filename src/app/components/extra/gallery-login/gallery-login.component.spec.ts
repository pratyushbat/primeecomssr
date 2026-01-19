import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryLoginComponent } from './gallery-login.component';

describe('GalleryLoginComponent', () => {
  let component: GalleryLoginComponent;
  let fixture: ComponentFixture<GalleryLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
