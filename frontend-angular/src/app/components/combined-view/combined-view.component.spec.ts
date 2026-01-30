import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedViewComponent } from './combined-view.component';

describe('CombinedViewComponent', () => {
  let component: CombinedViewComponent;
  let fixture: ComponentFixture<CombinedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
