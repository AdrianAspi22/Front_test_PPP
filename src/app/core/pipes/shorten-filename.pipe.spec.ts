import { ShortenFilenamePipe } from './shorten-filename.pipe';

describe('ShortenFilenamePipe', () => {
  it('create an instance', () => {
    const pipe = new ShortenFilenamePipe();
    expect(pipe).toBeTruthy();
  });
});
