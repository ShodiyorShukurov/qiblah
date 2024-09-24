import * as React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import Api from "api";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import './modal.css'

export default function NewsModal({ handleClose, open, setOpen, setSelectedItem, selectItem }) {
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
          if (res.data) {
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
    <Modal
      isOpen={open}
      toggle={handleClose}
      className="custom-modal"
    >
      <ModalHeader>ADD</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Input
              type="text"
              name="news_title"
              id="news_title"
              value={formik.values.news_title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.news_title && !!formik.errors.news_title}
              placeholder="Title"
              required
            />
            {formik.touched.news_title && formik.errors.news_title && (
              <div className="invalid-feedback">{formik.errors.news_title}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="textarea"
              name="news_description"
              id="news_description"
              value={formik.values.news_description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.news_description && !!formik.errors.news_description}
              placeholder="Description"
            />
            {formik.touched.news_description && formik.errors.news_description && (
              <div className="invalid-feedback">{formik.errors.news_description}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="news_button_text"
              id="news_button_text"
              value={formik.values.news_button_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.news_button_text && !!formik.errors.news_button_text}
              placeholder="Button Text"
            />
            {formik.touched.news_button_text && formik.errors.news_button_text && (
              <div className="invalid-feedback">{formik.errors.news_button_text}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="url"
              name="news_link"
              id="news_link"
              value={formik.values.news_link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.news_link && !!formik.errors.news_link}
              placeholder="News Link"
            />
            {formik.touched.news_link && formik.errors.news_link && (
              <div className="invalid-feedback">{formik.errors.news_link}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="select"
              name="news_language"
              id="news_language"
              value={formik.values.news_language}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.news_language && !!formik.errors.news_language}
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
            </Input>
            {formik.touched.news_language && formik.errors.news_language && (
              <div className="invalid-feedback">{formik.errors.news_language}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="file"
              name="news_file"
              id="news_file"
              onChange={(event) => {
                formik.setFieldValue("news_file", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              invalid={formik.touched.news_file && !!formik.errors.news_file}
            />
            {formik.touched.news_file && formik.errors.news_file && (
              <div className="invalid-feedback">{formik.errors.news_file}</div>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

NewsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  selectItem: PropTypes.object.isRequired,
};
