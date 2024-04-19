import { useState } from "react";
import { Button, ButtonGroup, Nav, NavItem } from "reactstrap";
import "./styles.scss";

interface FilterNavCoinProps {
  handleTabClick: (e: any, tabId: string) => void;
  rightTitle: string;
  leftTitle: string;
}

export const FilterNavCoin = ({
  handleTabClick,
  rightTitle,
  leftTitle,
}: FilterNavCoinProps) => {
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
            {rightTitle}
          </Button>
          <Button
            color="secondary"
            outline={rSelected !== 2}
            onClick={(e) => {
              handleTabClick(e, "tab1");
              setRSelected(2);
            }}
          >
            {leftTitle}
          </Button>
        </ButtonGroup>
      </NavItem>
    </Nav>
  );
};
