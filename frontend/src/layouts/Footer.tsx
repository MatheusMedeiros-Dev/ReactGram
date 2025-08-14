import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="col-span-3 bg-black">
      <hr className="border-gray-600" />
      <div className="flex items-center justify-center text-amber-50">
        <p className="text-white text-center p-3">ReactGram &copy; |</p>
        <a
          className="flex items-center hover:text-blue-500"
          href="https://github.com/MatheusMedeiros-Dev"
        >
          <FaGithub className="ml-0 mr-2" /> MatheusMedeiros-Dev
        </a>
      </div>
    </footer>
  );
};

export default Footer;
