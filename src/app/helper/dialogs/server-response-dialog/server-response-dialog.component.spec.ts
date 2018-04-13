import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerResponseDialogComponent } from './server-response-dialog.component';

describe('ServerResponseDialogComponent', () => {
  let component: ServerResponseDialogComponent;
  let fixture: ComponentFixture<ServerResponseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerResponseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
