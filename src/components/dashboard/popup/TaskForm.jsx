import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoCloseSharp } from "react-icons/io5";
import "./taskform.css";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date()
    .required('Due date is required')
    .min(new Date(), 'Due date cannot be in the past'),
  priority: Yup.string().required('Priority is required'),
  status: Yup.string().required('Status is required'),
});

const TaskForm = ({ onSave, onCancel, initialValues }) => {
  return (
    <div className="container12">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ isSubmitting }) => (
          <div className="position-relative form-container">
            {/* Cross Button */}
            <button
              type="button"
              onClick={onCancel}
              className="position-absolute top-0 end-0 crossbtn"
              aria-label="Close"
            >
              <IoCloseSharp />
            </button>
            
            <Form className="container mt-4">
              <div className="form-group mb-3 pt-2">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter task title"
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  placeholder="Enter task description"
                  rows="3"
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="dueDate">Due Date</label>
                <Field
                  type="date"
                  name="dueDate"
                  className="form-control"
                />
                <ErrorMessage name="dueDate" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="priority">Priority</label>
                <Field
                  as="select"
                  name="priority"
                  className="form-select"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Field>
                <ErrorMessage name="priority" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="status">Status</label>
                <Field
                  as="select"
                  name="status"
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-danger" />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn btn-secondary me-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
