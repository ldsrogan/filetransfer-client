import React, { useState, useEffect } from 'react';
import { Player } from 'video-react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const MediaPlayer = () => {
  const [state, setState] = useState({
    playerSource: '',
    inputVideoUrl: '',
  });
  let myPlayer;
  useEffect(() => {
    if (typeof myPlayer !== 'undefined' && myPlayer) {
      myPlayer.load();
    }
  }, [state.playerSource]);

  const handleValueChange = (e) => {
    const { value } = e.target;
    setState({
      inputVideoUrl: value,
    });
  };

  const updatePlayerInfo = () => {
    const { inputVideoUrl } = state;
    setState({
      playerSource: inputVideoUrl,
    });
  };

  return (
    <div>
      <Player
        ref={(player) => {
          myPlayer = player;
        }}
        videoId="video-1"
      >
        <source src={state.playerSource} />
      </Player>
      <div className="docs-example">
        <Form>
          <FormGroup>
            <Label for="inputVideoUrl">Video Url</Label>
            <Input
              name="inputVideoUrl"
              id="inputVideoUrl"
              value={state.inputVideoUrl}
              onChange={handleValueChange}
            />
          </FormGroup>
          <FormGroup>
            <Button type="button" onClick={updatePlayerInfo}>
              Update
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default MediaPlayer;
