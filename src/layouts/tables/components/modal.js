import * as React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import Api from "api";

export default function NewsModal({
  handleClose,
  open,
  setOpen,
  setSelectedItem,
  selectItem,
  allUsers,
}) {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      news_title: selectItem?.news_title || "",
      news_description: selectItem?.news_description || "",
      news_button_text: selectItem?.news_button_text || "",
      news_link: selectItem?.news_link || "",
      news_language: selectItem?.news_lang || "",
      news_file: null,
    },

    enableReinitialize: true,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("photo", values.news_file);
      formData.append("news_title", values.news_title);
      formData.append("news_description", values.news_description);
      formData.append("news_button_text", values.news_button_text);
      formData.append("news_link", values.news_link);
      formData.append("news_lang", values.news_language);

      if (selectItem.news_id) {
        formData.append("news_id", selectItem.news_id);
        try {
          const res = await Api.put("/news/edit", formData);
          if(res.data){
            setSelectedItem({});
            queryClient.invalidateQueries("news");
            setOpen(false);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await Api.post("/news/add", formData);
          if (res.data) {
            setOpen(false);
            queryClient.invalidateQueries("news");
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  return (
    <div>
      {open ? (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={handleClose}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}
        >
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ADD</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="modal-body">
                  <div className="mb-2">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.news_title && formik.errors.news_title ? "is-invalid" : ""
                      }`}
                      id="title"
                      name="news_title"
                      value={formik.values.news_title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Title"
                      required
                    />
                    {formik.touched.news_title && formik.errors.news_title && (
                      <div className="invalid-feedback">{formik.errors.news_title}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <textarea
                      type="text"
                      className={`form-control ${
                        formik.touched.news_description && formik.errors.news_description
                          ? "is-invalid"
                          : ""
                      }`}
                      id="desc"
                      name="news_description"
                      value={formik.values.news_description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Description"
                    />
                    {formik.touched.news_description && formik.errors.news_description && (
                      <div className="invalid-feedback">{formik.errors.news_description}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.news_button_text && formik.errors.news_button_text
                          ? "is-invalid"
                          : ""
                      }`}
                      name="news_button_text"
                      value={formik.values.news_button_text}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Button Text"
                    />
                    {formik.touched.news_button_text && formik.errors.news_button_text && (
                      <div className="invalid-feedback">{formik.errors.news_button_text}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="url"
                      className={`form-control ${
                        formik.touched.news_link && formik.errors.news_link ? "is-invalid" : ""
                      }`}
                      name="news_link"
                      value={formik.values.news_link}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="News Link"
                    />
                    {formik.touched.news_link && formik.errors.news_link && (
                      <div className="invalid-feedback">{formik.errors.news_link}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <select
                      className={`form-select ${
                        formik.touched.news_language && formik.errors.news_language
                          ? "is-invalid"
                          : ""
                      }`}
                      name="news_language"
                      value={formik.values.news_language}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    >
                      <option value="" disabled>
                        Select Language
                      </option>
                      <option value="uzbek">Uzbek</option>
                      <option value="cyrillic">Cyrillic</option>
                      <option value="english">English</option>
                      <option value="russian">Russian</option>
                      <option value="kazakh">Kazakh</option>
                    </select>
                    {formik.touched.news_language && formik.errors.news_language && (
                      <div className="invalid-feedback">{formik.errors.news_language}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="file"
                      className={`form-control ${
                        formik.touched.news_file && formik.errors.news_file ? "is-invalid" : ""
                      }`}
                      name="news_file"
                      onChange={(event) => {
                        formik.setFieldValue("news_file", event.currentTarget.files[0]);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.news_file && formik.errors.news_file && (
                      <div className="invalid-feedback">{formik.errors.news_file}</div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

NewsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  allUsers: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  selectItem: PropTypes.object.isRequired,
};
