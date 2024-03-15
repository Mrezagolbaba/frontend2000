import { Button } from "reactstrap";
import { CryptoData } from "types/exchange";
import { coinShow, tomanShow } from "helpers";
import { useGetRateQuery } from "store/api/publics";
import greenChart from "assets/img/graph-g.png";
import redChart from "assets/img/graph-r.png";
import { useAppSelector } from "store/hooks";

import style from "assets/scss/components/CoinRecord/style.module.scss";

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
  const { id, firstTierVerified } = useAppSelector((state) => state.user);
  const { data, isLoading, isSuccess } = useGetRateQuery({
    sourceCurrencyCode: source.currencyCode,
    targetCurrencyCode: destinationCode,
  });

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
    isSuccess && (
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
              ? (Number(data.rate) / 10).toLocaleString() + " تومان"
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
            <Button
              color="primary"
              outline
              tag="a"
              href={id && firstTierVerified ? "/dashboard/exchange" : "/login"}
            >
              معامله
            </Button>
          </div>
        </td>
      </tr>
    )
  );
}
