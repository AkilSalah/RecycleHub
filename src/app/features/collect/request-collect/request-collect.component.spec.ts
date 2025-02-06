import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCollectComponent } from './request-collect.component';

describe('RequestCollectComponent', () => {
  let component: RequestCollectComponent;
  let fixture: ComponentFixture<RequestCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCollectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
