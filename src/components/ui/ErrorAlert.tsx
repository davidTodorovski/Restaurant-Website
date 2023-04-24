// styles
import './error-alert.scss'

type Props = {
    children: React.ReactNode
}

function ErrorAlert({ children }: Props) {
  return <div className='alert'>{children}</div>;
}

export default ErrorAlert;