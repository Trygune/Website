import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import SectionNavigation from '@/components/layout/SectionNavigation'

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <SectionNavigation />
      <Navbar />
      <main className="w-full max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default AppLayout
