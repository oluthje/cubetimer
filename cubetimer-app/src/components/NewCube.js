import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import axios from 'axios'

const NewCube = (props) => {
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
	    props.createCube(form.getFieldValue('name'));
  	}
  };

  const newCubeForm = (
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
        rules={[{ required: true, message: 'Please name your cube!' }]}
      >
        <Input />
      </Form.Item>
     </Form>
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        New Cube
      </Button>
      <Modal title="New Cube" visible={isModalVisible} onOk={onFinish} onCancel={handleCancel}>
      	{newCubeForm}
      </Modal>
    </>
  );
};

export default NewCube;