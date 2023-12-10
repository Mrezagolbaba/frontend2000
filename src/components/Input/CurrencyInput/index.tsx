import CurrencyInput from "react-currency-input-field";

// const options = [
//   {
//     value: "ریال",
//     label: (
//       <>
//         <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
//           {" "}
//           ریال
//         </span>

//         <img src={Rial} alt="" className="bs-icon" />
//       </>
//     ),
//   },
//   {
//     value: "بیت کوین",
//     label: (
//       <>
//         <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
//           بیت کوین
//         </span>
//         <img
//           src={bitcoin}
//           alt=""
//           className="bs-icon"
//           style={{ width: "15px" }}
//         />
//       </>
//     ),
//   },
//   {
//     value: "اتریوم",
//     label: (
//       <>
//         <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
//           {" "}
//           اتریوم
//         </span>

//         <img
//           src={ethereum}
//           alt=""
//           className="bs-icon"
//           style={{ width: "15px" }}
//         />
//       </>
//     ),
//   },
//   {
//     value: "لیر",
//     label: (
//       <>
//         <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
//           {" "}
//           لیر
//         </span>

//         <img src={Lira} alt="" className="bs-icon" />
//       </>
//     ),
//   },
//   {
//     value: "یورو",
//     label: (
//       <>
//         <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
//           {" "}
//           یورو
//         </span>

//         <img
//           src="assets/img/icons/flag-turkey.png"
//           alt=""
//           className="bs-icon"
//         />
//       </>
//     ),
//   },
//   {
//     value: "تتر",
//     label: (
//       <>
//         <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
//           {" "}
//           تتر
//         </span>

//         <img
//           src={tetter}
//           alt=""
//           className="bs-icon"
//           style={{ width: "15px" }}
//         />
//       </>
//     ),
//   },
// ];

type Props = {
  name: string;
  value: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  decimalsLimit?: number;
  hasError?: boolean;
};

import currencyStyle from "assets/scss/components/Input/currencyInput.module.scss";
export default function Currency({
  name,
  value,
  hasError = false,
  onChange,
  decimalsLimit = 0,
  placeholder,
}: Props) {
  return (
    <CurrencyInput
      id={name}
      name={name}
      className={` ${currencyStyle["currency-input"]} mx-0 form-control ${
        hasError ? "is-invalid" : ""
      }`}
      placeholder={placeholder}
      defaultValue={value}
      decimalsLimit={decimalsLimit}
      onValueChange={(value) => value && onChange?.(value)}
    />
  );
}
