const Course = (props) => {
    const {courseName, exercises} = props
  
    return (
    <p>
        {courseName} {exercises}
    </p>
    )
  }
  
  export default Course