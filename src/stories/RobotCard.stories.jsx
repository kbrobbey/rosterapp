import React from 'react';
import { Box } from '@mui/material';
import { within, userEvent } from '@storybook/testing-library';
import RobotCard from '../Components/RobotCard/RobotCard';

export default {
  title: 'Example/Robot Card',
  component: RobotCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Robot = {
  avatar: 'https://robohash.org/inquiaitaque.png?size=300x300&set=set1',
  first_name: 'Test',
  last_name: 'User',
  username: 't_username'
};

function Template() {
  return (
    <Box>
      <RobotCard
        leftButtonAction={() => {}}
        leftButtonText="Left Button"
        rightButtonText="Right Button"
        rightButtonAction={() => {}}
        robot={Robot}
      />
    </Box>
  );
}

export const Primary = Template.bind({});

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttonEvent = await canvas.getByRole('button', {
    name: /Left Button/i
  });
  const buttonEvent2 = await canvas.getByRole('button', {
    name: /Right Button/i
  });
  await userEvent.click(buttonEvent);
  await userEvent.click(buttonEvent2);
};
