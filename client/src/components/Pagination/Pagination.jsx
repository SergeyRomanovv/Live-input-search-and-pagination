import React from 'react'

export default function Pagination() {
  let active = 0;
  let items = [];
  for (let number = 0; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  )
}
