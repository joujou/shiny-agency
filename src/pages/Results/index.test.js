import { formatJobList, formatQueryParams } from './index'

describe('La fonction formatJobList', () => {
  it('should add a coma to a word', () => {
    const expectedState = 'item2,'
    expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
  })
  it('should not add a comma to the last element of the list', () => {
    const expectedState = 'item3'
    expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
  })
})

describe('The formatQueryParams function', () => {
  it('should use the right format for param', () => {
    const expectedFormat = 'a1=answer1'
    expect(formatQueryParams({ 1: 'answer1' })).toEqual(expectedFormat)
  })
  it('should concatenate params with an &', () => {
    const expectedFormat = 'a1=answer1&a2=answer2'
    expect(formatQueryParams({ 1: 'answer1', 2: 'answer2' })).toEqual(
      expectedFormat
    )
  })
})
