import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Avatar
} from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import css from '../common/css';
import List from "./list";
import Header from '../common/header';

const { Content } = Layout;
const { Title } = Typography;

const Info = [
  {
    name: "Leanne Graham",
    birthday: '1995-03-28',
    age: 25,
    id: 1
  },
  {
    name: "Chelsey Dietrich",
    birthday: '1996-04-30',
    age: 44,
    id: 2
  },
  {
    name: "Kurtis Weissnat",
    birthday: '1992-04-09',
    age: 67,
    id: 3
  },
  {
    name: "Ervin Howell",
    birthday: '1990-05-10',
    age: 32,
    id: 4
  },
  {
    name: "Clementine Bauch",
    birthday: '1945-05-30',
    age: 28,
    id: 5
  },
  {
    name: "Patricia Lebsack",
    birthday: '1915-03-29',
    age: 55,
    id: 6
  },
  {
    name: "Patruttcia Lebsack",
    birthday: '1915-03-29',
    age: 55,
    id: 6
  },
  {
    name: "Quyrycia Lebsack",
    birthday: '1915-03-27',
    age: 55,
    id: 6
  },
  {
    name: "hellcia Lebsack",
    birthday: '1915-03-28',
    age: 55,
    id: 6
  }
];

function Upcoming(person, toMonth) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  
  const filterData = person.filter(data => {
    const month = new Date(data.birthday).getMonth();
    const date = new Date(data.birthday).getDate();
    
    if (currentDay === date) {
      return false;
    }
    
    return (month >= currentMonth && month <= currentMonth + toMonth);
  });

  return filterData;
}

const Birthday = () => {
  const [showBirthday, setShowBirthday] = useState([]);
  const [birthdayId, setBirthdayId] = useState('');


  function Today(person) {
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    if (Number(localStorage.getItem("year")) !== Number(currentYear)) {
      localStorage.removeItem('personId')
    }

    let filterData = person.filter((data) => {
      let day = new Date(data.birthday).getDate();
      let month = new Date(data.birthday).getMonth() + 1;
      return (currentDay === day) && (currentMonth === month) && (data.id !== Number(localStorage.getItem("personId")))
    })
    setShowBirthday(filterData);
  };

  const closeHandle = (id) => {
    setBirthdayId(id);
    let currentYear = new Date().getFullYear();
    localStorage.setItem("personId", JSON.stringify(id));
    localStorage.setItem("year", JSON.stringify(currentYear));
  };

  useEffect(() => {
    Today(Info);
  }, [birthdayId]);

  return (
    <div>
      <Header />
      <Content style={css.main}>
        <Title level={3} style={css.text_dark}>Birthday Remainder</Title>
        <Content style={css.main_board}>
          {
            showBirthday && showBirthday.length > 0 && showBirthday.map((person, index) => (
              <div key={index}>
                <CloseCircleOutlined style={css.close} onClick={() => closeHandle(person.id)} />
                <Layout style={css.notificationStyle}>
                  <Title level={4} style={css.text_dark}>Wishing you a very Happy Birthday!</Title>
                  <div style={css.list_flex} key={index}>
                    <Avatar src="https://joesch.moe/api/v1/random?key=1" style={css.imgStyle} />
                    <div style={css.title}>
                      <div className=''>{person.name}</div>
                      <h5 className='age'>{person.age} years old</h5>
                    </div>
                  </div>
                </Layout>
              </div>
            ))
          }
          <Title level={4} style={css.upcomingStyle}>Upcomming</Title>
          <div style={css.upcoming}>
            <List info={Upcoming(Info, 2)} closeInfo='upcomming' />
          </div>
        </Content>
      </Content>
    </div>
  )
}

export default Birthday;
