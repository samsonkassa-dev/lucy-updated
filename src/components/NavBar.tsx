"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDictionary } from "@/hooks/useDictionary";
import { navItems } from "@/constants/navigation";

interface NavbarProps {
  setActive: () => void;
}

const Navbar = ({ setActive }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const dropdown = useRef<HTMLButtonElement>(null);
  const dictionary = useDictionary(locale);
  const locales = ["en", "am"];
  const switchLocale = locales.find((l) => l !== locale);

  const asPath = `${pathname}?${searchParams.toString()}`;

  const getDictionaryString = (key: string): string => {
    const value = dictionary[key];
    if (typeof value === "string") {
      return value;
    }
    return "";
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 px-0">
      <div
        onClick={setActive}
        className="bg-purple flex justify-between items-center"
      >
        <div className="flex justify-center flex-grow">
          <Link
            href="/#discount"
            className="flex justify-items-center text-white items-center py-1 font-semibold cursor-pointer"
          >
            <p>{getDictionaryString("discount")}</p>
          </Link>
        </div>
        <ul className="flex items-end">
          {["instagram", "facebook", "linkedin"].map((social) => (
            <li key={social} className="flex items-start">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.${social}.com/lucycoding`}
              >
                <Image
                  src={`/${social}.png`}
                  alt={social.charAt(0).toUpperCase() + social.slice(1)}
                  className="sm:mr-3 mr-1 w-6 sm:w-8"
                  width={32}
                  height={32}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:px-10 px-0 pt-4 font-indie">
        <div className="flex justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="block cursor-pointer lg:hidden h-16 w-auto"
                src="/mainlogo.png"
                alt="Logo"
                width={64}
                height={64}
                onClick={() => router.push("/")}
              />
              <Image
                className="hidden cursor-pointer lg:block h-16 w-auto"
                src="/mainlogo.png"
                alt="Logo"
                width={64}
                height={64}
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
            <Link legacyBehavior href="/">
              <a
                className={`${
                  pathname === "/"
                    ? "font-black text-black"
                    : "text-gray-500 font-bold"
                } border-transparent  inline-flex items-center px-1 pt-1 border-b-2 text-[20px]`}
              >
                <div className="flex flex-col items-center min-h-10">
                  <div>{getDictionaryString("navbarComponents_home")}</div>
                  {pathname === "/" && (
                    <div className="flex">
                      <Image
                        src="/curr.png"
                        alt="Indicator"
                        height={100}
                        width={100}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>

            <Link legacyBehavior href="/form">
              <a
                className={`${
                  pathname === "/form"
                    ? "font-black text-black"
                    : "text-gray-500 font-bold"
                } border-transparent  inline-flex items-center px-1 pt-1 border-b-2 text-[20px]`}
              >
                <div className="flex flex-col items-center min-h-10">
                  <div>{getDictionaryString("navbarComponents_register")}</div>
                  {pathname === "/form" && (
                    <div className="flex">
                      <Image
                        src="/curr.png"
                        alt="Indicator"
                        height={100}
                        width={100}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>

            <Link legacyBehavior href="/formEnroll">
              <a
                className={`${
                  pathname === "/formEnroll"
                    ? "font-black text-black"
                    : "text-gray-500 font-bold"
                } border-transparent  inline-flex items-center px-1 pt-1 border-b-2 text-[20px]`}
              >
                <div className="flex flex-col items-center min-h-10">
                  <div>{getDictionaryString("navbarComponents_courses")}</div>
                  {pathname === "/formEnroll" && (
                    <div className="flex">
                      <Image
                        src="/curr.png"
                        alt="Indicator"
                        height={100}
                        width={100}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>

            <Link legacyBehavior href="/About">
              <a
                className={`${
                  pathname === "/About"
                    ? "font-black text-black"
                    : "text-gray-500 font-bold"
                } border-transparent  inline-flex items-center px-1 pt-1 border-b-2 text-[20px]`}
              >
                <div className="flex flex-col items-center min-h-10">
                  <div>{getDictionaryString("navbarComponents_aboutUs")}</div>
                  {pathname === "/About" && (
                    <div className="flex">
                      <Image
                        src="/curr.png"
                        alt="Indicator"
                        height={100}
                        width={100}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>

            <Link legacyBehavior href="/Blog">
              <a
                className={`${
                  pathname === "/Blog"
                    ? "font-black text-black"
                    : "text-gray-500 font-bold"
                } border-transparent  inline-flex items-center px-1 pt-1 border-b-2 text-[20px]`}
              >
                <div className="flex flex-col items-center min-h-10">
                  <div>{getDictionaryString("navbarComponents_blog")}</div>
                  {pathname === "/Blog" && (
                    <div className="flex">
                      <Image
                        src="/curr.png"
                        alt="Indicator"
                        height={100}
                        width={100}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>

            <Link legacyBehavior href="/contact">
              <a
                className={`${
                  pathname === "/contact"
                    ? "font-black text-black"
                    : "text-gray-500 font-bold"
                } border-transparent  inline-flex items-center px-1 pt-1 border-b-2 text-[20px]`}
              >
                <div className="flex flex-col items-center min-h-10">
                  <div>{getDictionaryString("navbarComponents_contactUs")}</div>
                  {pathname === "/contact" && (
                    <div className="flex">
                      <Image
                        src="/curr.png"
                        alt="Indicator"
                        height={100}
                        width={100}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>
            <Link
              href={asPath.replace(
                `locale=${locale}`,
                `locale=${switchLocale}`
              )}
              locale={switchLocale}
            >
              <p className="text-[20px] lg:ml-5 lg:mt-3 hover:underline font-bold text-yellow">
                {switchLocale?.includes("am") ? "አማ" : "En"}
              </p>
            </Link>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <Link href={asPath} locale={switchLocale}>
              <p className="text-[20px] mr-5 lg:mt-3 hover:underline font-bold text-yellow">
                {switchLocale?.includes("am") ? "አማ" : "En"}
              </p>
            </Link>
            <button
              ref={dropdown}
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-[rgba(239, 195, 90, 1)] focus:outline-none focus:ring-inset focus:ring-white"
              //   aria-controls="mobile-menu"
              //   aria-expanded={true} // Pass boolean directly
            >
              <span className="sr-only">Open main menu</span>
              <Image
                src={isOpen ? "/Xicon.png" : "/hamburger.png"}
                alt={isOpen ? "Close icon" : "Menu icon"}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="pb-3 pt-12 space-y-2 pl-4">
            {["/", "/form", "/formEnroll", "/About", "/Blog", "/contact"].map(
              (path) => (
                <Link key={path} href={path} legacyBehavior>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="block pl-3 pr-4 font-semibold text-[20px] sm:border-transparent sm:hover:text-white"
                  >
                    {dictionary[`navbarComponents.${path.slice(1)}`]}
                  </a>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
