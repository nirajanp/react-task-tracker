import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    
    return (
      <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
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


// To use inline css do this inside the tag 
// style={{color: 'red', backgroundColor:'black',}}

// this is for adding css 
// you will have to include this in tag you want this
// css to be implemented style={headingStyle}
// const headingStyle = {
//     color: 'red', 
//     backgroundColor:'black',
// }

export default Header
