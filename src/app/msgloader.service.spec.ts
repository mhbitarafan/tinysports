import { TestBed, inject } from '@angular/core/testing';

import { MsgloaderService } from './msgloader.service';

describe('MsgloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgloaderService]
    });
  });

  it('should be created', inject([MsgloaderService], (service: MsgloaderService) => {
    expect(service).toBeTruthy();
  }));
});
