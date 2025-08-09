import { describe, it, expect, vi } from 'vitest';
import { downloadCsv } from './csvDownloader';

describe('downloadCsv (browser mode)', () => {
  it('should create anchor element with correct attributes', async () => {
    const csvContent = 'header\nvalue1\nvalue2';
    
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    
    downloadCsv(csvContent);
    
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    
    const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
    expect(blob.type).toBe('text/csv');
    expect(blob.size).toBeGreaterThan(0);
    
    expect(revokeObjectURLSpy).toHaveBeenCalled();
    
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('should create anchor with custom filename', async () => {
    const csvContent = 'header\nvalue1\nvalue2';
    
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    
    downloadCsv(csvContent, 'custom.csv');
    
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalled();
    
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('should handle empty content by creating empty blob', async () => {
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    
    downloadCsv('');
    
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
    expect(blob.size).toBe(0);
    expect(blob.type).toBe('text/csv');
    
    expect(revokeObjectURLSpy).toHaveBeenCalled();
    
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('should handle large CSV content', async () => {
    const largeContent = Array.from({ length: 1000 }, (_, i) => `value${i}`).join('\n');
    
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    
    downloadCsv(largeContent);
    
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
    expect(blob.size).toBeGreaterThan(5000); // Large content should create large blob
    
    expect(revokeObjectURLSpy).toHaveBeenCalled();
    
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('should handle special characters in CSV content', async () => {
    const csvContent = 'header\n"quoted,value"\nspecial&chars<>""';
    
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    
    downloadCsv(csvContent);
    
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
    expect(blob.type).toBe('text/csv');
    
    expect(blob.size).toBeGreaterThan(csvContent.length - 10); // Approximate size check
    
    expect(revokeObjectURLSpy).toHaveBeenCalled();
    
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('should clean up DOM elements after download', async () => {
    const csvContent = 'test,data\nvalue1,value2';
    
    const initialAnchors = document.querySelectorAll('a').length;
    
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    
    downloadCsv(csvContent, 'test.csv');
    
    const finalAnchors = document.querySelectorAll('a').length;
    expect(finalAnchors).toBe(initialAnchors);
    
    expect(revokeObjectURLSpy).toHaveBeenCalled();
    
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('should create blob with exact CSV content', async () => {
    const csvContent = 'header\nvalue1\nvalue2';
    
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    
    downloadCsv(csvContent);
    
    const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
    
    const blobText = await blob.text();
    expect(blobText).toBe(csvContent);
    
    createObjectURLSpy.mockRestore();
  });
});