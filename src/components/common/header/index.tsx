import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b-2 border-slate-300 text-purple-500 p-3 flex justify-between items-center">
      <h1 className="text-2xl font-semibold m-4">Rick & Morty</h1>
      <nav>
        <ul className="flex space-x-4 p-3">
          <li>
            <Link href="/characters" className="font-semibold m-3">
              Characters
            </Link>
          </li>
          <li>
            <Link href="/profile" className="font-semibold m-3">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/profile" className="font-semibold m-3">
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
