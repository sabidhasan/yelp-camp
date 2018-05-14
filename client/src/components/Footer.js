import React from 'react'

const Footer = () => {
  return (
    <footer>
      <h2>YelpCamp 2018</h2>
      <p>
        1234 Main St NW, Edmonton, AB T6J 1K1
        <br /><span className='bold'>Phone</span>: 1 800 555 5555
        <br /><span className='bold'>Email</span>: contact@yelpcamp.com
      </p>

      <h3>YelpCamp was created as part of <a href="#">The Web Developer Bootcamp </a>.
       This website has no affiliation with Yelp, Inc. in any way
     </h3>

      <h3>Made with 💚 and ☕ in Edmonton, Canada</h3>

      <div className='social-media'>
        <a href='#'><i className="fab fa-twitter social-media__twitter"></i></a>
        <a href='#'><i className="fab fa-github-square social-media__github"></i></a>
        <a href='#'><i className="fab fa-stack-overflow social-media__stackoverflow"></i></a>
        <a href='#'><i className="fab fa-linkedin social-media__linkedin"></i></a>
      </div>
    </footer>
  )
}

export default Footer
