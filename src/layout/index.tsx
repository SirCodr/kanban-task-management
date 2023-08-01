import Navbar from "../components/navbar"
import ThemeToggleButton from "../components/themeToggleButton"

type Props = {
  children: JSX.Element | JSX.Element[]
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center w-full h-screen relative bg-light-gray dark:bg-dark-blue">
      <div className="grid grid-rows-[50px_1fr] w-full sm:w-4/5 md:w-3/5">
         <Navbar />
        <section className="py-4 px-7">
          {children}
        </section>
      </div>
      <ThemeToggleButton />
    </div>
  )
}
export default AppLayout