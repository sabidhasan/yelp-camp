import React from 'react'

const Footer = () => {
  return (
    <footer>
      <h2>Copyright YelpCamp 2018</h2>

      <h3>YelpCamp was created as part of <a href="#">The Web Developer Bootcamp </a>.
       This website has no affiliation with Yelp, Inc. in any way</h3>

      <h3>Made with <span className='footer__red'>❤</span> in Edmonton, Canada</h3>

      <div className='social-media'>
        <a href='#'><i class="fab fa-twitter social-media__twitter"></i></a>
        <a href='#'><i class="fab fa-github-square social-media__github"></i></a>
        <a href='#'><i class="fab fa-stack-overflow social-media__stackoverflow"></i></a>
        <a href='#'><i class="fab fa-linkedin social-media__linkedin"></i></a>
      </div>
    </footer>
  )
}

export default Footer
