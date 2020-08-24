import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { close } from './modal';
import { showError } from './errors';

export const addNewChannel = createAsyncThunk(
  'channels/addNewChannel',
  async ({ name }, { dispatch }) => {
    try {
      await axios.post(routes.channelsPath(), {
        data: {
          attributes: {
            name,
          },
        },
      });
      dispatch(close());
    } catch (err) {
      dispatch(showError(err));
      throw err;
    }
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { dispatch }) => {
    try {
      await axios.patch(routes.channelPath(id), {
        data: {
          attributes: {
            name,
          },
        },
      },
      { params: { id } });
      dispatch(close());
    } catch (err) {
      dispatch(showError(err));
      throw err;
    }
  },
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (id, { dispatch }) => {
    try {
      await axios.delete(routes.channelPath(id), { params: { id } });
      dispatch(close());
    } catch (err) {
      dispatch(showError(err));
      throw err;
    }
  },
);

const channels = createSlice({
  name: 'channels',
  initialState: {
    allChannels: [],
    currentChannel: null,
  },
  reducers: {
    init: (state, action) => ({
      allChannels: action.payload.channels,
      currentChannel: 1,
    }),
    reChannel: (state, action) => {
      const { id, attributes: { name } } = action.payload;
      const channel = state.allChannels.find((cChhannel) => cChhannel.id === id);
      channel.name = name;
    },
    addChannel: (state, action) => {
      const {
        id, name, removable,
      } = action.payload;
      state.allChannels.push({
        id, name, removable,
      });
    },
    delChannel: (state, action) => {
      const { channelId } = action.payload;
      const newChannelList = state.allChannels.filter(({ id }) => id !== channelId);
      return { ...state, allChannels: newChannelList };
    },
    setCurrentChannel: (state, action) => ({ ...state, currentChannel: action.payload.id }),
  },
  extraReducers: {
    [renameChannel.fulfilled]: () => {},
    [deleteChannel.fulfilled]: () => {},
    [addNewChannel.fulfilled]: () => {},
  },
});

export const {
  init, setCurrentChannel, addChannel, delChannel, reChannel,
} = channels.actions;
export default channels.reducer;
