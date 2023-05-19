import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  ListItemIcon,
  useTheme,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import {ColorModeContext} from "../../app/theme";
import Cookies from "js-cookie";
import {usePostData} from "../../common/hooks/api/usePost";

const Header = () => {
  const userToken = Cookies.get("token");

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    // Make API call to authenticate user and get JWT token
    try {
      // Remove token
      Cookies.remove("token");
      handleClose();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostData("/auth/logout");

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Container component="div" maxWidth="xl">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              sx={{mr: "auto"}}
              component={Link}
              to={"/"}
            >
              Any.do
            </Typography>

            {/* ToggleMode Button */}
            <IconButton
              sx={{ml: 1}}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {/* IsAuth render userImage Or Not Render Login Button */}
            {userToken ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/*<Link to={"/profile"}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                  </Link> */}

                  <MenuItem
                    onClick={() => {
                      Cookies.remove("token");
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button variant="success" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Header;
