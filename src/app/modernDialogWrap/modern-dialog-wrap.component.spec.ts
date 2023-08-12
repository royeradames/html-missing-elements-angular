import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernDialogWrapComponent } from './modern-dialog-wrap.component';

describe('ModernDialogComponent', () => {
  let component: ModernDialogWrapComponent;
  let fixture: ComponentFixture<ModernDialogWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernDialogWrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModernDialogWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
