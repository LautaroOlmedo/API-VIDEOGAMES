import {describe, expect, it} from 'vitest'


let fizzbuzz = (num) =>{
  if (typeof num !== 'number') throw new Error('the function needs a number');
  if(Number.isNaN(num)) throw new Error('the function needs a number');
  if(num % 5 === 0 && num % 3 === 0) return 'fizzbuzz'
  if(num % 3 === 0) return 'fizz'
  if(num % 5 === 0) return 'buzz'
  return num;
}


describe('fizzbuzz', () =>{
  // it('should be a function', () =>{
  //   expect(typeof fizzbuzz).toBe('function')
  // });

  it('should throw if not number is provides as params', () =>{
    expect(() => fizzbuzz()).toThrow();
  });

  it('should throw a specific error message if not number is provided', () =>{
    expect(() => fizzbuzz()).toThrow('the function needs a number');
  });

  it('should throw a specific error message if not number is provided', () =>{
    expect(() => fizzbuzz(NaN)).toThrow('the function needs a number');
  });

  it('should return 1 if number provided is 1', () =>{
    expect(fizzbuzz(1)).toBe(1);
  });

  it('should return 2 if number provided is 2', () =>{
    expect(fizzbuzz(2)).toBe(2);
  });

  it('should return fizz if number provided is 3', () =>{
    expect(fizzbuzz(3)).toBe('fizz');
  });

  it('should return fizz if number provided is mutiple of 3', () =>{
    expect(fizzbuzz(12)).toBe('fizz');
    expect(fizzbuzz(6)).toBe('fizz');
    expect(fizzbuzz(9)).toBe('fizz');
  });

  it('should return buzz if number provided is mutiple of 5', () =>{
    expect(fizzbuzz(10)).toBe('buzz');
    expect(fizzbuzz(25)).toBe('buzz');
    expect(fizzbuzz(20)).toBe('buzz');
  });

  it('should return fizzbuzz if number provided is mutiple of 5 and 3', () =>{
    expect(fizzbuzz(15)).toBe('fizzbuzz');
    expect(fizzbuzz(30)).toBe('fizzbuzz');
    expect(fizzbuzz(45)).toBe('fizzbuzz');
    
  });

  

  
});