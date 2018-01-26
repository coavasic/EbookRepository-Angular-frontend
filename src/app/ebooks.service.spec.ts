import { TestBed, inject } from '@angular/core/testing';

import { EbooksService } from './ebooks.service';

describe('EbooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EbooksService]
    });
  });

  it('should be created', inject([EbooksService], (service: EbooksService) => {
    expect(service).toBeTruthy();
  }));
});
