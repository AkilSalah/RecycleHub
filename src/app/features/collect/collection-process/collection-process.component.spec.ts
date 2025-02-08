import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionProcessComponent } from './collection-process.component';

describe('CollectionProcessComponent', () => {
  let component: CollectionProcessComponent;
  let fixture: ComponentFixture<CollectionProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
