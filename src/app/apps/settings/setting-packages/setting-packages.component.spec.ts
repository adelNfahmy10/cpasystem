import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPackagesComponent } from './setting-packages.component';

describe('SettingPackagesComponent', () => {
  let component: SettingPackagesComponent;
  let fixture: ComponentFixture<SettingPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
