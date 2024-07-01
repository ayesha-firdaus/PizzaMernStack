import { createContext, useContext, useState } from 'react';

const Web3Context = createContext();

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const Web3Provider = ({ children }) => {
  const [web3Data, setWeb3Data] = useState({web3:'',contract:'',account:''});

  return (
    <Web3Context.Provider value={{ web3Data, setWeb3Data }}>
      {children}
    </Web3Context.Provider>
  );
};
