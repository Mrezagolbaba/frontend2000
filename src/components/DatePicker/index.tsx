import { Card, Select } from "antd";
import { useEffect, useState } from "react";
import { generateLabelValueArray, generatePersianMonths } from "helpers";
import { isEmpty } from "lodash";
import jalaliMoment from "jalali-moment";

type Props = {
  onChange: (date: string) => void;
  label: string;
  error?: string;
};
function convertPersianToGregorian(persianDate: string) {

  const gregorianDate = jalaliMoment.from(persianDate, 'fa', 'YYYY/MM/DD');
  return gregorianDate.locale('en').format('YYYY-MM-DD');
}

const DatePicker = ({ onChange, label, error }: Props) => {
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);

  useEffect(() => {
    if (!isEmpty(year) || !isEmpty(month) || !isEmpty(day)) {
      onChange?.(convertPersianToGregorian(`${year}-${month}-${day}`));
    }
  }, [year, month, day, onChange]);

  return (
    <Card
      title={label}
      size="small"
      headStyle={{
        fontFamily: "IRANYekanX",
        color: "rgba(3, 4, 27, 0.4)",
        fontWeight: "400",
        fontSize: "0.75rem",
      }}
    >
      <div className="row gy-2">
        <div className="col-lg-4 col-sm-12">
          <Select
            className="dropdown bootstrap-select bs-select-control bs-form-select"
            id="year"
            value={year}
            onChange={(val) => setYear(val)}
            options={generateLabelValueArray(1302, 1402)}
            placeholder="سال"
            size="large"
            status={error ? "error" : undefined}
          />
        </div>
        <div className="col-lg-4 col-sm-12">
          <Select
            className="dropdown bootstrap-select bs-select-control bs-form-select"
            id="month"
            value={month}
            onChange={(val) => setMonth(val)}
            options={generatePersianMonths()}
            placeholder="ماه"
            size="large"
            status={error ? "error" : undefined}
          />
        </div>
        <div className="col-lg-4 col-sm-12">
          <Select
            className="dropdown bootstrap-select bs-select-control bs-form-select"
            id="day"
            value={day}
            onChange={(val) => setDay(val)}
            options={generateLabelValueArray(1, 31)}
            placeholder="روز"
            size="large"
            status={error ? "error" : undefined}
          />
        </div>
      </div>
    </Card>
  );
};

export default DatePicker;
