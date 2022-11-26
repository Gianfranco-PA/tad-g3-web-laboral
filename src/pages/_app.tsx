import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import PrincipalLayout from 'src/common/components/layouts/principal'

function MyApp({ Component, pageProps }: AppProps) {
  return <PrincipalLayout>
    <Component {...pageProps} />
  </PrincipalLayout>
}

export default MyApp
