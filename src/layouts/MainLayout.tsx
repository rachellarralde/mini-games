import React from "react";
import Footer from "@/components/Footer"; // Adjust the import path as necessary

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Other layout components like header, main content, etc. */}
      {children}
      <Footer /> {/* Include the Footer here */}
    </div>
  );
};

export default MainLayout;
