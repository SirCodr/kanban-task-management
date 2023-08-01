type Props = {
  title: string,
  children: React.ReactNode
}

const InputVGroup = ({ title, children }: Props) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <span>{title}</span>
      {children}
    </div>
  )
}

export default InputVGroup