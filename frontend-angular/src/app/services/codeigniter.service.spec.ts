import { TestBed } from '@angular/core/testing';

import { CodeigniterService } from './codeigniter.service';

describe('CodeigniterService', () => {
  let service: CodeigniterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeigniterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
