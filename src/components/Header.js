import PropTypes from 'prop-types'

const Header = ({title}) => {
    return (
      <header>
        <h1>{title}</h1>
      </header>
    )
}

// this is a default. If we change anything in <Header/> then it will 
// not take the default but will take props passed into header.
Header.defaultProps ={
    title: 'Task Tracker'
}

// way to make code more robust by specifying types
Header.propTypes = {
    title: PropTypes.string,
  }

export default Header
