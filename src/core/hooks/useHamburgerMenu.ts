import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';

const useHamburgerMenu = () => {
  const [showMenu, setShowMemu] = React.useState(false);
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      if (showMenu) setShowMemu(false);
    });
    return () => subscription?.remove();
  });

  return { showMenu, setShowMemu };
};

export default useHamburgerMenu;
