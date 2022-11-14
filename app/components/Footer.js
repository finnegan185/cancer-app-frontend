import React from "react";

function Footer(props) {
  return (
    <footer className="border-top text-center small text-white py-3">
      <div>
        <img src="\public\UniversityofZackLogoSmallNoPadNegative2.jpg" alt="logo" />
      </div>
      <br />
      Copyright &copy; {new Date().getFullYear()}. All rights reserved.
    </footer>
  );
}

export default Footer;
