import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Sales.css';
const generateRandomData = (length, max) => {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
};

const Sales = () => {
  const [weeklySales, setWeeklySales] = useState(generateRandomData(1000, 5000));
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());
  const [menuSales, setMenuSales] = useState([
    { name: '메뉴1', quantity: 10, price: 5000 },
    { name: '메뉴2', quantity: 15, price: 7000 },
    { name: '메뉴3', quantity: 8, price: 3000 },
    // ... 더 많은 메뉴 데이터
  ]);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['일', '월', '화', '수', '목', '금', '토'],
        datasets: [
          {
            label: '이번주 매출',
            data: weeklySales,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      },
      options: {
        // 추가적인 차트 옵션 설정 가능
      },
    });

    chartRef.current = newChart;
  }, [weeklySales]);

  const weeklyTotal = weeklySales.reduce((acc, value) => acc + value, 0);
  return (
    <div className="sales-container">
      <div>
        <button>연 매출</button>
        <button>이번달 매출</button>
        <button>이번주 매출</button>
      </div>
      <div>
      <p>이번주 매출 총 합계: {weeklyTotal}</p>
        <canvas ref={canvasRef} />
      </div>
      <div>
      <hr />
        <p>오늘 날짜: {todayDate}</p>
        <ul>
          {menuSales.map((menu, index) => (
            <li key={index}>
              {menu.name} - 수량: {menu.quantity}, 가격: {menu.price}원
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sales;