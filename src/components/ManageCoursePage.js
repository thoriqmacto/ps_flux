import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
import { toast } from 'react-toastify';
import * as courseActions from '../actions/courseActions';
import * as authorApi from '../api/authorApi';
import NotFoundPage from './NotFoundPage';
import { Route } from 'react-router-dom';

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: '',
  });

  const [authors, setAuthors] = useState([]);

  // For course
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path '/course/:slug'
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    } else {
      props.history.push('not-found');
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.history, props.match.params.slug]);

  // for authors
  useEffect(() => {
    authorApi.getAuthors().then((_authors) => setAuthors(_authors));
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push('/courses');
      toast.success('Course saved.');
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = 'Title is required.';
    if (!course.authorId) _errors.authorId = 'Author ID is required.';
    if (!course.category) _errors.category = 'Category is required.';

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
