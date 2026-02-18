export default function AuthCodeError() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
            <p className="text-lg">There was an error authenticating your request. Please try again.</p>
        </div>
    )
}
