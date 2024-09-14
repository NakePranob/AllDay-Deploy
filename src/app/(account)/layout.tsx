import Alerts from "@/components/Alerts"
export default function AccountLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-screen h-screen flex items-end sm:items-center sm:justify-center bg-acc">
            {children}
            <Alerts />
        </div>
    )
}
