import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageslidercomponentComponent } from './imageslidercomponent.component';

describe('ImageslidercomponentComponent', () => {
  let component: ImageslidercomponentComponent;
  let fixture: ComponentFixture<ImageslidercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageslidercomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageslidercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
