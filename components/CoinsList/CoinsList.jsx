import React, { useContext, useEffect, useState } from 'react';
import Table from '../Table/Table';
import styles from '../CoinsList/CoinsList.module.css';
import icon6 from '../../public/images/icon6.png';
import icon7 from '../../public/images/icon7.png';
import icon8 from '../../public/images/icon8.png';
import SelectBox from '../SelectBox/SelectBox';
import Tab from '../Tab/Tab';
import ThemeContext from '../ThemeContext';
import { coins as table1 } from '../../data/coins';
import { fiat } from '../../data/fiat';

export default function CoinsList() {
  // const [selectedValue, setSelectedValue] = useState("table1");
  // const options = [
  //   { value: "table1", label: "همه رمزارزها", content: table1 },
  //   { value: "table2", label: "استیبل کوین", content: table2 },
  //   { value: "table3", label: "میم کوین", content: table3 },
  //   { value: "table4", label: "توکن صرافی", content: table4 },
  //   { value: "table5", label: "متاورس", content: table5 },
  //   { value: "table6", label: "دیفای", content: table6 },
  //   { value: "table7", label: "قرارداد هوشمند", content: table7 },
  //   { value: "table8", label: "اوراکل", content: table8 },
  //   { value: "table9", label: "وب 3,0", content: table9 },
  //   { value: "table10", label: "توکن بازی", content: table10 },
  //   { value: "table11", label: "NFT", content: table11 },
  //   { value: "table12", label: "هوش مصنوعی", content: table12 },
  //   { value: "table13", label: "لایه 2", content: table13 },
  // ];

  const [currentTable, setcurrentTable] = useState(table1);
  const [search, setsearch] = useState('');

  // const handleRadioChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  // useEffect(() => {
  //   const tableContent = options.find((item) => item.value === selectedValue);
  //   setcurrentTable(tableContent.content);
  // }, [selectedValue]);

  // const subject = [
  //   { value: "view", label: "پربازدیدترین", content: table1 },
  //   { value: "popular", label: "محبوب‌ترین", content: table1 },
  //   { value: "new", label: "جدیدترین", content: table1 },
  // ];

  const [activeTab, setactiveTab] = useState(0);
  const [fiatTable, setfiatTable] = useState(false);

  const handleTabClick = (a, b, c) => {
    setactiveTab(a);
    setcurrentTable(b);
    c === 'fiat' ? setfiatTable(true) : setfiatTable(false);
  };

  // const handleSelectClick = (_value) => {
  //   setcurrentTable(subject.filter(({ value }) => value === _value)[0].content);
  // };

  useEffect(() => {
    const table = fiatTable ? fiat : table1;

    if (search.trim().length > 0) {
      const searchResult = table.filter(
        ({ name, shortName }) =>
          name.includes(search) || shortName.includes(search),
      );

      setcurrentTable(searchResult);
    } else {
      setcurrentTable(table);
    }
  }, [search]);

  const tabContent = [
    { code: 0, content: table1, title: 'ارز دیجیتال' },
    { code: 1, content: fiat, title: 'فیات دیجیتال', type: 'fiat' },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <main className={`container ${theme === 'dark' ? 'theme-dark' : ''}`}>
      <section className={styles.coins_list_title_holder}>
        <h2 className={`title ${styles.title}`}>نرخ لحظه‌ای رمزارزها و فیات</h2>
        <Tab
          tabContent={tabContent}
          fcn={handleTabClick}
          activeTab={activeTab}
        />
      </section>

      <section className={styles.current_rate_holder}>
        <Table currentTable={currentTable} fiatTable={fiatTable}>
          <div className={styles.table_category_item}>
            <form action="" className={styles.search_holder}>
              <input
                type="search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className={styles.search_box}
                placeholder="جستجو"
              />
              {/* <SelectBox
                key="4"
                className={styles.select_box}
                subject={subject}
                setcurrentTable={handleSelectClick}
                defaultVal={subject[0]}
              /> */}
            </form>

            {/* <div className={styles.category_holder}>
              {options.map((option) => (
                <label
                  key={option.value}
                  className={`${styles.button_label} ${
                    selectedValue === option.value ? styles.active : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="radio-group"
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={handleRadioChange}
                    className={styles.button_input}
                  />
                  <span className={styles.button_text}>{option.label}</span>
                </label>
              ))}
            </div> */}
          </div>
        </Table>
      </section>
    </main>
  );
}
