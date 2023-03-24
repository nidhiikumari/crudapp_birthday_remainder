import React from 'react';
import { Avatar } from 'antd';
import css from '../common/css';

function iterate(data) {
  const CalculateBirthday = (data) => {
    let month = new Date(data).getMonth();
    let day = new Date(data).getDate();
    let year = new Date().getFullYear();
    return `${day}-${month}-${year}`
  }
  if (!data) return;
  return (
    <>
      {
        data.map((person, index) => (
          <div style={css.list_flex} key={index}>
            <Avatar src="https://joesch.moe/api/v1/random?key=1" style={css.imgStyle} />
            <div style={css.title}>
              <div className=''>{person.name}</div>
              <h5 className='age'>{person.age} years old</h5>
              <h5 className='age'>{CalculateBirthday(person.birthday)}</h5>
            </div>
          </div>
        ))
      }
    </>
  )
}

const ListData = ({ info }) => {
  return (
    iterate(info)
  )
}

export default ListData;
