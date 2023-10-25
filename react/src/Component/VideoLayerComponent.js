import * as React from 'react';
import { useState,forwardRef } from 'react';
import { Grid, IconButton, Typography,Tooltip, Button, Paper } from '@mui/material';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import './Styles/ControlVideoStyle.css'
import { Box } from '@mui/system';
import { grey, indigo } from '@mui/material/colors';
import { VideoControlBoxDefault, VideoControlBoxDefaultStyles, VideoControlGridContainerMediaFullScreenButtonStyles, VideoControlGridContainerPlayTimeStyles, VideoControlGridContainervolumeSliderStyles, VideoControlGridItemvolumeSliderStyles, VideoControlGridLayoutStyles, VideoControlGridMediaFullScreenButtonStyles, VideoControlGridMediaLayoutStyles, VideoControlGridMediaPlayButtonStyles, VideoControlGridPlayBarStyles, VideoControlMediaPaperToolsBarStyles, VideoControlMediaPlayBarStyles, VideoControlMediaPlayButtonStyles, VideoControlMediaTitleStyles, VideoControlMediaToolsBarStyles, VideoControlMediaToolsSliderStyles } from './Styles/VideoControlPageStyles';

function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
const VideoLayer = forwardRef(({},ref) =>{

  return (
        <div className='LayerWrapper' ref={ref}>
            {/* <Grid container style={VideoControlGridMediaLayoutStyles}>
                <Grid item>
                    <Typography variant='h5' style={VideoControlMediaTitleStyles}>VVVVVVVVVVVVVVVV</Typography>
                </Grid>
            </Grid> */}
        </div>
  );
});

export default VideoLayer;