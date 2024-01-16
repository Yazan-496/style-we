import App from '../../app';

export default async function RootLayout({children, params}) {
    return (
        <App>
            {children}
        </App>
    );
}
