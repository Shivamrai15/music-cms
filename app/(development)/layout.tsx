import Link from "next/link"

interface LayoutPageProps {
    children : React.ReactNode
}

const LayoutPage = ({
    children
} : LayoutPageProps ) => {
    return (
        <div>
            <nav className="h-20 w-full flex items-center justify-center gap-x-4">
                <Link
                    href="/artist"
                >
                    Artist
                </Link>
                <Link
                    href="/album"
                >
                    Album
                </Link>
                <Link
                    href="/song"
                >
                    Song
                </Link>
                <Link
                    href="/genre"
                >
                    Genre
                </Link>
                <Link
                    href="/lyrics"
                >
                    Lyrics
                </Link>
                <Link
                    href="/update"
                >
                    Update
                </Link>
                <Link
                    href="/genre-songs"
                >
                    Genre Songs
                </Link>
            </nav>
            <main className="h-full">
                {children}
            </main>
        </div>
    )
}

export default LayoutPage