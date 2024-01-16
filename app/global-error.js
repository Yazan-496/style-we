'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        // console.log(`${error}`, error, "sdsad");
        // Sentry.captureException(`${error}`, {
        //   user: {
        //     id: "102",
        //     username: "Kinan",
        //   },
        //   tags: {
        //     user_role: "admin",
        //   },
        // });
    }, [error]);

    return (
        <div className="w-full text-xl text-bold gap-y-3 h-[80vh] flex flex-col items-center justify-center">
            <h2>Something went wrong!</h2>
            <button
                className="text-2xl underline"
                onClick={() => {
                    reset();
                    window.location.reload();
                }}
            >
                Refresh Page
            </button>
            <p>or</p>
            <button
                className="text-2xl underline"
                onClick={() => {
                    reset();
                    window.location.href = '/';
                }}
            >
                Go to Home Page
            </button>
        </div>
    );
}
