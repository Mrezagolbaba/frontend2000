import greenChart from "assets/img/graph-g.png";
import redChart from "assets/img/graph-r.png";
import { CryptoData } from "types/exchange";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { useEffect } from "react";
import { useLazyGetRateQuery } from "store/api/publics";

import style from "assets/scss/components/CoinRecord/style.module.scss";
import { tomanShow } from "helpers";

type Props = {
  destinationCode: "IRR" | "USDT";
  source: {
    imgSrc: string;
    currencyCode: string;
    name: string;
    originName: string;
  };
  changesLog: CryptoData;
};

export default function CoinRecord({
  destinationCode,
  source,
  changesLog,
}: Props) {
  // ==============|| Hooks ||================= //
  const { id, firstTierVerified } = useAppSelector((state) => state.user);
  const [request, { data, isLoading, isSuccess }] = useLazyGetRateQuery();

  // ==============|| Handlers ||================= //
  const handleRequest = () => {
    request({
      sourceCurrencyCode: source.currencyCode,
      targetCurrencyCode: destinationCode,
    });
  };
  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const interval = setInterval(handleRequest, 15000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationCode]);

  useEffect(() => {
    handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationCode]);

  // ==============|| Render ||================= //
  return isLoading ? (
    <tr>
      <td className="placeholder-glow">
        <div className="placeholder col-12 rounded" />
      </td>
      <td className="placeholder-glow">
        <div className="placeholder col-12 rounded" />
      </td>
      <td className="placeholder-glow">
        <div className="placeholder col-12 rounded" />
      </td>
      <td className="placeholder-glow">
        <div className="placeholder col-12 rounded" />
      </td>
    </tr>
  ) : (
    isSuccess && data && (
      <tr>
        <td className={style["coin-wrapper"]}>
          <div className={style["coin-logo"]}>
            <img src={source.imgSrc} alt={source.currencyCode} />
          </div>
          <div className={style["coin-name"]}>
            <span className={style["origin-name"]}>{source.name}</span>
            <span className={style["nick-name"]}>{source.currencyCode}</span>
          </div>
        </td>
        <td className="text-center">
          <div className={destinationCode === "USDT" ? "latin-font" : ""}>
            {destinationCode === "IRR"
              ? tomanShow({ value: data.rate, currency: "IRR" })
              : "USDT " + Number(data.rate).toLocaleString()}
          </div>
        </td>
        <td className="text-center">
          {changesLog ? (
            <div className={style["graph-wrapper"]}>
              <div
                className={` ${destinationCode === "USDT" ? "latin-font" : "ltr-tag"} ${
                  changesLog.price_change_percentage_24h > 0
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {changesLog.price_change_percentage_24h.toFixed(2)}
              </div>
              <img
                src={
                  changesLog?.price_change_percentage_24h > 0
                    ? greenChart
                    : redChart
                }
                alt="graph"
              />
            </div>
          ) : (
            "-"
          )}
        </td>
        <td className="text-center">
          <div className="table-crypto-actions">
            <Link
              className="btn btn-outline-primary"
              to={id && firstTierVerified ? "/dashboard/exchange" : "/login"}
            >
              معامله
            </Link>
          </div>
        </td>
      </tr>
    )
  );
}
