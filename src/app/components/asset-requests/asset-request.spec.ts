import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequests } from './asset-request';

describe('AssetRequests', () => {
  let component: AssetRequests;
  let fixture: ComponentFixture<AssetRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
