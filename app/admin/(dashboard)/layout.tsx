import AdminHeader from '@/components/admin/layout/AdminHeader'
import AdminSidebar from '@/components/admin/layout/AdminSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AuthProvider from '@/provider/AuthProvider'

type AdminLayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-muted/30">
        <SidebarProvider>
          <AdminSidebar />

          <SidebarInset>
            <AdminHeader />

            <div className="mx-auto w-full px-4 pt-6 pb-14 sm:px-6 lg:px-8 2xl:px-16 ">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AuthProvider>
  )
}

export default AdminLayout
