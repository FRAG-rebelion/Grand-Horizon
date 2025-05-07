import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex items-center justify-center text-text flex-grow">
            <div className="animate-pulse text-center">
                <h1 className="text-6xl font-extrabold tracking-wide mb-4">404</h1>
                <h2 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h2>
                <p className="text-xl">Looks like you&apos;re lost. Let&apos;s get you back on track!</p>
                <p className="text-md"> go back <Link to="/" className="underline hover:text-prime">Home</Link></p>
            </div>

            <div className="mt-8">

            </div>
        </div>
    );
}

export default NotFound