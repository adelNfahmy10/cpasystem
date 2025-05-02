import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IscComponent } from './isc.component';

describe('IscComponent', () => {
  let component: IscComponent;
  let fixture: ComponentFixture<IscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
