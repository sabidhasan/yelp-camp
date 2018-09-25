import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NewReviewForm from '../NewReviewForm'

configure({ adapter: new Adapter() });

describe('<NewReviewForm />', () => {
  let component;
  let props;

  let addNewComment;
  let toggleReviewForm;
  let idTokenSuccess;
  const event = { preventDefault() {} }

  const getIdToken = () => {
    return new Promise((res, rej) => {
      if (!idTokenSuccess) {
        return rej()
      }
      return res();
    })
  }

  beforeEach(() => {
    idTokenSuccess = true;
    addNewComment = jest.fn();
    toggleReviewForm = jest.fn();

    props = {
      campgroundID: 11,
      addNewComment,
      toggleReviewForm,
    }
    component = shallow(<NewReviewForm { ...props } />, {
      context:{
        user: {
          photoURL: 'url', displayName: 'Name', loading: false, getIdToken
        }
      }
    })
  })

  it('Component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Author name is displayed', () => {
    expect(component.find('.NewReviewForm__author').text()).toBe('Posting publically as Name')
  })

  it('Textarea onChange changes value', () => {
    component.find('.NewReviewForm__text').simulate('change', {target: {value: 'New text'}})
    expect(component.find('.NewReviewForm__text').props().value).toBe('New text')
  })

  it('When clicking Post button, if there is no review text, error shown', () => {
    component.find('.NewReviewForm__post-review').simulate('click', event)
    expect(component.find('.NewReviewForm__error').text()).toBe('No review text was entered!')
  })

  it('When clicking Post button, if review text is too short, error is shown', () => {
    component.setState({reviewText: 'abcd'})
    component.find('.NewReviewForm__post-review').simulate('click', event)
    expect(component.find('.NewReviewForm__error').text()).toMatch(/Review is too short/)
  })

  it('When clicking Post button, if no rating is picked, error is shown', () => {
    component.setState({reviewText: '1234567890123456'})
    component.find('.NewReviewForm__post-review').simulate('click', event)
    expect(component.find('.NewReviewForm__error').text()).toBe('Please pick a rating')
  })

  it('When clicking Post button, if user isn\'t logged in, error is shown', () => {
    component.setContext({ user: undefined })
    component.find('.NewReviewForm__post-review').simulate('click', event)
    expect(component.find('.NewReviewForm__error').text()).toMatch(/Sorry, could not post/)
  })

  it('If you create an error, then type something in textbox, error is reset', () => {
    component.setState({errorMessage: 'some error'});
    component.find('.NewReviewForm__text').simulate('change', {target: {value: 'New text'}})
    expect(component.find('.NewReviewForm__error').text()).toBe('')
  })

  it('If you create an error, then pick a new rating, error is reset', () => {
    component.setState({errorMessage: 'some error'});
    component.instance().updatePickedRating(4);
    expect(component.find('.NewReviewForm__error').text()).toBe('')
  })

  it('Clicking cancel calls toggleReviewForm', () => {
    component.find('.NewReviewForm__cancel').simulate('click');
    expect(toggleReviewForm).toBeCalledWith(undefined, false)
  })

  it('Clicking cancel resets form text', () => {
    component.setState({reviewText: 'some text here'})
    component.find('.NewReviewForm__cancel').simulate('click');
    expect(component.find('.NewReviewForm__text').props().value).toBe('')
  })

  it('Clicking cancel resets RatingBar rating to 0', () => {
    component.setState({pickedRating: 4})
    component.find('.NewReviewForm__cancel').simulate('click');
    expect(component.find('RatingBar').props().rating).toBe(0)
  })

  it('Clicking cancel resets error text', () => {
    component.setState({errorMessage: 'there is an error'})
    component.find('.NewReviewForm__cancel').simulate('click');
    expect(component.find('.NewReviewForm__error').text()).toBe('')
  })

  it('If review text is too long, proper warning text is shown', () => {
    const longString = 'qwertyuiopasdfghjklzxcvbnm1234567890.-=[];,~!,~!@#'.repeat(19);
    component.setState({reviewText: longString})
    expect(component.find('.NewReviewForm__warning').text()).toBe('50 characters left');
  })

  it('NewReviewForm component snapshot matches what is expected', () => {
    expect(toJson(component)).toMatchSnapshot();
  })
})
