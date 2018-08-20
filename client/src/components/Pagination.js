import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  if (props.lastPage === 0) return null;

  // Generate pages counter with current page already in there
  const allPages = [props.currentPage]
  for (let i = 1; i <= 10; i++) {
    // look current page +/- i
    const newNums = [props.currentPage + i, props.currentPage - i]
    // Add if allPages isnt too long and page number is not too small/big
    newNums.forEach(v => {if (v > 0 && v <= props.lastPage && allPages.length < 7) allPages.push(v)})
  }
  // Sort because it is in no order
  allPages.sort((a, b) => (a > b ? 1 : -1))

  return(
    <div className='Pagination flex-center'>
      <span className='Pagination__count'>
        Page {props.currentPage} of {props.lastPage}
      </span>
      {allPages.length > 1 ?
        <div className='Pagination__pages'>
          {props.currentPage > 1
            ? <button className='Pagination__link Pagination__prev-link bold'
              onClick={(e) => props.goToPageHandler(e, props.currentPage - 2)}>« Previous</button>
            : null
          }
          {allPages.map(v=> (
            <button
              key={v}
              className={`Pagination__link bold ${v===props.currentPage ? 'Pagination__link--current' : ''}`}
              onClick={(e) => props.goToPageHandler(e, v - 1)}>{v}
            </button>)
          )}
          {props.currentPage !== props.lastPage
            ? <button className='Pagination__link Pagination__next-link bold'
              onClick={(e) => props.goToPageHandler(e, props.currentPage)}>Next »</button>
            : null
          }
        </div>
      : null }
    </div>
  )
}

Pagination.propTypes = {
  lastPage: PropTypes.number,
  currentPage: PropTypes.number,
  goToPageHandler: PropTypes.func
}

export default Pagination
