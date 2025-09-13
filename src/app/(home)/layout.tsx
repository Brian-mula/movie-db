function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer flex flex-col bg-neutral-900 bg-opacity-95 min-h-screen items-center justify-start pt-8 pb-16">
            {children}
        </div>
    )
}

export default HomeLayout
