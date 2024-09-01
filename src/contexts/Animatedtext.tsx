import React, { createContext, ReactElement, useState } from "react";

// const [update, setUpdate] = useState(false);
interface contextType {
  update?: boolean;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}
export var AnimatedtextContext = createContext<contextType>({ update: true });

interface AnimatedTextProviderType {
  children: ReactElement;
}

const AnimatedTextProvider = ({ children }: AnimatedTextProviderType) => {
  const [update, setUpdate] = useState(false);
  return (
    <AnimatedtextContext.Provider value={{ update, setUpdate }}>
      {children}
    </AnimatedtextContext.Provider>
  );
};

export default AnimatedTextProvider;
