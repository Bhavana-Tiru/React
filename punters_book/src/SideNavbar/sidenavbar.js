import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItemIcon,
  Drawer,
  Box,
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import FeedIcon from "@mui/icons-material/Feed";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"; //list-> Predicition, SGM, Multi
import logo from "../images/LogoIcon.png";

export default function SideNavbar() {
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const navigate = useNavigate();

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  // const [selectedIndex, setSelectedIndex] = useState(null);

  // const handleClick = (index) => {
  //   setSelectedIndex(index);
  // };

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { name: "Users", icon: <Person2Icon />, route: "/users" },
    { name: "Orders", icon: <ReceiptIcon />, route: "/orders" },
  ];

  const sportsItems = [
    { name: "Categories", icon: <SportsSoccerIcon />, route: "/categories" },
    {
      name: "Category-Options",
      icon: <FormatListNumberedIcon />,
      route: "/sgm/sgmoptions",
    },
    { name: "Leagues", icon: <EmojiEventsIcon />, route: "/leagues" },
    { name: "Teams", icon: <GroupsIcon />, route: "/teams" },
  ];

  return (
    <nav>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            top: "70px",
          },
        }}
      >
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          <List sx={{ px: 2, py: 2 }}>
            <div className="container text-center ">
              <div className="row">
                <h5
                  style={{ color: "#1976d2", paddingLeft: "20px" }}
                  className="text-start"
                >
                  <span>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "30px", paddingRight: "10px" }}
                    />
                  </span>
                  kickff.
                </h5>

                <div
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "20px" }}
                >
                  <div
                    className="col-4"
                    style={{ width: "25px", paddingRight: "50px" }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </div>
                  <div className="col-8 text-start">
                    <h6 style={{ fontSize: "15px", margin: 0 }}>
                      Yuaku bibowo
                    </h6>
                    <h6 style={{ color: "#777882" }}>Admin</h6>
                  </div>
                </div>
                <h6
                  style={{ color: "#777882", marginTop: "15px" }}
                  className="text-start"
                >
                  Menu
                </h6>

                {menuItems.map((item, index) => (
                  <ListItemButton
                    key={item.name}
                    onClick={() => navigate(item.route)}
                    sx={{
                      "&:hover": { backgroundColor: "lightgray" },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}

                <h6
                  style={{ color: "#777882", marginTop: "15px" }}
                  className="text-start"
                >
                  Sports
                </h6>

                {sportsItems.map((item) => (
                  <ListItemButton
                    key={item.name}
                    onClick={() => navigate(item.route)}
                    sx={{
                      "&:hover": { backgroundColor: "lightgray" },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}

                {/* Example for dropdown */}
                <h6
                  style={{ color: "#777882", marginTop: "20px" }}
                  className="text-start"
                >
                  Picks
                </h6>
                <ListItemButton
                  onClick={() => handleDropdownClick("predicitions")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <ListItemIcon>
                    <CheckCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Predictions" />
                  {openDropdown === "predicitions" ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>

                <Collapse
                  in={openDropdown === "predicitions"}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/predections/predectionslist")}
                    >
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Prediction List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/predections/addpredictions")}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Prediction" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton
                  onClick={() => handleDropdownClick("sgm")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Same game multi" />
                  {openDropdown === "sgm" ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openDropdown === "sgm"}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/sgm/sgmlist")}
                    >
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary="SGM List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/sgm/createsgm")}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create SGM" />
                    </ListItemButton>
                  </List>
                </Collapse>

                <ListItemButton
                  onClick={() => handleDropdownClick("multi")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Multi" />
                  {openDropdown === "multi" ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openDropdown === "multi"}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/multi/multilist")}
                    >
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Multi List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/multi/createmulti")}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Multi" />
                    </ListItemButton>
                  </List>
                </Collapse>

                <h6
                  style={{ color: "#777882", marginTop: "20px" }}
                  className="text-start"
                >
                  Alerts
                </h6>
                <ListItemButton
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#84adea",
                    },
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary=" Banners" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleDropdownClick("stories")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <ListItemIcon>
                    <HistoryEduIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stories" />
                  {openDropdown === "stories" ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openDropdown === "stories"}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/configaration/storieslist")}
                    >
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Stories List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={() => navigate("/configaration/addstory")}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Story" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#84adea",
                    },
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                  onClick={() => navigate("/configaration/headline")}
                >
                  <ListItemIcon>
                    <FeedIcon />
                  </ListItemIcon>
                  <ListItemText primary=" Headlines" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#84adea",
                    },
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                  onClick={() => navigate("/configaration/notification")}
                >
                  <ListItemIcon>
                    <NotificationsActiveTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary=" Notifications" />
                </ListItemButton>
              </div>
            </div>
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
