import { Collapse, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ExpandMore } from "../CustomComponent/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from "../hooks/useAuth";
import { getPhoto } from "../Services/UserService";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [imageUrl, setImageUrl] = useState(" ");
  const [showUserMenu, setShowUserMenu] = useState(false);
  useEffect(() => {
    getPhoto(setImageUrl, auth.userId, auth.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="profile"
        // style={{ width: drawerWidth - 20, overflow: "hidden" }}
      >
        <img
          alt="profile"
          src={
            imageUrl == "Profile picture not found" ? "profile.jpg" : imageUrl
          }
          width="40"
          height="40"
          style={{ borderRadius: "50%" }}
        />

        {open && (
          <div>
            <Typography
              sx={{
                color: "white",
                margin: "0px",
                textOverflow: "ellipsis",
              }}
            >
              Welcome {auth?.info?.firstName}
            </Typography>
            <Typography variant="caption" sx={{ color: "#728FAD" }}>
              {auth?.info?.userProfiles[0]?.type}
            </Typography>
          </div>
        )}
        <MuiListItemIcon>
          <ExpandMore
            expand={showUserMenu}
            onClick={() => setShowUserMenu((ps) => !ps)}
            aria-expanded={showUserMenu}
            aria-label="show more"
            disableFocusRipple
            disableRipple
          >
            <ExpandMoreIcon sx={{ color: "white" }} />
          </ExpandMore>
        </MuiListItemIcon>
      </div>
      <Collapse in={showUserMenu}>
        <ul className="user-menu">
          <li
            onClick={(e) => {
              navigate("/profile");
            }}
          >
            Profile
          </li>
          <li
            onClick={(e) => {
              navigate("/user-settings");
            }}
          >
            Settings
          </li>
        </ul>
      </Collapse>
    </>
  );
}
