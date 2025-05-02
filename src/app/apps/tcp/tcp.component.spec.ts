import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcpComponent } from './tcp.component';

describe('TcpComponent', () => {
  let component: TcpComponent;
  let fixture: ComponentFixture<TcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TcpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
