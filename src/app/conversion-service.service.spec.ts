import { TestBed } from '@angular/core/testing';

import { ConversionServiceService } from './conversion-service.service';

describe('ConversionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversionServiceService = TestBed.get(ConversionServiceService);
    expect(service).toBeTruthy();
  });
});
