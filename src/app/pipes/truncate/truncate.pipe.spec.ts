import { TruncatePipe } from './truncate.pipe'; // Adjust the import path if needed

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should truncate the string to the specified limit and append the default trail', () => {
    // Given a string longer than the limit
    const inputString = 'Hello World';
    const limit = 5;
    const expectedOutput = 'Hello...';

    // When the transform method is called
    const result = pipe.transform(inputString, limit);

    // Then it should return the truncated string with the default trail
    expect(result).toBe(expectedOutput);
  });
});
