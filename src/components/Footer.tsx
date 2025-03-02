"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center fixed bottom-0 left-0 right-0">
      <p className="text-sm">
        © {new Date().getFullYear()} Witchaudio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
