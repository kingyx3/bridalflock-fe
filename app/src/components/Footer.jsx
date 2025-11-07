import React from "react";
import Link from "next/link";
import {
  FiGithub,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import BridalFlockLogo from "./Logo";
import { useStateProvider } from '../context/StateContext';
import { envVars } from "../utils/envConfig";


const socialLinks = [
  { name: "Github", icon: <FiGithub />, link: "https://www.github.com" },
  {
    name: "Youtube",
    icon: <FiYoutube />,
    link: "https://www.youtube.com/KishanSheth21/",
  },
  {
    name: "LinkedIn",
    icon: <FiLinkedin />,
    link: "https://www.linkedin.com/in/koolkishan/",
  },
  {
    name: "Instagram",
    icon: <FiInstagram />,
    link: "https://instagram.com/koolkishansheth",
  },
  {
    name: "Twitter",
    icon: <FiTwitter />,
    link: "https://twitter.com/koolkishansheth",
  },
];
const data = [
  {
    headerName: "About",
    links: [
      // { name: "Press & News", link: "#" },
      // { name: "Partnership", link: "#" },
      { name: "Privacy Policy", link: "/privacy-policy" },
      { name: "Terms of Service", link: "/terms-of-service" },
      // { name: "Intellectual Property Claims", link: "#" },
      // { name: "Investor Relations", link: "#" },
    ],
  },
  // {
  //   headerName: "Support",
  //   links: [
  //     { name: "Help & Support", link: "#" },
  //     { name: "Trust & Safety", link: "#" },
  //     { name: "Selling on " + envVars.REACT_APP_NAME, link: "#" },
  //     { name: "Buying on " + envVars.REACT_APP_NAME, link: "#" },
  //   ],
  // },
];

function Footer() {
  const [{ isDarkMode }] = useStateProvider();
  const logoClassName = isDarkMode ? "text-neutral-light" : "text-primary-darker";

  return (
    <footer className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-neutral-medium/30 bg-neutral-light dark:bg-neutral-dark dark:border-neutral-medium">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo container with fixed height */}
        <div className="h-10 flex items-center mb-4 md:mb-0">
          <BridalFlockLogo className={logoClassName} />
        </div>
        {/* Links and Copyright */}
        <div className="flex flex-col md:flex-row items-center text-sm">
          <Link href="/privacy-policy" legacyBehavior>
            <a className="text-neutral-dark hover:text-primary dark:text-neutral-light dark:hover:text-primary hover:underline">
              Privacy Policy
            </a>
          </Link>
          <span className="text-neutral-medium dark:text-neutral-medium mx-2 hidden md:inline">&middot;</span>
          <Link href="/terms-of-service" legacyBehavior>
            <a className="text-neutral-dark hover:text-primary dark:text-neutral-light dark:hover:text-primary hover:underline mt-1 md:mt-0 md:ml-2">
              Terms of Service
            </a>
          </Link>
          <span className="text-neutral-medium dark:text-neutral-medium mx-2 hidden md:inline">&middot;</span>
          <p className="text-neutral-medium dark:text-neutral-light mt-1 md:mt-0 md:ml-2">
            © {new Date().getFullYear()} {envVars.REACT_APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
