import CurrencyInput from "react-currency-input-field";
import bitcoin from "assets/img/coins/bitcoin.svg";
import ethereum from "assets/img/coins/ethereum.svg";
import Lira from "assets/img/coins/lira.png"
import Rial from "assets/img/icons/flag-iran.svg";
import tetter from "assets/img/coins/tether.svg";
import Euro from "assets/img/coins/Euro.png";
import { useState } from "react";
import s from "./styles.module.scss";
import { Cu } from "react-flags-select";


const options = [
    {
        value: "ریال",
        label: (
            <>
                <img
                    src={Rial}
                    alt=""
                    className="bs-icon"
                    width={20}
                    height={20}
                    style={{ marginLeft: "5px" }}
                />
                <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
                    {" "}
                    ریال
                </span>


            </>
        ),
    },
    {
        value: "بیت کوین",
        label: (
            <>
                <img
                    src={bitcoin}
                    alt=""
                    className="bs-icon"
                    width={20}
                    height={20}
                    style={{ marginLeft: "5px" }}
                />
                <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
                    بیت کوین
                </span>

            </>
        ),
    },
    {
        value: "اتریوم",
        label: (
            <>
                <img
                    src={ethereum}
                    alt=""
                    className="bs-icon"
                    width={20}
                    height={20}
                    style={{ marginLeft: "5px" }}
                />
                <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
                    {" "}
                    اتریوم
                </span>


            </>
        ),
    },
    {
        value: "لیر",
        label: (
            <>
                <img width={20} height={20} src={Lira} alt="" className="bs-icon" style={{ marginLeft: "5px" }} />
                <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
                    {" "}
                    لیر
                </span>


            </>
        ),
    },
    {
        value: "یورو",
        label: (
            <>
                <img
                    src={Euro}
                    alt=""
                    className="bs-icon"
                    width={20} height={20}
                    style={{ marginLeft: "5px" }}
                />
                <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
                    {" "}
                    یورو
                </span>


            </>
        ),
    },
    {
        value: "تتر",
        label: (
            <>
                <img
                    src={tetter}
                    alt=""
                    className="bs-icon"
                    width={20} height={20}
                    style={{ marginLeft: "5px" }}
                />
                <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
                    {" "}
                    تتر
                </span>


            </>
        ),
    },
];

type Props = {
    name: string;
    value: string | number;
    onChange?: (value: string) => void;
    placeholder?: string;
    decimalsLimit?: number;
    hasError?: boolean;
};

export default function ExchangeInput({
    name,
    value,
    hasError = false,
    onChange,
    decimalsLimit = 0,
    placeholder,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const handleSelect = (selectedValue: string) => {
        onChange && onChange(selectedValue);
        setSelected(options.find((option) => option.value === selectedValue)!);
        setIsOpen(false);
    };
    return (
        <div className={s.exchangeInput}>
            <CurrencyInput
                className={s.Input}
                type="text"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <div className="dropdown">
                <button
                    className={`${s.buttonTop} ${isOpen ? 'open' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen)
                    }}
                >
                    {selected.label}
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                    {options.map((option, index) => (
                        <li key={index}>
                            <button className={s.button} onClick={(e) => {
                                e.preventDefault();
                                handleSelect(option.value)
                            }
                            }>{option.label}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
