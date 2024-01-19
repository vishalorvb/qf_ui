import { Collapse, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ExpandMore } from "../CustomComponent/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from "../hooks/useAuth";
import { getPhoto } from "../Services/UserService";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";

export default function UserCard({ open, setOpen }) {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [imageUrl, setImageUrl] = useState("_");
    const [showUserMenu, setShowUserMenu] = useState(false);
    useEffect(() => {
        getPhoto(setImageUrl, auth.userId, auth.token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <div className="profile">
                <div className="pic">
                    <img
                        alt="profile"
                        src={imageUrl == "_" ? "profile.jpg" : imageUrl}
                        width="25"
                        height="25"
                        style={{ borderRadius: "50%" }}
                    />
                </div>

                {open && <div>
                    <Typography
                        sx={{
                            color: "white",
                            margin: "0px",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {auth?.info?.firstName}


                    </Typography>
                    <Typography variant="caption" sx={{ color: "#728FAD" }}>
                        {auth?.info?.userProfiles[0]?.type}
                    </Typography>

                </div>}
                {open && <div>
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
                </div>}

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
