import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CourseList(props) {
  const courseListItems = props.courses.map((course) => {
    const author = props.authors.find(
      (author) => author.id === course.authorId
    );
    const authorName = author ? author.name : 'Unknown Author';
    return (
      <tr key={course.id}>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => props.deleteCourse(course.id)}
          >
            Delete
          </button>
        </td>
        <td>
          <Link to={'/course/' + course.slug}> {course.title}</Link>
        </td>
        <td>{authorName}</td>
        <td>{course.category}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>{courseListItems}</tbody>
    </table>
  );
}

CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  authors: PropTypes.any,
};

export default CourseList;
