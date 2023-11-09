type InputTextProps = {
  className?: string
}
type Props = InputTextProps & React.InputHTMLAttributes<HTMLInputElement>

function InputText({
  id,
  className='',
  ...props
}: Props) {
  return (
    <input
      id={id}
      type='text'
      className={className ? `input ${className}` : 'input'}
      {...props}
    />
  )
}

export default InputText
