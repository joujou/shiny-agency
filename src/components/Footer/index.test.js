import Footer from './'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Footer', () => {
  it('Change theme', async () => {
    const { container, getByRole } = render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
    const nightModeButton = getByRole('button')
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
  })
})
