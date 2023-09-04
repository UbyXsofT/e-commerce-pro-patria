import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
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

  const StyledButton = styled(Button)({
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 999,
  });

  return (
    <>
      {isVisible && (
        <StyledButton color="primary" aria-label="Scroll to top" onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </StyledButton>
      )}
    </>
  );
}
