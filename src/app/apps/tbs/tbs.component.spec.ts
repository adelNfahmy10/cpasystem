import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbsComponent } from './tbs.component';

describe('TbsComponent', () => {
  let component: TbsComponent;
  let fixture: ComponentFixture<TbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
