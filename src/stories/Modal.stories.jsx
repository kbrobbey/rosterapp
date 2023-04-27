import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { within, userEvent } from '@storybook/testing-library';
import ModalMessage from '../Components/Modal/ModalMessage';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

function Template({ message }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button onClick={() => setOpen(!open)} variant="contained">
        Click To Open Modal
      </Button>
      <ModalMessage open={open} close={() => setOpen(!open)} message={message} />
    </Box>
  );
}

Template.propTypes = {
  message: PropTypes.string.isRequired
};

export const Primary = Template.bind({});
Primary.args = {
  message: 'Modal Message Test 1'
};

export const Secondary = Template.bind({});
Secondary.args = {
  message: 'Modal Message Test 2'
};

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttonEvent = await canvas.getByRole('button', {
    name: /Click to open Modal/i
  });
  await userEvent.click(buttonEvent);
};
