export default function AccountLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-screen h-screen flex-center bg-acc">
            {children}
        </div>
    )
}
