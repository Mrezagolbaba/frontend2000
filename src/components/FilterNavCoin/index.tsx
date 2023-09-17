import { useState } from "react";
import { Button, ButtonGroup, Nav, NavItem, NavLink } from "reactstrap"
import './styles.scss'

export const FilterNavCoin = ({
    activeTab,
    handleTabClick
}: any) => {
    const [rSelected, setRSelected] = useState(1);

    return (
        <Nav id="myTab" role="tablist" 
        style={{
            display: 'flex',
            justifyContent: 'space-between',

        }}>
            <NavItem style={{
                display: 'flex',
               flexDirection: 'row', 
            }}>
                <NavItem>
                    <NavLink
                        id="tab1"
                        href="#tab-1"
                        className={activeTab === 'tab1' ? 'activeFilterItem' : 'diActiveFilterItem'}
                        onClick={(e) => handleTabClick(e, 'tab1')}
                    >
                        همه
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        id="tab2"
                        href="#tab-2"
                        className={activeTab === 'tab2' ? 'activeFilterItem' : 'diActiveFilterItem'}
                        onClick={(e) => handleTabClick(e, 'tab2')}
                    >
                        محبوب ترین ها
                    </NavLink>
                </NavItem>
            </NavItem>
            <NavItem>
                <ButtonGroup className="rtl-button-group">
                    <button className="btn btn-outline-secondary" type="button" disabled
                        onClick={() => setRSelected(1)}
                    >
                        تومان IRT

                    </button>
                    <button
                        onClick={() => setRSelected(2)}
                    >

                        تتر USDT

                    </button>
                </ButtonGroup>
            </NavItem>
        </Nav>
    )
}