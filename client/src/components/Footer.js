import React from 'react'

const Footer = () => {
  return (
    <footer className='Footer flex-center'>
      <h2 className='Footer__text'>YelpCamp 2018</h2>
      <p role='contentinfo'>
        1234 Main St NW, Edmonton, AB T6J 1K1
        <br /><span className='bold' aria-label='Phone Number'>Phone</span>: 1 800 555 5555
        <br /><span className='bold' aria-label='Email Address'>Email</span>: contact@yelpcamp.com
      </p>

      <h2 className='Footer__about'>This website has no affiliation with Yelp, Inc. in any way.</h2>

      <h2 className='Footer__about'>Made with <span role='img' aria-label='love'>💚</span>
      and <span role='img' aria-label='coffee'>☕</span> in Edmonton, Canada</h2>

      <div className='Footer__social'>
        <a id='Footer__social-twitter' className='Footer__social-link' href='http://twitter.com/abid786' aria-label='Twitter Link'>
          <i className="fab fa-twitter Footer__twitter" aria-labelledby='Footer__social-twitter'></i>
        </a>
        <a id='Footer__social-github' className='Footer__social-link' href='https://github.com/sabidhasan#' aria-label='Github Link'>
          <i className="fab fa-github-square Footer__github" aria-labelledby='Footer__social-github'></i>
        </a>
        <a id='Footer__social-stack' className='Footer__social-link' href='https://stackoverflow.com/users/7509481/abid-hasan' aria-label='Stack Overflow Link'>
          <i className="fab fa-stack-overflow Footer__stackoverflow" aria-labelledby='Footer__social-stack'></i>
        </a>
        <a id='Footer__social-linkedin' className='Footer__social-link' href='https://www.linkedin.com/in/abidhasan/' aria-label='LinkedIn Link'>
          <i className="fab fa-linkedin Footer__linkedin" aria-labelledby='Footer__social-linkedin'></i>
        </a>
      </div>
    </footer>
  )
}

export default Footer
