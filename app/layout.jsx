import { Providers } from '../store/provider'
import './globals.css'

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout