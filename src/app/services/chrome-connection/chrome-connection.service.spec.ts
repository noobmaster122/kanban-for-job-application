// src/app/services/chrome-connection/chrome-connection.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { ChromeConnectionService } from './chrome-connection.service';

describe('ChromeConnectionService', () => {
  let service: ChromeConnectionService;
  let mockPort: chrome.runtime.Port;
  const CHROME_CONNECTION : string = "angularConnection";
  const PORT_EVENT : string = "getCurrentHTML";

  // Set up a global mock for the `chrome` object
  beforeAll(() => {
    (globalThis as any).chrome = {
      runtime: {
        connect: jasmine.createSpy('connect')
      }
    };
  });

  beforeEach(() => {
    // Create a mock port with the necessary methods
    mockPort = {
      postMessage: jasmine.createSpy('postMessage'),
      onMessage: {
        addListener: jasmine.createSpy('addListener'),
      },
      disconnect: jasmine.createSpy('disconnect'),
    } as unknown as chrome.runtime.Port;

    // Mock the connect method to return the mock port
    (chrome.runtime.connect as jasmine.Spy).and.returnValue(mockPort);

    TestBed.configureTestingModule({
      providers: [ChromeConnectionService],
    });
    service = TestBed.inject(ChromeConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to Chrome runtime with correct name', () => {
    expect(chrome.runtime.connect).toHaveBeenCalledWith({ name: CHROME_CONNECTION } as any);
  });

  describe('getDocumentObj', () => {
    it('should request HTML content and resolve with a Document object', async () => {
      const htmlString = '<html><body>Test</body></html>';
      const mockMessage = { html: htmlString };
  
      // Stub onMessage to immediately invoke the callback with mockMessage
      (mockPort.onMessage.addListener as jasmine.Spy).and.callFake((callback: (message: any) => void) => {
        callback(mockMessage);
      });
  
      const result = await service.getDocumentObj();
  
      expect(result).toBeInstanceOf(Document);
      expect(result?.body.textContent).toContain('Test');
      expect(mockPort.postMessage).toHaveBeenCalledWith({ request: PORT_EVENT });
    });
  });
  

});
