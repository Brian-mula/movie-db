import TopNavigation from "@/components/navigation/top-navigation"

function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer flex flex-col bg-neutral-900 bg-opacity-95 min-h-screen  pt-8 pb-16">
            <TopNavigation />
            {children}
        </div>
    )
}

export default HomeLayout
