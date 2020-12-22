import React, { useState, useEffect } from 'react'


function Carousel({ children }) {

  const cards = React.Children.toArray(children);

  const totalElements = 7;

  const [page, setPage] = useState(0)
  const setPageOffset = n => setPage((page + n) % Math.ceil(totalElements))

  useEffect(() => {
    const t = setInterval(() => {
      setPage(page => page < totalElements - 1 ? page + 1 : 0)
    }, 5000)

    return () => {
      clearInterval(t)
    }
  }, [totalElements])



  return (
    <div className="carousel">
      <div className="arrows arrow-left" onClick={() => setPageOffset(page > 0 ? page - 1 : 0)}>&lt;</div>
      <div className="slides">
        {cards[page]}
      </div>
      <div className="arrows arrow-right" onClick={() => setPageOffset(page < totalElements ? page + 1 : 0)}>&gt;</div>

    </div>
  );
}

export default Carousel;
