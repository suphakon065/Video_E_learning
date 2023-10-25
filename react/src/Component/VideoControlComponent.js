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
      backgroundColor: '#ffff',
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
const VideoControl = forwardRef(({
    onPlayPause, 
    playing, 
    onMute,
    muted,
    onVolumechange, 
    onVolumeSeekUp,
    volume,
    onToggleFullScreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    Vname,
    volumeSliderHover,
},ref) =>{

  return (
        <div className='controlsWrapper' ref={ref}>
            <Grid container style={VideoControlGridMediaLayoutStyles}>
                <Grid item>
                    <Typography variant='h5' style={VideoControlMediaTitleStyles}>{Vname}</Typography>
                </Grid>
            </Grid>
            <Grid container style={VideoControlGridMediaPlayButtonStyles}>
                <Box sx={VideoControlBoxDefaultStyles}>
                    <IconButton 
                        sx={VideoControlMediaPlayButtonStyles}
                        onClick={onPlayPause} 
                        className='controlIcons' 
                        aria-label='reqind'>
                        {playing? (
                            <PauseIcon fontSize='inherit'/>
                        ) :(
                            <PlayArrowIcon fontSize='inherit'/>
                        )}
                    </IconButton> 
                </Box>
                
            </Grid>
            <Grid>
                <Paper elevation={0} style={VideoControlMediaPaperToolsBarStyles}>
                    <Grid container sx={VideoControlGridContainerMediaFullScreenButtonStyles}>
                        <Grid item sx={VideoControlGridMediaFullScreenButtonStyles}>
                            <IconButton
                                sx={VideoControlMediaToolsBarStyles}
                                onClick={onPlayPause}
                            >
                                {playing ? (
                                    <PauseCircleIcon fontSize="large" />
                                ):(
                                    <PlayCircleIcon fontSize="large" />
                                )}
                            </IconButton>
                        </Grid>
                        <Grid item sx={VideoControlGridItemvolumeSliderStyles}>
                            <Grid container sx={VideoControlGridContainervolumeSliderStyles}>
                                {volumeSliderHover?
                                    <Slider
                                        orientation="vertical"
                                        sx={VideoControlMediaToolsSliderStyles}
                                        min={0}
                                        max={100}
                                        value={volume * 100}
                                        onChange={onVolumechange}
                                        onChangeCommitted={onVolumeSeekUp}
                                    />
                                :null
                                }
                                <Grid item>
                                    <IconButton
                                        sx={VideoControlMediaToolsBarStyles}
                                        onClick={onMute}
                                        className="bottomIcon"
                                    >
                                        {muted ? <VolumeOffIcon fontSize="medium" /> : <VolumeUpIcon fontSize="medium" />}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={VideoControlGridPlayBarStyles}>
                            <Grid container spacing={2} sx={VideoControlGridContainerPlayTimeStyles}>
                                <Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
                                    <Typography sx={VideoControlMediaToolsBarStyles}>{elapsedTime}</Typography>
                                </Grid>
                                <Grid item xs={6} sm={10} md={10} lg={10} xl={10}>
                                    <Slider
                                        sx={VideoControlMediaPlayBarStyles}
                                        valueLabelDisplay="auto"
                                        slots={{
                                            valueLabel: ValueLabelComponent,
                                        }}
                                        aria-labelledby="input-slider"
                                        value={played * 100}
                                        onChange={onSeek}
                                        onChangeCommitted={onSeekMouseUp}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
                                    <Typography sx={VideoControlMediaToolsBarStyles}>{totalDuration}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item width={50}>
                            <IconButton
                                sx={VideoControlMediaToolsBarStyles}
                                onClick={onToggleFullScreen}
                                className="bottomIcon"
                            >
                                <FullscreenIcon fontSize="medium" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
  );
});

export default VideoControl;