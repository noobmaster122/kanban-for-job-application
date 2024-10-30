import { TestBed } from '@angular/core/testing';
import { JobOfferDetailsImplService } from './job-offer-details-impl.service';
import { ChromeConnectionService } from '../chrome-connection/chrome-connection.service';
import { JobOfferDetail } from '../../models/jobOfferDetails.model';

describe('JobOfferDetailsImplService', () => {
  let service: JobOfferDetailsImplService;
  let chromeConnectionServiceSpy: jasmine.SpyObj<ChromeConnectionService>;

  beforeEach(() => {
    const chromeServiceSpy = jasmine.createSpyObj('ChromeConnectionService', ['getDocumentObj']);
    
    TestBed.configureTestingModule({
      providers: [
        JobOfferDetailsImplService,
        { provide: ChromeConnectionService, useValue: chromeServiceSpy }
      ]
    });
    
    service = TestBed.inject(JobOfferDetailsImplService);
    chromeConnectionServiceSpy = TestBed.inject(ChromeConnectionService) as jasmine.SpyObj<ChromeConnectionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getJobOfferDetails', () => {
    it('should call chromeConnectionService.getDocumentObj', async () => {
      chromeConnectionServiceSpy.getDocumentObj.and.returnValue(Promise.resolve(document));
      
      await service.getJobOfferDetails();
      
      expect(chromeConnectionServiceSpy.getDocumentObj).toHaveBeenCalled();
    });

    it('should throw an error if documentObj is null', async () => {
      chromeConnectionServiceSpy.getDocumentObj.and.returnValue(Promise.resolve(null));
      
      await expectAsync(service.getJobOfferDetails()).toBeRejectedWithError("Failed to retrieve the document");
    });

    it('should return expected JobOfferDetail properties', async () => {
      chromeConnectionServiceSpy.getDocumentObj.and.returnValue(Promise.resolve(document));
      
      spyOn(service as any, 'getPositionTitle').and.returnValue('Software Engineer');
      spyOn(service as any, 'getHiringManagerName').and.returnValue('John Doe');
      spyOn(service as any, 'getHiringManagerLinkedin').and.returnValue('https://linkedin.com/in/johndoe');
      
      const result: JobOfferDetail = await service.getJobOfferDetails();
      
      expect(result).toEqual({
        positionTitle: 'Software Engineer',
        hiringManagerName: 'John Doe',
        hiringManagerLinkedIn: 'https://linkedin.com/in/johndoe'
      });
    });
  });

  describe('private methods', () => {
    it('getPositionTitle should return the expected title', () => {
      const mockDocument = document;
      spyOn(mockDocument, 'querySelector').and.returnValue({ textContent: 'Software Engineer' } as Element);
      
      const positionTitle = (service as any).getPositionTitle(mockDocument);
      expect(positionTitle).toBe('Software Engineer');
    });

    it('getHiringManagerName should return the expected name', () => {
      const mockDocument = document;
      spyOn(mockDocument, 'querySelector').and.returnValue({ textContent: 'John Doe' } as Element);
      
      const hiringManagerName = (service as any).getHiringManagerName(mockDocument);
      expect(hiringManagerName).toBe('John Doe');
    });

    it('getHiringManagerLinkedin should return the expected LinkedIn URL', () => {
      const mockDocument = document;
      const mockAnchorElement = document.createElement('a');
      mockAnchorElement.href = 'https://linkedin.com/in/johndoe';
      
      spyOn(mockDocument, 'querySelector').and.returnValue(mockAnchorElement);
      
      const linkedinUrl = (service as any).getHiringManagerLinkedin(mockDocument);
      expect(linkedinUrl).toBe('https://linkedin.com/in/johndoe');
    });
  });
});
