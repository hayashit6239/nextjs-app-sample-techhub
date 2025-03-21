export default function ProjectEditPageLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <div className="">
            {children}
            {modal}
        </div>
    );
}