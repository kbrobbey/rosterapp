import React, { useState, useEffect } from 'react';
import { Button, Box, Grid, Container, Divider, Typography, Stack } from '@mui/material';
import AxiosInstance from '../utility/AxiosConfig';
import RobotCard from '../Components/RobotCard/RobotCard';
import ModalMessage from '../Components/Modal/ModalMessage';

const FULL_BENCH_MESSAGE =
  'The bench is currently full, please promote or release robots to make space for new robots';
const FULL_START_MESSAGE =
  'The starting line up is currently full, please demote or release robots to make space for new robots';

export default function GenerateRobots() {
  const [robot, setRobot] = useState({});
  const [starters, setStarters] = useState([]);
  const [bench, setSetBench] = useState([]);
  const [openFullBenchDialog, setOpenFullBenchDialog] = useState(false);
  const [openFullStartDialog, setOpenFullStartDialog] = useState(false);

  const getRobot = async () => {
    try {
      const data = await AxiosInstance.get('users');
      setRobot(data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error: ', err);
    }
  };

  useEffect(() => {
    getRobot();
  }, []);
  const addTOBench = () => {
    if (bench.length < 7) {
      getRobot();
      setSetBench((prev) => [...prev, { ...robot }]);
    } else {
      setOpenFullBenchDialog(!openFullBenchDialog);
    }
  };

  const addTOStarters = () => {
    if (starters.length < 5) {
      getRobot();
      setStarters((prev) => [...prev, robot]);
    } else {
      setOpenFullStartDialog(!openFullStartDialog);
    }
  };

  const releaseRobot = (id, from) => {
    if (from === 'Bench') {
      setSetBench((prev) => prev.filter((bencher) => bencher.id !== id));
    } else {
      setStarters((prev) => prev.filter((starter) => starter.id !== id));
    }
  };

  const demoteRobot = (id) => {
    if (bench.length === 7) {
      setOpenFullBenchDialog(!openFullBenchDialog);
    }
    if (bench.length < 7) {
      const demotedRobot = starters.find((starter) => starter.id === id);
      setSetBench((prev) => [...prev, demotedRobot]);
      setStarters((prev) => prev.filter((starter) => starter.id !== id));
    }
  };

  const promoteRobot = (id) => {
    if (starters.length === 5) {
      setOpenFullStartDialog(!openFullStartDialog);
    } else if (starters.length < 5) {
      const promotedRobot = bench.find((bencher) => bencher.id === id);
      setStarters((prev) => [...prev, promotedRobot]);
      setSetBench((prev) => prev.filter((bencher) => bencher.id !== id));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box p={2}>
        <Box sx={{ p: 2, backgroundColor: '#F7F6C3' }}>
          <Typography>Click Generate Robot Button get a new robot</Typography>
          <Button variant="contained" onClick={getRobot}>
            Generate Robot
          </Button>
          <Box my={4}>
            <Stack>
              <RobotCard
                leftButtonAction={addTOBench}
                rightButtonAction={addTOStarters}
                leftButtonText="Bench"
                rightButtonText="Start"
                robot={robot}
              />
            </Stack>
          </Box>
        </Box>

        <Divider />
        <Box
          sx={{
            my: 2,
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#90CFF5'
          }}
        >
          <Box>
            <Typography>Bench ({bench.length})</Typography>
          </Box>
          <Box>
            <Typography>Starters ({starters.length})</Typography>
          </Box>
        </Box>
        {(bench.length > 0 || starters.length > 0) && (
          <Grid container spacing={2} sx={{ m: 2 }}>
            <Grid item container xs={6} sx={{ p: 2, backgroundColor: '#F5F278' }}>
              {bench.map((p) => (
                <Box key={p.id} m={0.5}>
                  <RobotCard
                    leftButtonAction={() => promoteRobot(p.id)}
                    rightButtonAction={() => releaseRobot(p.id, 'Bench')}
                    leftButtonText="Promote "
                    rightButtonText="Release"
                    robot={p}
                  />
                </Box>
              ))}
            </Grid>
            <Grid item container xs={6} sx={{ backgroundColor: '#A1FA6E' }}>
              {starters.map((p) => (
                <Box key={p.id} m={0.5}>
                  <RobotCard
                    leftButtonAction={() => demoteRobot(p.id)}
                    rightButtonAction={() => releaseRobot(p.id, 'Start')}
                    leftButtonText="Demote "
                    rightButtonText="Release"
                    robot={p}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
        )}
      </Box>
      <ModalMessage
        open={openFullBenchDialog}
        close={() => setOpenFullBenchDialog(!openFullBenchDialog)}
        message={FULL_BENCH_MESSAGE}
      />
      <ModalMessage
        open={openFullStartDialog}
        close={() => setOpenFullStartDialog(!openFullStartDialog)}
        message={FULL_START_MESSAGE}
      />
    </Container>
  );
}
