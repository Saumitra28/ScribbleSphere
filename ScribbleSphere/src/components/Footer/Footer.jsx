import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#242d39] via-[#10253c] to-[#000000] text-white p-5 text-center">
      <p>© Developed by Saumitra Upadhyay</p>
      <div className="flex justify-center mt-2 space-x-4">
        <Link to="https://www.instagram.com/_.saumitra._/" target="_blank" className="text-white">
          <FaInstagram size={24} />
        </Link>
        <Link to="https://www.linkedin.com/in/saumitra-upadhyay-39a742210/" target="_blank" className="text-white">
          <FaLinkedin size={24} />
        </Link>
        <Link to="https://github.com/Saumitra28" target="_blank" className="text-white">
          <FaGithub size={24} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
