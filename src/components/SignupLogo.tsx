import { useMediaQuery } from '@mui/material';
import Image from 'next/image'

type Props = {}

const SignupLogo = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
    <Image src="/logo.svg" alt="logo" width={40} height={30} style={{ position: 'absolute', left: isDesktop ? '40px' : '20px', top: isDesktop ? '50px' : '18px' }} />
  )
}

export default SignupLogo