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

export default Course