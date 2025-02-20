import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyzeComponent } from './data-analyze.component';

describe('DataAnalyzeComponent', () => {
  let component: DataAnalyzeComponent;
  let fixture: ComponentFixture<DataAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAnalyzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
