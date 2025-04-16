import React from "react";

import { Link } from "react-router-dom";

const routesMap = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Shopping Cart", path: "/shoppingCart" },
  { name: "Sign in", path: "/signinpage" },
  { name: "Create an account", path: "/createacc" },
];

const teamMembers = [
  {
    name: "Damilola Oshinowo",
    role: "Scrum master",
    linkedin: "https://www.linkedin.com/in/damilola-oshinowo",
  },
  {
    name: "Andrés R. Bucheli",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/andresregaladobucheli/",
  },
  {
    name: "Chinedu Olekah",
    role: "Main product owner",
    linkedin: "https://www.linkedin.com/in/chinedu-olekah",
  },
  {
    name: "R. Ed Masawi",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/ed-masawi-97345a29/",
  },
  {
    name: "Ismail Marghich",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/ismail-marghich-9174111aa/",
  },
  {
    name: "Tonia Gbuji",
    role: "Shadow product owner",
    linkedin: "https://www.linkedin.com/in/toniagbuji/",
  },
  {
    name: "Predrag Jandric",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/predrag-jandric/",
  },
  {
    name: "Riry Nomenjanahary",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/riry-nomenjanahary/",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-customcolortwo text-darktext mt-10 py-10">
      <section className="container mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <div>
          <h3 className="mb-6 text-lg font-semibold">Navigation</h3>
          <div className="space-y-2">
            {routesMap.map((route) => (
              <div className="flex">
                <Link
                  className="text-darktext/85 w-fit cursor-pointer no-underline transition-all hover:text-black hover:underline hover:underline-offset-2"
                  to={route.path}
                  key={route.name}
                >
                  {route.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="mb-6 text-lg font-semibold">Team</h3>
          <ul className="space-y-2">
            {teamMembers.map((member) => (
              <li key={member.name}>
                <a
                  className="text-darktext/85 w-fit no-underline transition-all hover:text-black hover:underline hover:underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={member.linkedin}
                >
                  {member.name} - {member.role}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* contact info */}
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
              className="text-darktext/85 w-fit cursor-pointer no-underline transition-all hover:text-black hover:underline hover:underline-offset-2"
              target="_blank"
              href="https://github.com/chingu-voyages/v54-tier3-team-33"
            >
              Github repo
            </a>
          </div>
        </div>
      </section>

      <div className="border-customcolorone mt-8 border-t pt-4 text-center text-sm">
        © {new Date().getFullYear()} Chingu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
