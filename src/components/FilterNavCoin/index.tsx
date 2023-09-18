import { useState } from "react";
import { Button, ButtonGroup, Nav, NavItem, NavLink } from "reactstrap";
import "./styles.scss";

export const FilterNavCoin = ({ activeTab, handleTabClick }: any) => {
  const [rSelected, setRSelected] = useState(1);

  return (
    <Nav className="filter-nav-coin" id="myTab" role="tablist">
      <NavItem className="filter-nav-coin__nav-items">
        <NavItem>
          <NavLink
            id="tab1"
            href="#tab-1"
            className={
              activeTab === "tab1" ? "activeFilterItem" : "diActiveFilterItem"
            }
            onClick={(e) => handleTabClick(e, "tab1")}
          >
            همه
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            id="tab2"
            href="#tab-2"
            className={
              activeTab === "tab2" ? "activeFilterItem" : "diActiveFilterItem"
            }
            onClick={(e) => handleTabClick(e, "tab2")}
          >
            محبوب ترین ها
          </NavLink>
        </NavItem>
      </NavItem>
      <NavItem>
        <ButtonGroup className="rtl-button-group">
          <Button
            color="secondary"
            outline={rSelected !== 1}
            onClick={() => setRSelected(1)}
          >
            تومان IRT
          </Button>
          <Button
            color="secondary"
            outline={rSelected !== 2}
            onClick={() => setRSelected(2)}
          >
            تتر USDT
          </Button>
        </ButtonGroup>
      </NavItem>
    </Nav>
  );
};
