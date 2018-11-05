import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForTreeComponent } from './for-tree.component';

describe('ForTreeComponent', () => {
  let component: ForTreeComponent;
  let fixture: ComponentFixture<ForTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
