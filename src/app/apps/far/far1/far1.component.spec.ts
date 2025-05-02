import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Far1Component } from './far1.component';

describe('Far1Component', () => {
  let component: Far1Component;
  let fixture: ComponentFixture<Far1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Far1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Far1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
