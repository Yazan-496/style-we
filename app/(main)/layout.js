

export default async function RootLayout({ children, params }) {
    const local = process.env.NEXT_PUBLIC_LANG;
    return (
        <>
            {children}
        </>
    );
}
