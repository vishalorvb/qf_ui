import { NavLink } from "react-router-dom";
//navItems
import { testManagementList, opsManagementList } from "./SidebarNavlist";

export default function Sidebar() {
  const role = "";

  const navigationItemRender = (rawList) => {
    const navigationList = rawList
      .filter((navItem) => navItem.accessRole.includes(role))
      .map((navItem) => {
        return (
          <li key={navItem.name}>
            {navItem.icon && <img src={navItem.icon} alt="nav-icon"></img>}
            <NavLink to={navItem.route}>{navItem.name}</NavLink>
            {navItem.subList && <img src="" alt="down-icon"></img>}
            {navItem.subList && (
              <ul>{navigationItemRender(navItem.subList)}</ul>
            )}
          </li>
        );
      });
    return navigationList;
  };

  return (
    <>
      <div>
        <span>QF</span>
        <span>Quality Fusion</span>
      </div>
      <div>
        <span>QF Admin</span>
        <div>
          <ul>{navigationItemRender(testManagementList)}</ul>
        </div>
        <div>
          <ul>{navigationItemRender(opsManagementList)}</ul>
        </div>
      </div>
    </>
  );
}
