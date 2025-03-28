import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F7F7] py-10">
      <section className="container mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-3">
        {/* Navigation Section */}
        <div>
          <h3 className="mb-6 text-lg font-semibold">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/category/electronics" className="hover:underline">
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/category/clothing" className="hover:underline">
                Clothing
              </Link>
            </li>
            <li>
              <Link to="/category/music" className="hover:underline">
                Music
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/shoppingCart" className="hover:underline">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/signinpage" className="hover:underline">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/createacc" className="hover:underline">
                Create an account
              </Link>
            </li>
          </ul>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="mb-6 text-lg font-semibold">Team</h3>
          <ul className="space-y-2">
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://linkedin.com/in/damilola-oshinowo"
              >
                Damilola Oshinowo - Scrum master
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://www.linkedin.com/in/andresregaladobucheli/"
              >
                Andrés R. Bucheli - Developer
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="www.linkedin.com/in/chinedu-olekah"
              >
                Chinedu Olekah - Main product owner
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://www.linkedin.com/in/ed-masawi-97345a29/"
              >
                R. Ed Masawi - Developer
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://www.linkedin.com/in/ismail-marghich-9174111aa/"
              >
                Ismail Marghich - Developer
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://www.linkedin.com/in/toniagbuji/"
              >
                Tonia Gbuji - Shadow product owner
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://www.linkedin.com/in/predrag-jandric/"
              >
                Predrag Jandric - Developer
              </a>
            </li>
            <li>
              <a
                className="w-fit no-underline transition-all hover:pl-2 hover:underline hover:underline-offset-2"
                target="_blank"
                href="https://www.linkedin.com/in/riry-nomenjanahary/"
              >
                Riry Nomenjanahary - Developer
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="mb-6 text-lg font-semibold">Organisation</h3>
          <div className="flex flex-col gap-3">
            <a
              className="transition-all"
              target="_blank"
              href="https://www.chingu.io/"
            >
              <img src="/chingu-logo.png" className="h-16" alt="chingu logo" />
            </a>
            <p className="">
              Chingu is a global collaboration platform and coding community.
              This project was built by Chingu Team 33 in Voyage 54 during March
              and April 2025.
            </p>
            <a
              className=""
              href="https://github.com/chingu-voyages/v54-tier3-team-33"
            >
              Github repo
            </a>
          </div>
        </div>
      </section>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Chingu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
