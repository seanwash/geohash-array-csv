import { describe, it, expect } from 'vitest';
import { convertToCsv } from './csvConverter';

describe('convertToCsv', () => {
  it('should convert a simple array to CSV', () => {
    const input = '["item1", "item2", "item3"]';
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should handle array without brackets', () => {
    const input = 'item1, item2, item3';
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should handle single quotes', () => {
    const input = "['item1', 'item2', 'item3']";
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should add header when provided', () => {
    const input = 'item1, item2, item3';
    const result = convertToCsv(input, 'geohash');
    expect(result.csv).toBe('geohash\nitem1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should handle extra whitespace', () => {
    const input = '  item1  ,  item2  ,  item3  ';
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should filter empty items', () => {
    const input = 'item1,,item2,,,item3,';
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should handle geohash format', () => {
    const input = '["dp3w", "dp3x", "dp3z", "dp61", "dp62"]';
    const result = convertToCsv(input, 'geohash');
    expect(result.csv).toBe('geohash\ndp3w\ndp3x\ndp3z\ndp61\ndp62');
    expect(result.error).toBeUndefined();
  });

  it('should return error for empty input', () => {
    const result = convertToCsv('', '');
    expect(result.csv).toBe('');
    expect(result.error).toBe('Please paste your array');
  });

  it('should return error for whitespace-only input', () => {
    const result = convertToCsv('   ', '');
    expect(result.csv).toBe('');
    expect(result.error).toBe('Please paste your array');
  });

  it('should return error when no valid items found', () => {
    const result = convertToCsv('[,,,]', '');
    expect(result.csv).toBe('');
    expect(result.error).toBe('No valid items found in the array');
  });

  it('should trim header whitespace', () => {
    const input = 'item1, item2';
    const result = convertToCsv(input, '  header  ');
    expect(result.csv).toBe('header\nitem1\nitem2');
    expect(result.error).toBeUndefined();
  });

  it('should handle mixed quote styles', () => {
    const input = '"item1", \'item2\', item3';
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item1\nitem2\nitem3');
    expect(result.error).toBeUndefined();
  });

  it('should handle nested brackets in items', () => {
    const input = '["item[1]", "item[2]", "item[3]"]';
    const result = convertToCsv(input, '');
    expect(result.csv).toBe('item[1]\nitem[2]\nitem[3]');
    expect(result.error).toBeUndefined();
  });
});