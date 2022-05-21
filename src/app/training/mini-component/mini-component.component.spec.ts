import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniComponentComponent } from './mini-component.component';

describe('MiniComponentComponent', () => {
  let component: MiniComponentComponent;
  let fixture: ComponentFixture<MiniComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
