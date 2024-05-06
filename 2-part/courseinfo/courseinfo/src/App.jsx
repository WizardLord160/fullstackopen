import Course from "./components/Course"

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  }
  // console.log(course)
  return (<div>
    <h1>Web development curriculum</h1>
    {course.parts.map(courseSection =>
      <div key={courseSection.id}>
        <h3>{courseSection.name}</h3>
        {courseSection.parts.map(el => 
          <Course key={el.id} courseName={el.name} exercises={el.exercises}/>
        )}
        <p>
          <strong>
            total of {courseSection.parts.reduce((total, num) => {
              // console.log(total, num.exercises)
              return total + num.exercises
            }, 0)} exercises
          </strong>
        </p>
      </div>
    )}

  </div>)
}

export default App