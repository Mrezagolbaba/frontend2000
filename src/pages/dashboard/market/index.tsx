import { Card, CardBody, CardHeader, Col, Row } from "reactstrap"

const Market = () => {
    return (
        <section className="page page-market">
            <Card>
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h5 className="card-title">بازارهای معاملاتی</h5>
                        <div className="card-action">
                            <a href="/dashboard/buy-sell" className="btn-simple">معامله سریع</a>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {/* <div className="table-filters">
                        <div className="table-filter">
                            <select className="bs-select-control bs-select-dropdown">
                                <option value="11">نوع ارز</option>
                                <option value="12">ارز دیجیتال</option>
                                <option value="13">فیات دیجیتال</option>
                            </select>
                        </div>
                        <div className="table-filter">
                            <select className="bs-select-control bs-select-dropdown">
                                <option value="1">پایه بازار</option>
                                <option value="4">تومان</option>
                                <option value="2">لیر</option>
                                <option value="3">تتر</option>
                                <option value="5">دلار</option>
                            </select>
                        </div>
                        <div className="table-filter">
                            <select className="bs-select-control bs-select-dropdown">
                                <option value="6">محبوب‌ترین‌ها</option>
                                <option value="7">جدید‌ترین‌ها</option>
                                <option value="8">بیشترین تغییر (24h)</option>
                            </select>
                        </div>
                    </div> */}
                    <div className="table-responsive">
                        <table className="table-modern table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">ارز</th>
                                    <th scope="col" className="text-center">آخرین قیمت</th>
                                    <th scope="col" className="text-center">کمترین قیمت (24h)</th>
                                    <th scope="col" className="text-center">تغییرات (24h)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ display: 'flex', alignItems: 'center', }}>
                                        <span className="icon-market">
                                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="25" height="25"
                                            >
                                                <g id="SVGRepo_bgCarrier" stroke-width="0">
                                                </g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd">
                                                    <circle cx="16" cy="16" r="16" fill="#26A17B"></circle>
                                                    <path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"></path> </g> </g></svg>
                                        </span>
                                        <div style={{ marginRight: '10px' }}>
                                            <span className="text-50 m-fa">تتر
                                            </span>
                                            <span className="text-50 m-symbol">Tether - USDT
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <span className="m-fa">49,500
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center"><div className="market-data">
                                        <span className="m-fa">49,500
                                        </span>
                                    </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <div className="tm__crypto-changes">
                                                <span className="icon">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.833466 7C0.833466 10.4053 3.59413 13.1667 7.00013 13.1667C10.4055 13.1667 13.1668 10.4053 13.1668 7C13.1668 3.59467 10.4055 0.833333 7.00013 0.833333C3.59413 0.833334 0.833466 3.59467 0.833466 7Z" stroke="#FF1F11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M4.686 6.03847L7 8.36247L9.314 6.03847" stroke="#FF1F11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                                <strong className="text-danger">0.25%</strong>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <a href="#" className="btn-simple tm__actions">شروع معامله</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ display: 'flex', alignItems: 'center', }}>
                                        <span className="icon-market">
                                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" >
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                                </g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path clip-rule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-6a1 1 0 1 0-2 0v1.28l-2.316.771a1 1 0 1 0 .632 1.898L10 9.387v.892l-2.316.772a1 1 0 0 0 .632 1.898L10 12.387V17a1 1 0 0 0 1 1c.993 0 2.461-.29 3.71-1.189C16.008 15.876 17 14.326 17 12a1 1 0 1 0-2 0c0 1.674-.675 2.624-1.46 3.188a4.402 4.402 0 0 1-1.54.687V11.72l2.316-.772a1 1 0 0 0-.632-1.898L12 9.613V8.72l2.316-.772a1 1 0 1 0-.632-1.898L12 6.613V6z" fill-rule="evenodd" fill="#ff0505"></path></g></svg>
                                        </span>
                                        <div style={{ marginRight: '10px' }}>
                                            <span className="text-50 m-fa">لیر ترکیه
                                            </span><span className="text-50 m-symbol">Turkish Lira - TL
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <span className="m-fa">49,500
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <span className="m-fa">49,500
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <div className="tm__crypto-changes">
                                                <span className="icon">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1665 7C13.1665 3.59467 10.4059 0.833334 6.99987 0.833334C3.59453 0.833334 0.833201 3.59467 0.833201 7C0.833201 10.4053 3.59453 13.1667 6.99987 13.1667C10.4059 13.1667 13.1665 10.4053 13.1665 7Z" stroke="#0ED039" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M9.314 7.96153L7 5.63753L4.686 7.96153" stroke="#0ED039" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                                <strong className="text-success">0.25%</strong>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="market-data">
                                            <a href="#" className="btn-simple tm__actions">شروع معامله</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </section>
    )
}
export default Market