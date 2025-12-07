import React from "react";

const Login = ({ HeadContent, mainContent }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-card shadow-2xl w-full max-w-[528px] md:h-[570px] rounded-[20px] relative p-5 md:p-0 border border-border/30">

     

        {mainContent}

    
      </div>
    </div>
  );
};

export default Login;
