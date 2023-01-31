const App = () => {
  const courses = [
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
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course}/>
      )}
    </div>
  )
}

const Course = ({course}) => {
  return(
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({course}) => {
  return (
    <>
      <h2>{course.name}</h2>
    </>
  )
}

const Content = ({course}) => {
  return (
    <>
      {course.parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
    </>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({course}) => {
  let sum = course.parts.reduce( (accum, current) => accum+current.exercises, 0)

  return ( 
    <>
      <p><b>total of {sum} exercises</b></p>
    </>
  )
}

export default App