import React, { useState, useEffect } from "react";
import { keyframes, styled } from "@mui/system";
import Button from "@mui/material/Button";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

export function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

  const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
  const StyledFab = styled(Fab)({
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: isVisible ? 999 : -1,
    opacity: isVisible ? 1 : 0,
    animation: `${isVisible ? fadeIn : fadeOut} 0.3s ease`,
  });

  return (
    <StyledFab variant="extended" aria-label="Scroll To Top" onClick={isVisible ? scrollToTop : () => {}}>
      <NavigationIcon sx={{ mr: 1 }} />
      Sali
    </StyledFab>
  );
}
