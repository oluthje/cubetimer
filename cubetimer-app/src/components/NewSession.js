import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import axios from 'axios'

const NewSession = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
  	const name = form.getFieldValue('name');
  	if (name) {
	  	setIsModalVisible(false);
	    props.createSession(form.getFieldValue('name'));
  	}
  };

  const newSessionForm = (
    <Form
    	form={form}
      name="basic"
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please name your session!' }]}
      >
        <Input />
      </Form.Item>
     </Form>
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        New Session
      </Button>
      <Modal title="New Session" visible={isModalVisible} onOk={onFinish} onCancel={handleCancel}>
      	{newSessionForm}
      </Modal>
    </>
  );
};

export default NewSession;