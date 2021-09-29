/* eslint-disable linebreak-style */
import {
  ADD__USER__TO__RIDE, REMOVE__USER__FROM__RIDE, ADD__NEW__MESSAGE,
  DELETE__RIDE__IN__STATE, SAVE__ALL__RIDES, SAVE__ONE__RIDE, GET__RIDE__IS__LOADING,
} from '../actions/rides';

const ridesInitialState = {
  allRides: [],
  currentRide: {
    isLoading: true,
    ride_id: 0,
    title: '',
    description: '',
    start_coordinate: [
      0,
      0,
    ],
    end_coordinate: [
      0,
      0,
    ],
    starting_time: '', // translate into le 15 sept 2021 à 18h30
    duration: {
      minutes: 0,
    },
    max_number_dogs: 0,
    tag_label: '',
    host_id: 0,
    host_first_name: '',
    messages: [
      {
        message_id: 1,
        sent: '', // translate into il y a ... min / heures / jours
        message: '',
        sender_id: 0,
        sender_photo: '',
        sender_first_name: '',
      },
    ],
    participants: [
      {
        dogs: [
          {
            dog_photo: [
              {
                photo_id: 0,
                photo_url: '',
              },
            ],
            dog_id: 0,
            dog_surname: '',
            dog_behavior: '',
            dog_breed: '',
            dog_gender: '',
            dog_weight: '',
            dog_age: 0, // number of months
            dog_sterilization: false,
            dog_description: '',
          },
        ],
        participant_id: 0,
        participant_photo: '',
        participant_first_name: '',
      },
    ],
  },
};

const ridesReducer = (state = ridesInitialState, action = {}) => {
  switch (action.type) {
    case SAVE__ALL__RIDES:
      return {
        ...state,
        allRides: action.allRides,
      };
    case ADD__USER__TO__RIDE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          participants: [
            ...state.currentRide.participants,
            {
              participant_id: action.participant_id,
              participant_first_name: action.participant_first_name,
              participant_last_name: action.participant_last_name,
              participant_photo: action.participant_photo,
              dogs: action.dogs,
            },
          ],
        },
      };
    case REMOVE__USER__FROM__RIDE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          participants: [
            ...state.currentRide.participants.filter(
              (participant) => participant.participant_id !== action.id,
            ),
          ],
        },
      };
    case ADD__NEW__MESSAGE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          messages: [
            ...state.currentRide.messages,
            {
              sent: new Date().toISOString(),
              message: action.message,
              sender_id: action.sender_id,
              sender_photo: action.sender_photo,
              sender_first_name: action.sender_first_name,
              sender_last_name: action.sender_last_name,
            },
          ],
        },
      };
    case DELETE__RIDE__IN__STATE:
      return {
        ...state,
        allRides: state.allRides.map((ride) => ride.ride_id !== action.id),
        currentRide: {
          ...ridesInitialState.currentRide,
        },
      };
    case SAVE__ONE__RIDE:
      if (action.ride.messages === null) {
        return {
          ...state,
          currentRide: {
            ...action.ride,
            messages: [],
            isLoading: false,
          },
        };
      }
      return {
        ...state,
        currentRide: {
          ...action.ride,
          isLoading: false,
        },
      };
    case GET__RIDE__IS__LOADING:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          isLoading: true,
        },
      };
    default:
      return state;
  }
};

export default ridesReducer;
