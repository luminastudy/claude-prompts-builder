import { describe, it, expect } from 'vitest'
import { hello } from './hello.js'

describe('hello', () => {
  it('should return greeting with name', () => {
    expect(hello('World')).toBe('Hello, World!')
  })
})
