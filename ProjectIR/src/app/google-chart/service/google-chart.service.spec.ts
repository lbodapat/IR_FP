import { TestBed, inject } from '@angular/core/testing';

import { GoogleChartService } from './google-chart.service';

describe('GoogleChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleChartService]
    });
  });

  it('should be created', inject([GoogleChartService], (service: GoogleChartService) => {
    expect(service).toBeTruthy();
  }));
});
