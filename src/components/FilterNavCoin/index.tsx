import { useState } from "react";
import { Button, ButtonGroup, Nav, NavItem, NavLink } from "reactstrap";
import "./styles.scss";

export const FilterNavCoin = ({ activeTab, handleTabClick }: any) => {
  const [rSelected, setRSelected] = useState(1);

  return (
    <Nav
      className="filter-nav-coin justify-content-end"
      id="myTab"
      role="tablist"
    >
      <NavItem>
        <ButtonGroup className="rtl-button-group">
          <Button
            color="secondary"
            outline={rSelected !== 1}
            onClick={(e) => {
              handleTabClick(e, "tab2");
              setRSelected(1);
            }}
          >
            تومان IRT
          </Button>
          <Button
            color="secondary"
            outline={rSelected !== 2}
            onClick={(e) => {
              handleTabClick(e, "tab1");
              setRSelected(2);
            }}
          >
            تتر USDT
          </Button>
        </ButtonGroup>
      </NavItem>
    </Nav>
  );
};
