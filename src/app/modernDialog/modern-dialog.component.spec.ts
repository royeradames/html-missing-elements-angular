import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernDialogComponent } from './modern-dialog.component';

describe('ModernDialogComponent', () => {
  let component: ModernDialogComponent;
  let fixture: ComponentFixture<ModernDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModernDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
