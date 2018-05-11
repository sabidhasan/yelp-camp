import React from 'react'

const Pagination = (props) => {
  if (props.lastPage === 0) return <h2>No results found. Try applying a different filter</h2>;

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
    <React.Fragment>
      <div className='search-page-selector'>
        <span className='page-count'>
          Page {props.currentPage} of {props.lastPage}
        </span>
        {allPages.length > 1 ?
          <div className='pages'>
            {props.currentPage > 1
              ? <a href='' className='prev-link' onClick={props.prevHandler}>« Previous</a>
              : null
            }
            {allPages.map(v=> (
              <a
                key={v}
                className={v===props.currentPage ? 'current' : undefined}
                onClick={(e) => props.goToPageHandler(e, v - 1)} href='#'>{v}
              </a>)
            )}
            {props.currentPage !== props.lastPage
              ? <a href='' className='next-link' onClick={props.nextHandler}>Next »</a>
              : null
            }
          </div>
        : null }
      </div>
  </React.Fragment>
  )
}

export default Pagination
