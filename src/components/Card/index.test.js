import { render, screen, fireEvent } from '@testing-library/react'
import Card from './'
import { ThemeProvider } from '../../utils/context'
import '@testing-library/jest-dom/extend-expect'

describe('Card', () => {
  it('should be like this', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Card
          key={1}
          label="un label"
          title="title-test"
          picture="pic.png"
        ></Card>
      </ThemeProvider>
    )
    expect(getByTestId('card-title')).toHaveTextContent('title-test')
    expect(getByTestId('card-label')).toHaveTextContent('un label')

    const image = getByTestId('card-picture')
    expect(image.src).toBe('http://localhost/pic.png')
    fireEvent.click(image)
    expect(getByTestId('card-title')).toHaveTextContent('⭐️ title-test ⭐️')
  })
})
