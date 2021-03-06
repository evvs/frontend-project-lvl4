import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { close } from '../../slices/modal';
import { renameChannel } from '../../slices/channels';

const AddChannelModalForm = () => {
  const dispatch = useDispatch();
  const clickedElemId = useSelector((state) => state.modal.clickedElemId);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(close());
  };
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: clickedElemId,
      channelName: '',
    },
    onSubmit: async (values) => {
      await dispatch(renameChannel({
        id: clickedElemId,
        name: values.channelName,
      }));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="channelName" className="d-block">
          {t('modals.renameChannel.description')}
          <input
            className="form-control"
            id="channelName"
            name="channelName"
            type="text"
            ref={inputEl}
            onChange={formik.handleChange}
            value={formik.values.channelName}
            autoComplete="off"
          />
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="primary" type="submit">
          {t('buttons.rename')}
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default AddChannelModalForm;
