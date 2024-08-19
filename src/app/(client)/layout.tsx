import NavBar from "@/components/navbar/NavBar"

export default function ClientLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
      <>
        <NavBar/>
        {children}
      </>
    )
}