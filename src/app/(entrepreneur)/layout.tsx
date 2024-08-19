import NavBarEntrepreneur from "@/components/navbar/NavBarEntrepreneur"

export default function EntrepreneurLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
      <>
        <NavBarEntrepreneur/>
        {children}
      </>
    )
}