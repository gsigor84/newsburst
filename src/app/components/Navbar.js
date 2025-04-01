"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Button,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";

const pages = [
  { label: "Home", path: "/" },
  { label: "Asia", path: "/asia" },
  { label: "Israel", path: "/israel" },
  { label: "Blog", path: "/blog" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // 👇 Scroll hide/show with buffer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const buffer = 10;

      if (currentScrollY > lastScrollY.current + buffer) {
        setShowNavbar(false); // scrolling down
      } else if (currentScrollY < lastScrollY.current - buffer) {
        setShowNavbar(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Slide appear={false} direction="down" in={showNavbar}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0D0D0D",
          color: "#F2F2F2",
        }}
        elevation={2}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 🌍 Desktop Logo */}
            <PublicIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                textDecoration: "none",
                color: "#F2F2F2",
              }}
            >
              NewsBurst
            </Typography>

            {/* 🍔 Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                keepMounted
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.path}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* 🌍 Mobile Logo */}
            <PublicIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                fontWeight: 700,
                textDecoration: "none",
                color: "#F2F2F2",
              }}
            >
              NewsBurst
            </Typography>

            {/* 🖥️ Desktop Nav */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  href={page.path}
                  sx={{
                    my: 2,
                    color: "#F2F2F2",
                    fontWeight: 600,
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
