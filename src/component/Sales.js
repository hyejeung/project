// Sale.js

import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


const Sales = () => {
  useEffect(() => {
    // Chart.js v2에서 'category' 스케일을 등록합니다.
    Chart.scaleService.updateScaleDefaults('category', {
      position: 'bottom',
    });
  }, []);

  // 임의의 매출 데이터 생성
  const salesData = {
    labels: ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05', '2023-11-06', '2023-11-07'],
    datasets: [
      {
        label: '매출',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [120, 150, 100, 200, 180, 160, 220],
      },
    ],
  };

  // 오늘자 판매 목록
  const todaySales = [
    { menu: '아메리카노', quantity: 30, price: 3000 },
    { menu: '라떼', quantity: 20, price: 4000 },
    { menu: '크로아상', quantity: 15, price: 2500 },
  ];

  return (
    <div>
      <h1>매출 관리 페이지</h1>
      <div>
        <button>연 매출</button>
        <button>이번달 매출</button>
        <button>이번주 매출</button>
      </div>
      <div>
        <h2>이번주 매출 총 합계: $1,230</h2>
      </div>
      <div>
        <Bar
          data={salesData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div>
        <h2>오늘자 날짜: 2023-11-07</h2>
        <ul>
          {todaySales.map((item, index) => (
            <li key={index}>
              {item.menu} - 수량: {item.quantity}, 가격: ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sales;
