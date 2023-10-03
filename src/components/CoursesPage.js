import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courseStore from '../stores/courseStore';
import CourseList from './CourseList';
import { loadCourses } from '../actions/courseActions';
import * as authorApi from '../api/authorApi';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);

  useEffect(() => {
    authorApi.getAuthors().then((_authors) => setAuthors(_authors));
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} authors={authors} />
    </>
  );
}

export default CoursesPage;
