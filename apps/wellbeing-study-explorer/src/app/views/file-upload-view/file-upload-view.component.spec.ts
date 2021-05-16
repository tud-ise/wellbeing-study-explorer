import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadViewComponent } from './file-upload-view.component';

describe('FileUploadViewComponent', () => {
  let component: FileUploadViewComponent;
  let fixture: ComponentFixture<FileUploadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
