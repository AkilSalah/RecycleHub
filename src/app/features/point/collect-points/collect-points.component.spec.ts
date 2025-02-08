import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPointsComponent } from './collect-points.component';

describe('CollectPointsComponent', () => {
  let component: CollectPointsComponent;
  let fixture: ComponentFixture<CollectPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
