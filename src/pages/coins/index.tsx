import { FilterNavCoin } from "components/FilterNavCoin";
import LandingLayout from "layouts/Landing";
import { useState } from "react";

export default function CoinPage() {
    const [activeTab, setActiveTab] = useState('tab1');
    const handleTabClick = (e:any,tabId:string) => {
        e.preventDefault();
        setActiveTab(tabId); 
      };
    return (
        <LandingLayout>
            <main className="main-wrapper">

                <section className="page page-currencies">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">بازارها</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">نرخ لحظه ای ارزها</li>
                            </ol>
                        </nav>
                        <div className="page-header page-header--flex">
                            <h1 className="page-title">نرخ لحظه ای ارزها</h1>
                            <form className="modern-search">
                                <input type="text" placeholder="جستجو در ارزها"/>
                                    <button type="submit">
                                        <span className="icon">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="9.76657" cy="9.76688" r="8.98856" stroke="#040F4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                <path d="M16.0183 16.4854L19.5423 20.0002" stroke="#040F4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>
                                    </button>
                            </form>
                        </div>
                        <div className="nav-tabs-wrapper">
                        <FilterNavCoin activeTab={activeTab} handleTabClick={handleTabClick} />
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade" id="tab-1" role="tabpanel" aria-labelledby="tab1">
                                <div className="table-responsive">
                                    <table className="table-crypto">
                                        <thead>
                                            <tr>
                                                <th className="text-center">ارز</th>
                                                <th className="text-center">قیمت واحد (دلار)</th>
                                                <th className="text-center">قیمت واحد (ریال)</th>
                                                <th className="text-center">تغییرات 24 ساعته</th>
                                                <th className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                <div className="table-crypto-actions text-center">
                              <a href="#" className="btn btn-outline-success ">
                                خرید و فروش
                              </a>
                            </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="tab2">
                                <div className="table-responsive">
                                    <table className="table-crypto">
                                        <thead>
                                            <tr>
                                                <th className="text-center">ارز</th>
                                                <th className="text-center">قیمت واحد (دلار)</th>
                                                <th className="text-center">قیمت واحد (ریال)</th>
                                                <th className="text-center">تغییرات 24 ساعته</th>
                                                <th className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade active show" id="tab-3" role="tabpanel" aria-labelledby="tab3">
                                <div className="table-responsive">
                                    <table className="table-crypto">
                                        <thead>
                                            <tr>
                                                <th className="text-center">ارز</th>
                                                <th className="text-center">قیمت واحد (دلار)</th>
                                                <th className="text-center">قیمت واحد (ریال)</th>
                                                <th className="text-center">تغییرات 24 ساعته</th>
                                                <th className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-4" role="tabpanel" aria-labelledby="tab4">
                                <div className="table-responsive">
                                    <table className="table-crypto">
                                        <thead>
                                            <tr>
                                                <th className="text-center">ارز</th>
                                                <th className="text-center">قیمت واحد (دلار)</th>
                                                <th className="text-center">قیمت واحد (ریال)</th>
                                                <th className="text-center">تغییرات 24 ساعته</th>
                                                <th className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/BTC.png" />
                                                            <h6>بیت کوین</h6>
                                                            <span>BTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/USDT.png" />
                                                            <h6>تتر</h6>
                                                            <span>USDT</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/LTC.png" />
                                                            <h6>لایت کوین</h6>
                                                            <span>LTC</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/SHIB.png" />
                                                            <h6>شیبا</h6>
                                                            <span>SHIB</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-success fw-medium d-inline-block d-ltr">+2.5%</span>
                                                        <img src="assets/img/graph-g.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ETH.png" />
                                                            <h6>اتریوم</h6>
                                                            <span>ETH</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="table-crypto-title">
                                                        <img src="assets/img/coins/ADA.png" />
                                                            <h6>کاردانو</h6>
                                                            <span>ADA</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="d-inline-block d-ltr">$17,232.32</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-md">
                                                        430,807.5
                                                        تومان
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="table-crypto-changes">
                                                        <span className="text-danger fw-medium d-inline-block d-ltr">-2.3%</span>
                                                        <img src="assets/img/graph-r.png" />
                                                    </div>
                                                </td>
                                                <td className="text-start">
                                                    <div className="table-crypto-actions">
                                                        <a href="#" className="btn btn-outline-primary">معامله</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="page-footer">
                            <ul className="pagination">
                                <li className="pagination-item pagination-prev pagination-item--disabled">
                                    <a href="#" className="pagination-link">
                                        <span className="icon">
                                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.6667 1L17 6L11.6667 11" stroke="#040F4A" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M17 6L1 6" stroke="#040F4A" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="pagination-item pagination-item--active">
                                    <a href="#" className="pagination-link">1</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="#" className="pagination-link">2</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="#" className="pagination-link">3</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="#" className="pagination-link">4</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="#" className="pagination-link">5</a>
                                </li>
                                <li className="pagination-item">
                                    <span className="pagination-link">⋯</span>
                                </li>
                                <li className="pagination-item">
                                    <a href="#" className="pagination-link">15</a>
                                </li>
                                <li className="pagination-item pagination-next">
                                    <a href="#" className="pagination-link">
                                        <span className="icon">
                                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.33334 11L1.00001 6L6.33334 1" stroke="#040F4A" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M1 6L17 6" stroke="#040F4A" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="landing-crypto-banner">
                    <div className="container">
                        <div className="crypto-banner">
                            <h2 className="crypto-banner-title">هر جای دنیا هستی ریال برات تبدیل به ارز دلخواهت می&zwnj;کنیم
                            </h2>
                            <a href="#" className="btn btn-white">با آرسونیکس آسان شروع کن
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </LandingLayout>
    )

}