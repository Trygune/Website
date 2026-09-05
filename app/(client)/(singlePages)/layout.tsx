type SingleLayoutProps = {
  children: React.ReactNode
}

const SingleLayout = async ({ children }: SingleLayoutProps) => {
  return <div className="py-16 sm:py-24">{children}</div>
}

export default SingleLayout
