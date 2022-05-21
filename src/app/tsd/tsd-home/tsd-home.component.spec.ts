import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsdHomeComponent } from './tsd-home.component';

describe('TsdHomeComponent', () => {
  let component: TsdHomeComponent;
  let fixture: ComponentFixture<TsdHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsdHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
